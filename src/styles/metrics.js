import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseMargin: Platform.OS === 'ios' ? 20 : 10,
  basePadding: 20,
  baseRadius: Platform.OS === 'ios' ? 4 : 3,
  width: width < height ? width : height,
  height: width < height ? height : width,
};
