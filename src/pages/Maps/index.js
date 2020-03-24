import React, { useEffect, useState, useRef } from "react";
import { StatusBar, Platform, View, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import CompassHeading from "react-native-compass-heading";
import Autocomplete from "react-native-autocomplete-input";

import AutocompleteItem from "~/components/AutocompleteItem";
import CustomModal from "~/components/CustomModal";
import MapTool from "~components/MapTool";
import MapFilterModalContent from "~/components/MapFilterModalContent";

import { plane } from "~/assets";

import {
  dispatchAndVerifyPermissions,
  errorMarginToDisplayTargetIcon
} from "./helpers";
import styles from "./styles";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoid29yc2t5IiwiYSI6ImNrN3dwb2xvMjA0ZDQza3FncDhnY3BocnkifQ.3s1eTwHlWIbhWjDiTfp2wQ"
);

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({});
  const [speed, setSpeed] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [heading, setHeading] = useState(0);
  const [follow, setFollow] = useState(true);
  const [search, setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState({ all: true });
  const [categories, setCategories] = useState([]);

  const refCamera = useRef(null);
  const refMapView = useRef(null);

  const handleSearch = async data => {
    setSearch(data);
    setSearchResult([]);

    if (search.length < 3) return;

    const [longitude, latitude] = await refMapView.getCenter();

    const { data:response } = await api.loadSearch(data, latitude, longitude);

    setSearchResult(response.data);
  };

  const centerMapOnMe = async () => {
    try {
      if (follow) setFollow(false);

      await mapCamera.moveTo(
        [userPosition.longitude, userPosition.latitude],
        1200
      );

      setFollow(true);
    } catch (error) {
      setFollow(true);
    }
  };

  const handleCenterPosition = ({ coords }) => {
    setAltitude(coords.altitude);

    setSpeed(coords.speed);

    setCurrentPosition({
      latitude: coords.latitude,
      longitute: coords.longitude
    });

    refCamera.current.flyTo([coords.longitude, coords.latitude]);
  };

  const onRegionDidChanges = async () => {
    const [_longitude, _latitude] = await refMapView.getCenter();

    Geolocation.getCurrentPosition(async ({ coords }) => {
      const { longitude, latitude } = coords;

      const mapViewCenter = { _longitude, _latitude };
      const userCurrentPosition = { longitude, latitude };

      const shouldFollowUpdate = errorMarginToDisplayTargetIcon(
        mapViewCenter,
        userCurrentPosition
      );

      if (!shouldFollowUpdate) await setFollow(shouldFollowUpdate);
    });

    if (!follow) handleMapPan();
  };

  useEffect(() => {
    // Geolocation.watchPosition(
    //   ({ coords }) => {
    //     setCurrentPosition({
    //       latitude: coords.latitude,
    //       longitute: coords.longitude
    //     });
    //   },
    //   error => Alert.alert(JSON.stringify(error)),
    //   {
    //     timeout: 3000,
    //     maximumAge: 0,
    //     distanceFilter: 2,
    //     useSignificantChanges: true
    //   }
    // );
    dispatchAndVerifyPermissions();

    CompassHeading.start(3, degree => {
      setHeading(degree);
    });

    const { data: response } = await api.loadCategories();

    let newFilters = { all: true };

    for (category of response.data)
      newFilters[`point${category.point_type_id}`] = true;

    setFilters(newFilters);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView
        style={{ flex: 1 }}
        styleURL={MapboxGL.StyleURL.Dark}
        ref={refMapView}
        // onPress={cleanSearchAndCenterMap}
        onRegionDidChange={onRegionDidChanges}
      >
        <MapboxGL.Camera
          followUserLocation
          followUserMode={MapboxGL.UserTrackingModes.FollowWithHeading}
          centerCoordinate={[
            currentPosition.longitute,
            currentPosition.latitude
          ]}
          zoomLevel={15}
          ref={refCamera}
        />
        <MapboxGL.UserLocation onUpdate={handleCenterPosition} />
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
        <MapTool text={`${speed.toFixed(1)} kt`} />

        <MapTool text={`${Math.round(heading || 0)}º`} />

        <MapTool text={`${Math.round(altitude * 3.2808)} ft`} />
      </View>

      <View style={styles.searchContainer}>
        <Autocomplete
          data={searchResult}
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
    </View>
  );
}
