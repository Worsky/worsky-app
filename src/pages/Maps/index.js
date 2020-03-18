import React, { useEffect, useState, useRef } from "react";
import { StatusBar, Platform, View, Text, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from "@react-native-community/geolocation";

import { colors } from "~/styles";

MapboxGL.setAccessToken(
  "pk.eyJ1Ijoid29yc2t5IiwiYSI6ImNrN3dwb2xvMjA0ZDQza3FncDhnY3BocnkifQ.3s1eTwHlWIbhWjDiTfp2wQ"
);

export default function Maps() {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitute: 0
  });
  const refCamera = useRef(null);

  useEffect(() => {
    Geolocation.watchPosition(
      ({ coords }) => {
        setCurrentPosition({
          latitude: coords.latitude,
          longitute: coords.longitude
        });
        refCamera.current.flyTo([coords.longitude, coords.latitude]);
      },
      error => Alert.alert(JSON.stringify(error))
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapboxGL.MapView style={{ flex: 1 }} styleURL={MapboxGL.StyleURL.Dark}>
        <MapboxGL.Camera
          followUserLocation
          followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          centerCoordinate={[
            currentPosition.longitute,
            currentPosition.latitude
          ]}
          zoomLevel={15}
          ref={refCamera}
        />
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
      <Text>{JSON.stringify({ ...currentPosition })}</Text>
    </View>
  );
}

// class Maps extends Component {
//   componentDidMount() {
//     const { navigation } = this.props;

//     this._navListener = navigation.addListener("didFocus", () => {
//       Platform.OS != "ios"
//         ? StatusBar.setBackgroundColor(colors.worSky.white)
//         : null;
//       StatusBar.setBarStyle("dark-content");
//     });
//   }

//   componentWillUnmount() {
//     this._navListener.remove();
//   }

//   render() {
//     const { navigation } = this.props;
//     return <View />;
//   }
// }

// export default Maps;
