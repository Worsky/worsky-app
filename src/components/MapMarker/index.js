import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import PropTypes from "prop-types";

const MapMarker = ({ point, openInfoModal }) => {
  const buildFeatureCollection = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [Number(point.longitude), Number(point.latitude)]
    }
  };

  const layerStyles = {
    pin: {
      iconImage: point.point_type.icon,
      iconSize: 0.08,
      iconOpacity: 1,
      iconAllowOverlap: true,
      iconIgnorePlacement: true,
      symbolSpacing: 350
    }
  };

  return (
    <MapboxGL.ShapeSource
      id="symbolLocationSource"
      hitbox={{ width: 30, height: 30 }}
      shape={buildFeatureCollection}
      onPress={() => openInfoModal(point)}
    >
      <MapboxGL.SymbolLayer id="pin" style={layerStyles.pin} />
    </MapboxGL.ShapeSource>
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
