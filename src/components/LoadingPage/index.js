import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '~/styles';

import styles from './styles';

const LoadingPage = ({ color = colors.worSky.blue, size = 'large' }) => (
  <View style={styles.container}>
    <ActivityIndicator color={color} size={size} />
  </View>
);

LoadingPage.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

export default LoadingPage;
