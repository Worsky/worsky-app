import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  Text,
  PermissionsAndroid
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import Autocomplete from "react-native-autocomplete-input";
import CompassHeading from "react-native-compass-heading";
import Haversine from "haversine";

import AutocompleteItem from "~/components/AutocompleteItem";
import CustomModal from "~/components/CustomModal";
import MapNumberMarkers from "~/components/MapNumberMarkers";
import MapFilterModalContent from "~/components/MapFilterModalContent";
import MapMarker from "~/components/MapMarker";
import MoreInfoModalContent from "~/components/MoreInfoModalContent";

import { metrics } from "~/styles";
import { plane } from "~/assets";

import styles from "./styles";
import api from "./api";

MapboxGL.setAccessToken(
  "sk.eyJ1Ijoiam9lbGJhbnphdHRvIiwiYSI6ImNrNDk2cmkzNzAwdHkzZHMyY2x2ZGh0eXYifQ.EeAfcaGLuGKv0FV90GT27g"
);

const Maps3 = props => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [result, setResult] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapView, setMapView] = useState(null);
  const [mapCamera, setMapCamera] = useState(null);
  const [userPosition, setUserPosition] = useState({});
  const [filters, setFilters] = useState({ all: true });
  const [search, setSearch] = useState("");
  const [infoPoint, setInfoPoint] = useState({});
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [follow, setFollow] = useState(true);
  const [compassHeading, setCompassHeading] = useState(0);
  const [speed, setSpeed] = useState(0);

  const [logModal, setLogModal] = useState(false);
  const [permissions, setPermissions] = useState({
    coarse: false,
    fine: false
  });

  const handleSearch = async data => {
    setSearch(data);
    setResult([]);

    if (search.length < 3) return;

    const [longitude, latitude] = await mapView.getCenter();

    const response = await api.loadSearch(data, latitude, longitude);

    setResult(response.data.data);
  };

  const openInfoModal = point => {
    setInfoPoint(point);
    setInfoModalVisible(true);
    mapCenterOnPoint(point);
  };

  const handleMapPan = async () => {
    try {
      if (!mapLoaded) return;

      const [[lng1, lat1], [lng2, lat2]] = await mapView.getVisibleBounds();
      const zoom = await mapView.getZoom();

      let pointIds = Object.keys(filters)
        .filter(k => k !== "all" && filters[k] === true)
        .map(key => key.replace("point", ""))
        .join(",");

      if (filters.all === true)
        pointIds = Object.keys(filters)
          .filter(k => k !== "all")
          .map(key => key.replace("point", ""))
          .join(",");

      const apiResponse = await api.loadPosts(
        lat1,
        lng1,
        lat2,
        lng2,
        zoom,
        pointIds
      );

      setPosts(apiResponse.data.data);
    } catch (error) {
      return error;
    }
  };

  const centerMapOnMe = async () => {
    try {
      const newCenter = [userPosition.longitude, userPosition.latitude];

      if (follow) setFollow(false);

      await mapCamera.moveTo(newCenter, 1200);

      setFollow(true);
    } catch (error) {
      setFollow(true);
    }
  };

  const dispatchAndVerifyPermissions = async () => {
    const fine = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const coarse = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    !fine &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Worsky Fine Location Permission",
          message: "Fine Location",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      ));

    !coarse &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: "Worsky Coarse Location Permission",
          message: "Coarse Location",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      ));

    await setPermissions({ ...permissions, fine, coarse });
  };

  const handleUserPosition = async () => {
    try {
      Geolocation.getCurrentPosition(({ coords }) => {
        setUserPosition(coords);
      });

      CompassHeading.start(3, degree => {
        setCompassHeading(degree);
      });

      await dispatchAndVerifyPermissions();

      const { data: response } = await api.loadCategories();
      setCategories(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    handleUserPosition();
  }, []);

  useEffect(() => {
    handleMapPan();
  }, [userPosition, filters]);

  useEffect(() => {
    if (mapLoaded) handleMapPan();
  }, [mapLoaded]);

  useEffect(() => {
    let newFilters = { all: true };
    for (cat of categories) {
      newFilters[`point${cat.point_type_id}`] = true;
    }
    setFilters(newFilters);
  }, [categories]);

  const handleNavigation = post => {
    const {
      point_type: { entity },
      entity_id: id
    } = post;
    const { navigation } = props;

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

  const cleanSearchAndCenterMap = point => {
    setSearch("");
    setResult([]);
    Keyboard.dismiss();
    mapCenterOnPoint(point);
  };

  const mapCenterOnPoint = async point => {
    try {
      if (!mapLoaded) return;

      const goToCoords = [
        Number(point.point_type.longitude || point.longitude),
        Number(point.point_type.latitude || point.latitude)
      ];

      if (mapCamera) {
        await setFollow(false);

        await mapCamera.moveTo(goToCoords, 1200);
      } else {
        handleNavigation(point);
      }
    } catch (error) {
      return error;
    }
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

  const cleanField = () => {
    setResult([]);
    setSearch("");
  };

  const onRegionDidChanges = async () => {
    const [_longitude, _latitude] = await mapView.getCenter();

    Geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { longitude, latitude } = coords;

        const shouldFollowUpdate = errorMarginToDisplayTargetIcon(
          { _longitude, _latitude },
          { longitude, latitude }
        );

        if (!shouldFollowUpdate) await setFollow(shouldFollowUpdate);

        await setUserPosition(coords);
      },
      error => Alert.alert("Error at tools", JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 2000
        // maximumAge: 2000
      }
    );
  };

  const errorMarginToDisplayTargetIcon = (screenCoord, userCoord) => {
    const { _longitude, _latitude } = screenCoord;

    const _longitudeFormated = Number(_longitude.toFixed(4));
    const _latitudeFormated = Number(_latitude.toFixed(4));

    const { longitude, latitude } = userCoord;

    const longitudeFormated = Number(longitude.toFixed(4));
    const latitudeFormated = Number(latitude.toFixed(4));

    const result = { followLatitude: true, followLongitude: true };

    if (_latitudeFormated != latitudeFormated) {
      let addNumber = 0.0005;

      if (Math.sign(_latitudeFormated) == -1) addNumber = -0.0005;

      const difference = (_latitudeFormated - latitudeFormated).toFixed(4);

      if (difference <= addNumber) result.followLatitude = false;
    }

    if (_longitudeFormated != longitudeFormated) {
      let addNumber = 0.0005;

      if (Math.sign(_longitudeFormated) == -1) addNumber = -0.0005;

      const difference = (_longitudeFormated - longitudeFormated).toFixed(4);

      if (difference <= addNumber) result.followLongitude = false;
    }

    if (!result.followLatitude || !result.followLongitude) return false;

    return true;
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Light}
        logoEnabled={false}
        compassEnabled={false}
        attributionEnabled={false}
        ref={setMapView}
        onDidFinishLoadingMap={() => {
          setMapLoaded(true);
        }}
        onPress={cleanSearchAndCenterMap}
        onRegionDidChange={onRegionDidChanges}
      >
        <MapboxGL.Camera
          zoomLevel={12}
          followUserLocation={follow}
          followUserMode={follow ? "course" : "normal"}
          followHeading={compassHeading}
          ref={setMapCamera}
          zoomLevel={14}
        />
        <MapMarker posts={posts} openInfoModal={openInfoModal} />
        <MapboxGL.UserLocation
          onUpdate={({ coords }) => {
            if (follow) mapCamera.moveTo([coords.longitude, coords.latitude]);

            const _speed = Haversine(
              {
                latitude: userPosition.latitude,
                longitude: userPosition.longitude
              },
              { latitude: coords.latitude, longitude: coords.longitude },
              { unit: "km" }
            );

            setSpeed(_speed);
          }}
        />
      </MapboxGL.MapView>

      <Image source={plane} style={styles.planeOnMap} height={64} width={64} />

      {!follow && (
        <TouchableOpacity
          style={styles.myPositionButton}
          onPress={centerMapOnMe}
        >
          <Icon name="crosshairs" size={22} color={"black"} />
        </TouchableOpacity>
      )}

      <View style={styles.instruments}>
        <MapNumberMarkers text={`${speed.toFixed(1)} kt`} />

        <MapNumberMarkers
          text={`${Math.round(compassHeading || 0)}º`}
          onPress={() => setLogModal(true)}
        />

        <MapNumberMarkers
          text={`${Math.round(userPosition.altitude * 3.2808)} ft`}
        />

        <CustomModal
          close={true}
          visible={logModal}
          changeVisibility={() => setLogModal(false)}
          content={
            <View>
              <Text>Fine Location: {permissions.fine ? "true" : "false"}</Text>
              <Text>
                Coarse Location: {permissions.coarse ? "true" : "false"}
              </Text>
              <Text>Follow mode: {follow ? "course" : "normal"}</Text>
              <Text>Speed | Haversine: {speed}</Text>
              <Text>Compass | CompassHeading: {compassHeading}</Text>
              <Text>Speed | Geolocation: {userPosition.speed}</Text>
              <Text>Heading | Geolocation: {userPosition.heading}</Text>
              <Text>Altitude | Geolocation: {userPosition.altitude}</Text>
              <Text>Longitude | Geolocation: {userPosition.longitude}</Text>
              <Text>Latitude | Geolocation: {userPosition.latitude}</Text>
            </View>
          }
        />
      </View>
      <View style={styles.searchContainer}>
        <Autocomplete
          data={result}
          onChangeText={text => handleSearch(text)}
          clearButtonMode="while-editing"
          value={search}
          style={styles.autocomplete}
          placeholder="Search by location"
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
        {result.length == 0 && (
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
      {infoPoint && (
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
      )}
    </View>
  );
};

export default Maps3;
