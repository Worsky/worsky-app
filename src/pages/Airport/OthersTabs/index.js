import React from "react";
import { ScrollView, Text, FlatList, View } from "react-native";
import PropTypes from "prop-types";

import { metrics, colors } from "~/styles";

import styles from "./styles";

const styleContainer = index => {
  let containerStyle = styles.container;
  if (index / 2 == 0)
    containerStyle = [styles.container, { backgroundColor: "grey" }];

  return containerStyle;
};

const OthersTabs = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={({ item, index }) => String(index)}
      renderItem={({ item, index }) => (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.name}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.value}</Text>
          </View>
        </View>
      )}
    />
  );
};

OthersTabs.propTypes = {
  data: PropTypes.array.isRequired
};

export default OthersTabs;
