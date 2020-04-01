import React, { useEffect, useState, useRef } from "react";
import {
  StatusBar,
  Platform,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import CompassHeading from "react-native-compass-heading";
import Autocomplete from "react-native-autocomplete-input";
import KeepAwake from "react-native-keep-awake";

import AutocompleteItem from "~/components/AutocompleteItem";
import CustomModal from "~/components/CustomModal";
import MapTool from "~components/MapTool";
import MapFilterModalContent from "~/components/MapFilterModalContent";
import MapMarker from "~/components/MapMarker";
import MoreInfoModalContent from "~/components/MoreInfoModalContent";

import { plane } from "~/assets";
import { metrics, colors } from "~/styles";

import { dispatchAndVerifyPermissions } from "./helpers";
import styles from "./styles";
import api from "./api";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoid29yc2t5IiwiYSI6ImNrN3dwb2xvMjA0ZDQza3FncDhnY3BocnkifQ.3s1eTwHlWIbhWjDiTfp2wQ"
);

export default function Maps({ navigation }) {
  const [speed, setSpeed] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(0);
  const [follow, setFollow] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({ all: true });
  const [categories, setCategories] = useState([]);
  const [points, setPoints] = useState([]);
  const [infoPoint, setInfoPoint] = useState({});
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [icons, setIcons] = useState([]);
  const [followMode, setFollowMode] = useState(
    MapboxGL.UserTrackingModes.Follow
  );
  const [targetOn, setTargetOn] = useState(true);

  const refCamera = useRef(null);
  const refMapView = useRef(null);

  navigation.addListener("didFocus", () => {
    Platform.OS != "ios"
      ? StatusBar.setBackgroundColor(colors.worSky.white)
      : null;
    StatusBar.setBarStyle("dark-content");
  });

  const handleSearch = async data => {
    setSearch(data);
    setSearchResult([]);

    if (search.length < 3) return;

    const [longitude, latitude] = await refMapView.current.getCenter();

    const { data: response } = await api.loadSearch(data, latitude, longitude);

    setSearchResult(response.data);
  };

  const centerMapOnMe = () => {
    Geolocation.getCurrentPosition(({ coords }) => {
      refCamera.current.moveTo([coords.longitude, coords.latitude], 1200);
    });

    setTargetOn(true);
  };

  const handleCenterPosition = ({ coords }) => {
    setAltitude(coords.altitude);

    setSpeed(coords.speed);

    if (targetOn)
      refCamera.current.flyTo([coords.longitude, coords.latitude], 200);
  };

  const toggleFilter = (id, value) => {
    let newFilters = JSON.parse(JSON.stringify(filters));

    if (id === "all") {
      newFilters.all = value;

      for (cat of categories) newFilters[`point${cat.point_type_id}`] = value;
    } else {
      newFilters[`point${id}`] = value;

      const keys = Object.keys(newFilters).filter(k => k !== "all");

      newFilters.all = true;

      if (keys.map(k => newFilters[k]).includes(false)) newFilters.all = false;
    }

    setFilters(newFilters);
  };

  const handleInitialDatas = async () => {
    try {
      await dispatchAndVerifyPermissions();

      const { data } = await api.loadIcons();

      setIcons(data.data);

      const { data: response } = await api.loadCategories();

      setCategories(response.data);

      let newFilters = { all: true };

      for (category of response.data)
        newFilters[`point${category.point_type_id}`] = true;

      setFilters(newFilters);
    } catch (error) {
      return error;
    }
  };

  const handleMapPan = async () => {
    try {
      const [
        [lng1, lat1],
        [lng2, lat2]
      ] = await refMapView.current.getVisibleBounds();
      const zoom = await refMapView.current.getZoom();

      let pointIds = Object.keys(filters)
        .filter(k => k !== "all" && filters[k] === true)
        .map(key => key.replace("point", ""))
        .join(",");

      if (filters.all === true)
        pointIds = Object.keys(filters)
          .filter(k => k !== "all")
          .map(key => key.replace("point", ""))
          .join(",");

      const { data: response } = await api.loadPosts(
        lat1,
        lng1,
        lat2,
        lng2,
        zoom,
        pointIds
      );

      setPoints(response.data);
    } catch (error) {
      return error;
    }
  };

  const openInfoModal = point => {
    setInfoPoint(point);

    setInfoModalVisible(true);

    mapCenterOnPoint(point);
  };

  const mapCenterOnPoint = async point => {
    try {
      const goTo = [
        Number(point.point_type.longitude || point.longitude),
        Number(point.point_type.latitude || point.latitude)
      ];

      if (refCamera) {
        if (follow) await setFollow(false);

        await refCamera.current.moveTo(goTo, 1200);
      } else {
        handleNavigation(point);
      }
    } catch (error) {
      return error;
    }
  };

  const cleanSearchAndCenterMap = async point => {
    setSearch("");

    setSearchResult([]);

    if (targetOn) setTargetOn(false);

    Keyboard.dismiss();

    mapCenterOnPoint(point);
  };

  const handleNavigation = post => {
    const {
      point_type: { entity },
      entity_id: id
    } = post;

    let destination;
    let params;

    switch (entity) {
      case "reports":
        destination = "PostDetails";
        params = {
          reportId: post.report_id,
          back: "Maps"
        };
        break;

      case "airports":
        destination = "Airport";
        params = { id };
        break;

      default:
        destination = null;
        params = null;
        break;
    }

    return destination && params
      ? navigation.navigate(destination, params)
      : false;
  };

  const cleanField = () => {
    setResult([]);
    setSearch("");
  };

  useEffect(() => {
    CompassHeading.start(3, degree => {
      setHeading(degree);
    });

    handleInitialDatas();
  }, []);

  useEffect(() => {
    handleMapPan();
  }, [filters]);

  return (
    <View style={{ flex: 1 }}>
      <KeepAwake />
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Light}
        logoEnabled={false}
        attributionEnabled={false}
        ref={refMapView}
        onPress={cleanSearchAndCenterMap}
        onRegionDidChange={handleMapPan}
        onDidFinishLoadingMap={() => setFollow(false)}
      >
        <MapboxGL.Camera
          followUserLocation={follow}
          followUserMode={followMode}
          zoomLevel={15}
          ref={refCamera}
        />

        <MapMarker
          points={points}
          openInfoModal={openInfoModal}
          icons={icons}
        />

        <MapboxGL.UserLocation onUpdate={handleCenterPosition} />
      </MapboxGL.MapView>

      <Image source={plane} style={styles.planeOnMap} height={64} width={64} />

      <TouchableOpacity
        style={styles.myPositionButton}
        onPress={() => {
          targetOn ? setTargetOn(false) : centerMapOnMe();
        }}
      >
        <Icon name="crosshairs" size={22} color={targetOn ? "grey" : "black"} />
      </TouchableOpacity>

      <View style={styles.instruments}>
        <MapTool
          text={`${Math.round(speed)} kt`}
          onPress={() => {
            Alert.alert("NORMAL follow mode on");
            setFollowMode(MapboxGL.UserTrackingModes.Follow);
          }}
        />

        <MapTool
          text={`${Math.round(heading || 0)}º`}
          onPress={() => {
            Alert.alert("COURSE follow mode on");
            setFollowMode(MapboxGL.UserTrackingModes.FollowWithCourse);
          }}
        />

        <MapTool
          text={`${Math.round(altitude * 3.2808)} ft`}
          onPress={() => {
            Alert.alert("HEADING follow mode on");
            setFollowMode(MapboxGL.UserTrackingModes.FollowWithHeading);
          }}
        />
      </View>

      <View style={styles.searchContainer}>
        <Autocomplete
          data={searchResult}
          onChangeText={text => handleSearch(text)}
          clearButtonMode="while-editing"
          value={search}
          style={styles.autocomplete}
          placeholder="Search by location"
          onFocus={() => setTargetOn(false)}
          renderItem={({ item }) => (
            <AutocompleteItem
              item={item}
              handleClick={cleanSearchAndCenterMap}
              cleanField={cleanField}
            />
          )}
          listStyle={{
            maxHeight: metrics.height / 1.6,
            borderColor: "white",
            width: metrics.width / 1.1
          }}
          keyExtractor={(item, i) => String(i)}
          inputContainerStyle={{ borderColor: "white" }}
          keyboardShouldPersistTaps="always"
        />
        {searchResult.length == 0 && (
          <TouchableOpacity
            style={styles.filterIconContainer}
            onPress={() => setFilterModalVisible(true)}
          >
            <Icon name="filter" style={styles.filterIcon} size={24} />
          </TouchableOpacity>
        )}

        <CustomModal
          visible={filterModalVisible}
          changeVisibility={() => setFilterModalVisible(false)}
          maxHeight={540}
          content={
            <MapFilterModalContent
              filters={filters}
              categories={categories}
              toggleFilter={toggleFilter}
            />
          }
          close={true}
        />
      </View>
      {/* {infoPoint && ( */}
      <CustomModal
        close={false}
        visible={infoModalVisible}
        changeVisibility={() => setInfoModalVisible(false)}
        content={
          <MoreInfoModalContent
            infoPoint={infoPoint}
            closeModal={setInfoModalVisible}
            handleNavigation={handleNavigation}
          />
        }
      />
      {/* )} */}
    </View>
  );
}
