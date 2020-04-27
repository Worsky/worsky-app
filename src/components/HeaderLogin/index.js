import React from 'react';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import { logo } from '~/assets';

import styles from './styles';

const HeaderLogin = ({ active, navigation }) => (
  <View style={styles.container}>
    <Image source={logo} style={styles.logo} />
    <View style={styles.buttomContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginButtom}>
        <Text style={active == 'login' ? styles.buttomTextActive : styles.buttomText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpButtom}>
        <Text style={active == 'signUp' ? styles.buttomTextActive : styles.buttomText}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

HeaderLogin.propTypes = {
  active: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HeaderLogin;
