import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import { withNavigation } from "react-navigation";

import ProgressiveImage from "~/components/ProgressiveImage";

import styles from "./styles";

const CategoryItem = ({ category, navigation }) => (
  <View style={styles.categoryContainer}>
    <TouchableOpacity
      onPress={() => navigation.navigate("Airport", { id: category.entity_id })}
    >
      <ProgressiveImage
        source={{ uri: category.image }}
        style={styles.categoryImage}
      />
    </TouchableOpacity>
    <View style={styles.categoryTextContainer}>
      <Text style={styles.categoryTitle}>{category.point_type.name}</Text>
      <Text style={styles.categoryLocationName}>{category.name}</Text>
      <View style={styles.categoryLocationContainer}>
        <Icon name="map-marker-alt" style={styles.categoryIconLocation} />
        <Text style={styles.categoryLocation}>
          {category.description.substring(0, 18)}
        </Text>
      </View>
    </View>
  </View>
);

CategoryItem.propTypes = {
  category: PropTypes.shape({
    entity_id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    point_type: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default withNavigation(CategoryItem);
