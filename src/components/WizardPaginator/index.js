import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '~/styles';

import styles from './styles';

const WizardPaginator = ({ feel }) => (
  <View
    style={[
      styles.paginationItem,
      { backgroundColor: feel ? colors.worSky.blue : colors.worSky.grey },
    ]}
  />
);

WizardPaginator.propTypes = {
  feel: PropTypes.bool.isRequired,
};

export default WizardPaginator;
