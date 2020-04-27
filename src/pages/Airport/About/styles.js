import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.basePadding / 2,
  },

  aboutText: {
    color: colors.worSky.black,
    textAlign: 'justify',
  },

  infoContainer: {
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    marginTop: metrics.baseMargin,
  },

  infoIcon: {
    color: colors.worSky.black,
    fontSize: 18,
    minWidth: 40,
  },

  infoLabel: {
    color: colors.worSky.black,
    minWidth: 70,
    fontSize: 13,
    fontWeight: 'bold',
  },

  infoText: {
    color: colors.worSky.black,
    fontSize: 11,
    textAlign: 'left',
    maxWidth: metrics.width / 1.6,
  },
});

export default styles;
