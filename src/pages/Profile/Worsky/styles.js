import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2,
  },

  infoContainer: {
    flexDirection: 'row',
    marginTop: metrics.baseMargin * 1.8,
  },

  infoLabel: {
    fontSize: 16,
    width: metrics.width / 2.5,
  },

  info: {
    fontSize: 14,
    color: colors.worSky.black,
    textAlign: 'justify',
    width: metrics.width / 1.5,
  },

  infoLink: {
    fontSize: 14,
    color: colors.worSky.blue,
    textAlign: 'justify',
    width: metrics.width / 1.5,
    textDecorationLine: 'underline',
    textDecorationColor: colors.worSky.blue,
  },
});

export default styles;
