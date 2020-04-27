import React from 'react';
import {
  ScrollView, View, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';

const User = ({ navigation, profile }) => (
  <ScrollView style={styles.container}>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Username</Text>
      <Text style={styles.info}>{profile.username}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Email</Text>
      <Text style={styles.info}>{profile.email}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Country</Text>
      <Text style={styles.info}>{profile.country_name}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Phone</Text>
      <Text style={styles.info}>{profile.phone}</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Password</Text>
      <Text style={styles.info}>**************</Text>
    </View>
    <View style={styles.infoContainer}>
      <Text style={styles.infoLabel}>Biography</Text>
      <Text style={styles.info}>{profile.bio}</Text>
    </View>
    <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} style={styles.editButtom}>
      <Text style={styles.editTextButtom}>Edit Profile</Text>
      <Icon name="arrow-right" style={styles.editIconButtom} />
    </TouchableOpacity>
  </ScrollView>
);

User.propTypes = {
  navigation: PropTypes.shape().isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    country_name: PropTypes.string,
    phone: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default User;
