import { StyleSheet, Platform } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: metrics.basePadding / 2,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 26,
    marginVertical: metrics.baseMargin * 2,
    marginTop: metrics.baseMargin * 3,
    color: colors.worSky.black,
  },
});

export default styles;
