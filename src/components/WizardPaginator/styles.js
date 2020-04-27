import { StyleSheet } from 'react-native';
import { metrics } from '~/styles';

const styles = StyleSheet.create({
  paginationItem: {
    width: 8,
    height: 8,
    borderRadius: metrics.baseRadius * 10,
    marginHorizontal: metrics.baseMargin / 2.8,
  },
});

export default styles;
