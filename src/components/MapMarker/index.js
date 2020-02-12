import React from "react";
import { View, Image } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import PropTypes from "prop-types";

import styles from "./styles";

const MapMarker = ({ point, openInfoModal }) => {
  return (
    <MapboxGL.PointAnnotation
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
};

MapMarker.propTypes = {
  point: PropTypes.shape({
    entity_id: PropTypes.number.isRequired,
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    point_type: PropTypes.object.isRequired
  }).isRequired,
  openInfoModal: PropTypes.func.isRequired
};

export default MapMarker;