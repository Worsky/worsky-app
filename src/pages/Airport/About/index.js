import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

import styles from './styles';

const About = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.aboutText}>{data.description}</Text>
    <View style={styles.infoContainer}>
      <Icon name="map-marker-alt" style={styles.infoIcon} />
      <Text style={styles.infoLabel}>Address</Text>
      <Text style={styles.infoText}>{data.address}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Icon name="phone" style={styles.infoIcon} />
      <Text style={styles.infoLabel}>Tel </Text>
      <Text style={styles.infoText}>{data.tel}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Icon name="globe" style={styles.infoIcon} />
      <Text style={styles.infoLabel}>Website </Text>
      <Text style={styles.infoText}>{data.websiteUrl}</Text>
    </View>
  </View>
);

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;
