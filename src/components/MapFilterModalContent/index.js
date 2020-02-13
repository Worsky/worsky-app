import React from "react";
import { View, Text, Switch } from "react-native";
import PropTypes from "prop-types";

import ModalHeader from "~/components/ModalHeader";

import styles from "./styles";

const MapFilterModalContent = ({ filters, categories, toggleFilter }) => (
  <View style={styles.checkboxForm}>
    <ModalHeader />
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
          onValueChange={value => toggleFilter(item.point_type_id, value)}
        />
        <Text style={styles.filterLabel}>{item.name}</Text>
      </View>
    ))}
  </View>
);

MapFilterModalContent.propTypes = {
  filters: PropTypes.any,
  categories: PropTypes.any,
  toggleFilter: PropTypes.func
};

export default MapFilterModalContent;
