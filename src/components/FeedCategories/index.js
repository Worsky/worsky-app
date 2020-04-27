import React from 'react';
import {
  View, TouchableOpacity, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const FeedCategories = ({ category, navigation, location }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('Category', { category, location })}
    activeOpacity={0.8}
  >
    <View style={styles.card}>
      <View style={styles.cardImageContainer}>
        <Image source={{ uri: category.image }} style={styles.cardImage} />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{category.name}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

FeedCategories.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default withNavigation(FeedCategories);
