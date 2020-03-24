import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import PropTypes from "prop-types";

import styles from "./styles";

const handleClick = (navigation, cleanField, item) => {
  cleanField();
  navigation.navigate("Airport", { id: item.entity_id });
};

const AutocompleteItem = ({
  item,
  navigation = false,
  cleanField,
  callbackCoordinate = false,
  handleClick = null
}) => {
  if (Object.keys(item).length < 0) return null;

  let { name, point_type } = item;
  if (item.name.length >= 27) name = `${item.name.substr(0, 27)}...`;

  return (
    <TouchableOpacity
      onPress={() =>
        handleClick
          ? handleClick(item)
          : navigation
            ? handleClick(navigation, cleanField, item)
            : callbackCoordinate(
              item.point_type.latitude,
              item.point_type.longitude,
              item.name,
              true
            )
      }
      style={styles.button}
    >
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.pointType}>{point_type.name}</Text>
      </View>
      <Image
        source={{ uri: point_type.icon }}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

AutocompleteItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  cleanField: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  callbackCoordinate: PropTypes.func
};

export default AutocompleteItem;
