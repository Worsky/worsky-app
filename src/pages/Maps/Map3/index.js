import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import Autocomplete from "react-native-autocomplete-input";
import CompassHeading from "react-native-compass-heading";

import AutocompleteItem from "~/components/AutocompleteItem";
import CustomModal from "~/components/CustomModal";
import MapNumberMarkers from "~/components/MapNumberMarkers";
import MapFilterModalContent from "~/components/MapFilterModalContent";

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
  const [infoPoint, setInfoPoint] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [follow, setFollow] = useState(true);
  const [compassHeading, setCompassHeading] = useState(0);

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
  };

  const renderAnnotation = point => (
    <MapboxGL.PointAnnotation
      key={point.entity_id + Date()}
      id={"post-" + point.entity_id}
      coordinate={[Number(point.longitude), Number(point.latitude)]}
      title={point.title}
      snippet={point.description.substring(0, 35) + "... [Veja mais detalhes]"}
      onSelected={() => {
        openInfoModal(point);
      }}
    >
      <View style={styles.annotationContainer}>
        <Image
          source={{
            uri: point.point_type.icon
          }}
          resizeMode="contain"
          style={styles.annotationFill}
        />
      </View>
    </MapboxGL.PointAnnotation>
  );

  const centerMapOnMe = () => {
    const newCenter = [userPosition.longitude, userPosition.latitude];

    setFollow(false);

    mapCamera.flyTo(newCenter);
  };

  const handleUserPosition = async () => {
    Geolocation.watchPosition(
      position => setUserPosition(position.coords),
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    const { data: response } = await api.loadCategories();
    setCategories(response.data);

    if (CompassHeading)
      CompassHeading.start(3, degree => {
        setCompassHeading(degree);
      });
  };

  useEffect(() => {
    handleUserPosition();
  }, []);

  useEffect(() => {
    handleMapPan();
  }, [userPosition]);

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

  const cleanSearchAndCenterMap = async point => {
    setSearch("");
    setResult([]);
    await mapCenterOnPoint(point);
  };

  const mapCenterOnPoint = async point => {
    if (!mapLoaded) return;

    const goToCoords = [
      Number(point.point_type.longitude || point.longitude),
      Number(point.point_type.latitude || point.latitude)
    ];

    console.tron.log(follow);

    if (mapCamera) {
      setFollow(false);
      mapCamera.flyTo(goToCoords);
    } else {
      handleNavigation(point);
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
    setTimeout(handleMapPan, 500);
  };

  const cleanField = () => {
    setResult([]);
    setSearch("");
  };

  return (
    <View style={styles.container}>
      {userPosition && (
        <MapboxGL.MapView
          style={{ flex: 1 }}
          onDidFinishLoadingMap={() => {
            setMapLoaded(true);
          }}
          rotateEnabled={false}
          compassEnabled
          animated
          ref={setMapView}
          showUserLocation
          styleURL={MapboxGL.StyleURL.Light}
          logoEnabled={false}
          compassEnabled={true}
          onRegionDidChange={handleMapPan}
        >
          {posts.map(renderAnnotation)}
          <MapboxGL.UserLocation visible />
          <MapboxGL.Camera
            zoomLevel={12}
            followHeading={1}
            followUserLocation={follow}
            followUserMode={follow ? "course" : "normal"}
            ref={setMapCamera}
          />
        </MapboxGL.MapView>
      )}
      {userPosition && (
        <>
          <Image
            source={plane}
            style={styles.planeOnMap}
            height={64}
            width={64}
          />
          <TouchableOpacity
            style={styles.myPositionButton}
            onPress={centerMapOnMe}
          >
            <Icon name="crosshairs" size={22} color={"black"} />
          </TouchableOpacity>
          <View style={styles.instruments}>
            <MapNumberMarkers
              text={`${Math.round(
                (userPosition.speed < 0 ? 0 : userPosition.speed) * 1.94384
              )}${" "}
              kt`}
            />
            <MapNumberMarkers text={`${Math.round(compassHeading || 0)}º`} />
            <MapNumberMarkers
              text={`${Math.round(userPosition.altitude * 3.28084)} ft`}
            />
          </View>
        </>
      )}

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

        <TouchableOpacity
          style={styles.filterIconContainer}
          onPress={() => setFilterModalVisible(true)}
        >
          <Icon name="filter" style={styles.filterIcon} size={24} />
        </TouchableOpacity>
        <CustomModal
          visible={filterModalVisible}
          changeVisibility={() => setFilterModalVisible(false)}
          maxHeight={540}
          content={
            <MapFilterModalContent filters={filters} categories={categories} />
          }
          close={true}
        />
      </View>

      {infoPoint && (
        <CustomModal
          close={false}
          visible={infoModalVisible}
          changeVisibility={() => setInfoModalVisible(false)}
          maxHeight={100}
          content={
            <>
              <Text>{infoPoint.name}</Text>
              <Text>{infoPoint.description}</Text>
              <TouchableOpacity
                style={[styles.moreDetailButton, { marginTop: 20 }]}
                onPress={async () => {
                  await setInfoModalVisible(false);
                  setTimeout(() => {
                    handleNavigation(infoPoint);
                  }, 500);
                }}
              >
                <Text style={styles.moreDetailButtonText}>More details</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.moreDetailButton,
                  { backgroundColor: "#ddd", marginTop: 8 }
                ]}
                onPress={() => setInfoModalVisible(false)}
              >
                <Text style={[styles.moreDetailButtonText, { color: "#333" }]}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          }
        />
      )}
    </View>
  );
};

export default Maps3;
