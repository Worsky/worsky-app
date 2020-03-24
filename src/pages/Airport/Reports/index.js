import React from "react";
import { View, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import PropTypes from "prop-types";

import ReportList from "~/components/ReportList";

import styles from "./styles";

const Reports = ({ data, navigation }) => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Icon name="th-large" style={styles.headerIcon} />
      <Text style={styles.headerTitle}> Related Post </Text>
    </View>
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ReportList
          data={item}
          navigation={navigation}
          back="Airport"
          params={{ id: item.airport_id }}
        />
      )}
      keyExtractor={item => String(item.id)}
      extraData={navigation}
    />
  </View>
);

Reports.propTypes = {
  data: PropTypes.array.isRequired,
  navigation: PropTypes.shape().isRequired
};

export default Reports;
