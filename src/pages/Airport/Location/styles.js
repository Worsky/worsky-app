import { StyleSheet } from 'react-native';
import { metrics } from '~/styles';

const styles = StyleSheet.create({
  container: { flex: 1 },

  titleContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },

  iconTitle: { marginRight: 20 },

  title: { fontSize: 26 },

  mapContainer: { height: metrics.height / 3, width: metrics.width },
});

export default styles;
