import React, { useEffect, memo, useMemo } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import PropTypes from "prop-types";

function MapMarker({ points, openInfoModal, icons }) {
  const buildFeatureCollection = {
    type: "FeatureCollection",
    features: points.map(post => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [Number(post.longitude), Number(post.latitude)]
      },
      properties: {
        icon: post.name,
        post
      }
    }))
  };

  const orderCategories = icons.map(point_type => ({
    [point_type.name]: {
      uri: point_type.icon
    }
  }));

  let reorderCategories = {};

  orderCategories.map(
    category => (reorderCategories = { ...reorderCategories, ...category })
  );

  const layerStyle = useMemo(
    () => ({
      iconImage: ["get", "icon"],
      iconSize: 0.06,
      iconOpacity: 1,
      iconAllowOverlap: true,
      iconIgnorePlacement: true,
      symbolSpacing: 350
    }),
    []
  );

  return (
    <>
      <MapboxGL.Images images={{ ...reorderCategories }} />
      <MapboxGL.ShapeSource
        id="symbolLocationSource"
        hitbox={{ width: 30, height: 30 }}
        shape={buildFeatureCollection}
        onPress={({ nativeEvent }) =>
          openInfoModal(nativeEvent.payload.properties.post)
        }
      >
        <MapboxGL.SymbolLayer id="pin" style={layerStyle} />
      </MapboxGL.ShapeSource>
    </>
  );
}

MapMarker.propTypes = {
  points: PropTypes.array.isRequired,
  openInfoModal: PropTypes.func.isRequired
};

export default memo(MapMarker);
