import { StyleSheet, Platform } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    marginTop: Platform.OS == 'ios' ? metrics.baseMargin * 6 : metrics.baseMargin * 4,
  },

  logo: {
    width: metrics.width / 2,
    height: metrics.height / 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  buttomContainer: {
    width: metrics.width,
    flexDirection: 'row',
    marginTop: metrics.baseMargin,
    justifyContent: 'center',
  },

  loginButtom: {
    marginRight: Platform.OS == 'ios' ? metrics.baseMargin * 5 : metrics.baseMargin * 8,
  },

  signUpButtom: {},

  buttomText: {
    fontSize: 35,
    color: '#f0f0f0',
    fontWeight: 'bold',
  },

  buttomTextActive: {
    fontSize: 35,
    color: colors.worSky.blue,
    fontWeight: 'bold',
  },
});

export default styles;
