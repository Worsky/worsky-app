import { StyleSheet, Platform } from 'react-native';
import { colors, metrics } from '~/styles';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: metrics.basePadding * 5,
    backgroundColor: colors.worSky.white,
  },
  imageContainer: {},
  imageLogo: {},
  formContainer: {
    flex: 1,
    width: metrics.width,
    paddingHorizontal: metrics.basePadding,
    marginTop: Platform.OS === 'ios' ? metrics.baseMargin * 6 : metrics.baseMargin * 10,
  },
  inputContainer: {},
  recoverMessageSuccess: {
    color: colors.worSky.success,
    fontSize: 11,
  },
  recoverMessageFaliure: {
    color: colors.worSky.danger,
    fontSize: 11,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    height: 40,
  },
  submitContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? metrics.baseMargin * 2 : metrics.baseMargin * 5,
  },
  submitButton: {
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 20,
    width: metrics.width / 1.5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitLabel: {
    color: colors.worSky.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  backButton: {
    marginTop: metrics.baseMargin * 2,
    width: metrics.width / 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
