import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

import ModalHeader from "~/components/ModalHeader";
import CustomSwitch from "~/components/CustomSwitch";

import styles from "./styles";

const MapFilterModalContent = ({ filters, categories, toggleFilter }) => (
  <View style={styles.checkboxForm}>
    <ModalHeader />
    <CustomSwitch
      value={filters.all}
      text="All Types"
      onValueChange={() => toggleFilter("all", !filters.all)}
    />

    {categories.map((item, index) => {
      const filterKey = filters[`point${item.point_type_id}`];

      const filterValue =
        filterKey == null || filterKey == undefined ? true : filterKey;

      return (
        <CustomSwitch
          key={`category${index}`}
          value={filterValue}
          text={item.name}
          onValueChange={() => toggleFilter(item.point_type_id, !filterKey)}
        />
      );
    })}
  </View>
);

MapFilterModalContent.propTypes = {
  filters: PropTypes.any,
  categories: PropTypes.any,
  toggleFilter: PropTypes.func
};

export default MapFilterModalContent;
