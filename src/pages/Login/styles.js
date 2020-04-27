import { StyleSheet, Platform } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: metrics.basePadding,
    backgroundColor: colors.worSky.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: Platform.OS === 'ios' ? metrics.baseMargin * 2 : 0,
    paddingVertical: metrics.basePadding * 2,
  },
  tab: {
    paddingBottom: 10,
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
  activeTab: {
    height: 3,
    backgroundColor: colors.background,
  },
  textTab: {
    fontWeight: '600',
    fontSize: 35,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  toolbar: {
    left: 14,
    alignSelf: 'flex-start',
  },

  /** == */

  wrap: {
    flex: 1,
    marginHorizontal: metrics.baseMargin,
    alignItems: 'center',
    paddingBottom: metrics.basePadding * 2,
  },
  body: {
    height: metrics.height / 2.5,
    overflow: 'hidden',
    backgroundColor: colors.worSky.white,
  },
  wrapForm: {
    flex: 1,
    padding: metrics.basePadding,
    width: metrics.width,
  },
  textInput: {
    borderBottomWidth: 1,
    marginBottom: metrics.baseMargin,
    borderBottomColor: 'rgba(0,0,0, 0.2)',
    backgroundColor: colors.worSky.white,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
  },
  textInputWrap: {
    marginTop: 10,
  },
  textLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 8,
  },
  forgotPassword: {
    flex: 1,
    alignItems: 'flex-end',
    minHeight: 20,
    maxHeight: 20,
  },
  loginBotton: {
    flex: 1,
    height: 40,
    width: metrics.width / 1.5,
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBottonText: {
    fontWeight: 'bold',
    color: colors.worSky.white,
  },
  errorText: {
    color: '#f96666',
  },
});

export default styles;
