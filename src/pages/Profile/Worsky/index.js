import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import packageJSON from '../../../../package.json';

import styles from './styles';

const Worsky = () => (
  <ScrollView style={styles.container}>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>App Name</Text>
      <Text style={styles.info}>{packageJSON.name}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Version</Text>
      <Text style={styles.info}>{packageJSON.version}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Email</Text>
      <Text style={styles.infoLink}>worsky@worsky.com</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Website</Text>
      <Text style={styles.infoLink}>worsky.com</Text>
    </View>
  </ScrollView>
);

export default Worsky;
