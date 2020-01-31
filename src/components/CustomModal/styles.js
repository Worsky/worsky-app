import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const style = StyleSheet.create({
  modalAroundContainer: {
    flex: 1,
    width: metrics.width,
    height: metrics.height,
    backgroundColor: 'rgba(53, 53, 53, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: metrics.width / 1.2,
    backgroundColor: colors.worSky.white,
    borderRadius: metrics.baseRadius * 2,
    padding: metrics.basePadding,
  },

  closeContainer: {
    height: metrics.height / 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  closeButtom: {
    width: metrics.width / 1.5,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default style;
