import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: metrics.baseMargin,
    paddingHorizontal: metrics.basePadding / 2,
  },

  headerContainer: {
    flexDirection: 'row',
    marginVertical: metrics.baseMargin,
  },

  headerIcon: {
    fontSize: 22,
    marginTop: metrics.baseMargin / 2,
    margin: metrics.baseMargin,
  },

  headerTitle: {
    fontSize: 26,
  },
});

export default styles;
