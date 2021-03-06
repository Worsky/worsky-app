import React, { useState, useEffect, use } from "react";
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { metrics } from "~/styles";
import styles from "./styles";

import MapboxGL from "@react-native-mapbox-gl/maps";
import { plane } from "~/assets";
import Geolocation from "@react-native-community/geolocation";
import Autocomplete from "react-native-autocomplete-input";
import AutocompleteItem from "~/components/AutocompleteItem";
import CustomModal from "~/components/CustomModal";
import { throttle } from "lodash";

import api from "./api";
import CompassHeading from "react-native-compass-heading";

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
  const [mapCenter, setMapCenter] = useState(null);
  const [geoObserver, setGeoObserver] = useState(null);
  const [userPosition, setUserPosition] = useState({});
  const [filters, setFilters] = useState({ all: true });
  const [search, setSearch] = useState("");
  const [infoPoint, setInfoPoint] = useState(null);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [follow, setFollow] = useState(true);
  const [magnetometer, setMagnetometer] = useState(0);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [compassHeading, setCompassHeading] = useState(0);

  const handleSearch = async data => {
    await setSearch(data);
    await setResult([]);

    if (search.length < 3) return;

    const [longitude, latitude] = await mapView.getCenter();

    await setLoadingSearch(true);
    api
      .loadSearch(data, latitude, longitude)
      .then(response => {
        setResult(response.data.data);
      })
      .finally(() => {
        setLoadingSearch(false);
      });
  };

  const openInfoModal = async point => {
    await setInfoPoint(point);
    await setInfoModalVisible(true);
    mapCenterOnPoint(point);
  };

  const handleMapPan = async () => {
    if (mapLoaded) {
      const [[lng1, lat1], [lng2, lat2]] = await mapView.getVisibleBounds();
      const zoom = await mapView.getZoom();

      let pointIds = "";

      if (filters.all === true) {
        pointIds = Object.keys(filters)
          .filter(k => k !== "all")
          .map(key => {
            return key.replace("point", "");
          })
          .join(",");
      } else {
        pointIds = Object.keys(filters)
          .filter(k => k !== "all" && filters[k] === true)
          .map(key => {
            return key.replace("point", "");
          })
          .join(",");
      }

      api.loadPosts(lat1, lng1, lat2, lng2, zoom, pointIds).then(response => {
        setPosts(response.data.data);
      });
    }
  };

  const renderAnnotation = point => {
    return (
      <MapboxGL.PointAnnotation
        key={point.entity_id + Date()}
        id={"post-" + point.entity_id}
        coordinate={[Number(point.longitude), Number(point.latitude)]}
        title={point.title}
        snippet={
          point.description.substring(0, 35) + "... [Veja mais detalhes]"
        }
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
  };

  const centerMapOnMe = () => {
    const newCenter = [userPosition.longitude, userPosition.latitude];
    const newFollow = !follow;
    setFollow(newFollow);

    if (newFollow) {
      console.log({ mapCamera });
      setMapCenter(newCenter);
      mapCamera.flyTo(newCenter);
    }
  };

  useEffect(() => {
    if (Platform.OS === "ios") {
      Geolocation.requestAuthorization();
    } else {
      // Geolocation.requestAndroidLocationPermissions();
    }

    const observer = Geolocation.watchPosition(
      position => {
        setUserPosition(position.coords);
      },
      error => {
        Alert.alert(error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    setGeoObserver(observer);

    api.loadCategories().then(response => {
      setCategories(response.data.data);
    });

    const degree_update_rate = 3;
    try {
      if (CompassHeading) {
        CompassHeading.start(degree_update_rate, degree => {
          setCompassHeading(degree);
        });
      }
    } catch (err) {
      console.log({ err });
    }
  }, []);

  useEffect(() => {
    handleMapPan();
  }, [userPosition]);

  useEffect(() => {
    if (mapLoaded) {
      handleMapPan();
    }
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

  const mapCenterOnPoint = async point => {
    if (!mapLoaded) return;
    const goToCoords = [
      Number(point.point_type.longitude || point.longitude),
      Number(point.point_type.latitude || point.latitude)
    ];

    console.log({ goToCoords });

    if (mapCamera) {
      await setFollow(false);
      mapCamera.flyTo(goToCoords);
    } else {
      handleNavigation(point);
    }
  };

  const toggleFilter = async (id, value) => {
    let newFilters = JSON.parse(JSON.stringify(filters));
    if (id === "all") {
      newFilters.all = value;
      for (cat of categories) {
        newFilters[`point${cat.point_type_id}`] = value;
      }
    } else {
      newFilters[`point${id}`] = value;

      const keys = Object.keys(newFilters).filter(k => k !== "all");
      if (keys.map(k => newFilters[k]).includes(false)) {
        newFilters.all = false;
      } else {
        newFilters.all = true;
      }
    }

    console.log({ newFilters });
    await setFilters(newFilters);
    setTimeout(handleMapPan, 500);
  };

  const cleanField = async () => {
    await setResult([]);
    await setSearch("");
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
            <Icon
              name="crosshairs"
              size={22}
              color={follow ? "black" : "#bbb"}
            />
          </TouchableOpacity>
          <View style={styles.instruments}>
            <Text style={styles.instrumentItem}>
              {Math.round(
                (userPosition.speed < 0 ? 0 : userPosition.speed) * 1.94384
              )}{" "}
              kt
            </Text>
            {/* <Text style={styles.instrumentItem}>
              {Math.round(magnetometer || 0)}º
            </Text> */}
            <Text style={styles.instrumentItem}>
              {Math.round(compassHeading || 0)}º
            </Text>
            <Text style={styles.instrumentItem}>
              {Math.round(userPosition.altitude * 3.28084)} ft
            </Text>
          </View>
        </>
      )}

      <View style={styles.searchContainer}>
        <Autocomplete
          data={result}
          onChangeText={throttle(handleSearch, 600)}
          clearButtonMode="while-editing"
          value={search}
          style={styles.autocomplete}
          placeholder="Search by location"
          renderItem={({ item }) => (
            <AutocompleteItem
              item={item}
              handleClick={mapCenterOnPoint}
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
            <View style={styles.checkboxForm}>
              <Text>Show on map these point types: </Text>
              <View style={styles.checkboxField}>
                <Switch
                  value={filters.all}
                  onValueChange={value => toggleFilter("all", value)}
                />
                <Text style={styles.filterLabel}>All types</Text>
              </View>
              {categories.map((item, index) => (
                <View key={`category${index}`} style={styles.checkboxField}>
                  <Switch
                    value={
                      filters[`point${item.point_type_id}`] == null ||
                      filters[`point${item.point_type_id}`] == undefined
                        ? true
                        : filters[`point${item.point_type_id}`]
                    }
                    onValueChange={value =>
                      toggleFilter(item.point_type_id, value)
                    }
                  />
                  <Text style={styles.filterLabel}>{item.name}</Text>
                </View>
              ))}
            </View>
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
