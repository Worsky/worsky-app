import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import ProgressiveImage from "~/components/ProgressiveImage";

import styles from "./styles";

const ReportList = ({ data, navigation, back, params, local = false }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate("PostDetails", {
        reportId: data.report_id == "undefined" ? data.id : data.report_id,
        back,
        params
      })
    }
  >
    <View style={styles.reportContainer}>
      <ProgressiveImage
        source={!local ? { uri: data.image } : data.image}
        style={styles.reportImage}
      />
      <View style={styles.reportTextContainer}>
        <Text style={styles.reportTime}>{data.date}</Text>
        <Text style={styles.reportTitle}>{data.type}</Text>
        <Text style={styles.reportDescription}>{data.description}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

ReportList.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    report_id: PropTypes.number,
    image: PropTypes.any.isRequired,
    date: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  local: PropTypes.bool,
  back: PropTypes.string,
  params: PropTypes.object
};

export default ReportList;
