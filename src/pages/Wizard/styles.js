import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: metrics.width,
    height: metrics.height / 1.5,
    resizeMode: 'cover',
  },

  paginationContainer: {
    width: metrics.width,
    height: metrics.height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: colors.worSky.black,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: metrics.baseMargin,
  },

  text: {
    marginBottom: metrics.baseMargin,
  },

  buttonsContainer: {
    width: metrics.width,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: metrics.baseMargin,
  },

  skipButton: {
    width: metrics.width / 2.8,
    borderRadius: metrics.baseRadius * 6,
    paddingVertical: metrics.basePadding / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.worSky.white,
    borderColor: colors.worSky.blue,
    borderWidth: 1,
  },

  skipText: {
    color: colors.worSky.black,
    fontWeight: 'bold',
  },

  nextButton: {
    width: metrics.width / 2.8,
    borderRadius: metrics.baseRadius * 10,
    paddingVertical: metrics.basePadding / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.worSky.blue,
  },

  nextText: {
    color: colors.worSky.white,
    fontWeight: 'bold',
  },

  finishButton: {
    width: metrics.width / 1.8,
    borderRadius: metrics.baseRadius * 10,
    paddingVertical: metrics.basePadding / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.worSky.blue,
  },
});

export default styles;
