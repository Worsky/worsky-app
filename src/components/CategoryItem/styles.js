import { StyleSheet, Platform } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  categoryContainer: {
    width: metrics.width / 2.2,
    marginTop: metrics.baseMargin,
  },

  categoryImage: {
    width: metrics.width / 2.2,
    height: Platform.OS === 'ios' ? metrics.height / 5 : metrics.height / 4.2,
    borderRadius: metrics.baseRadius,
  },

  categoryTextContainer: {
    paddingTop: metrics.basePadding / 4,
  },

  categoryTitle: {
    color: '#4f98c9',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: metrics.baseMargin / 2,
  },

  categoryLocationName: {
    color: colors.worSky.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: metrics.baseMargin / 2,
  },

  categoryLocationContainer: {
    flexDirection: 'row',
  },

  categoryIconLocation: {
    fontSize: 12,
    color: colors.worSky.blue,
    marginRight: 2,
  },

  categoryLocation: {
    fontSize: 10,
    color: colors.worSky.black,
  },
});

export default styles;
