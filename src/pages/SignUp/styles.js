import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  inputContainer: {
    width: metrics.width,
    paddingHorizontal: metrics.basePadding,
    marginTop: metrics.baseMargin * 3,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.worSky.black,
    paddingHorizontal: 2,
  },

  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    fontSize: 15,
    paddingVertical: 8,
  },

  buttomContainer: {
    marginTop: metrics.baseMargin * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtom: {
    width: metrics.width / 1.8,
    height: 40,
    borderRadius: metrics.baseRadius * 10,
    backgroundColor: colors.worSky.blue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: metrics.baseMargin * 8,
  },

  buttomLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.worSky.white,
  },

  errorText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.worSky.danger,
    paddingHorizontal: 2,
  },

  customPicker: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  countryHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: metrics.basePadding,
  },

  countryHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  countryItem: {
    width: '100%',
    color: colors.worSky.black,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingVertical: metrics.basePadding,
    alignSelf: 'center',
  },

  customPickerModal: {
    borderRadius: metrics.baseRadius * 1.8,
    paddingHorizontal: metrics.basePadding / 2,
  },

  countryFooterContainer: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },

  countryFooterButtom: {
    height: 40,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 10,
  },
  countryFooterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.worSky.white,
  },
});

export default styles;
