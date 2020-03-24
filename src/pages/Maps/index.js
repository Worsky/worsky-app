import React, { useEffect, useState, useRef } from "react";
import { StatusBar, Platform, View, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";
import CompassHeading from "react-native-compass-heading";

import MapTool from "~components/MapTool";

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
  const refCamera = useRef(null);
  const refMapView = useRef(null);

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
    </View>
  );
}
