import { StyleSheet, Platform } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  reportContainer: {
    flexDirection: 'row',
    marginBottom: Platform.OS == 'ios' ? metrics.baseMargin * 2 : metrics.baseMargin * 5,
  },

  reportImage: {
    width: metrics.width / 2.8,
    height: Platform.OS == 'ios' ? metrics.height / 7 : metrics.height / 5.4,
    resizeMode: 'cover',
    borderRadius: metrics.baseRadius,
  },

  reportTextContainer: {
    flexDirection: 'column',
    marginLeft: metrics.baseMargin / 2,
  },

  reportTime: {
    fontSize: 11,
  },

  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.worSky.black,
  },

  reportCategories: {
    fontSize: 14,
    color: colors.worSky.danger,
  },

  reportDescription: {
    fontSize: 12,
    color: colors.worSky.black,
    maxWidth: metrics.width / 1.7,
    textAlign: 'justify',
  },
});

export default styles;
