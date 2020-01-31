import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  card: {
    marginRight: metrics.baseMargin,
    backgroundColor: colors.worSky.white,
  },

  cardImageContainer: {
    width: metrics.width / 3,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.worSky.white,
    alignSelf: 'center',
    resizeMode: 'contain',
  },

  cardTextContainer: {
    backgroundColor: colors.worSky.white,
    padding: metrics.basePadding - 15,
    height: 65,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 0.5,
  },

  cardText: {
    color: colors.worSky.black,
    fontWeight: 'bold',
  },
});

export default styles;
