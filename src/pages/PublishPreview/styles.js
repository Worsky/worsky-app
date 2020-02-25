import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  preview: {
    width: metrics.width,
    height: metrics.height - 320
  },
  viewPreview: {
    flex: 1,
    alignContent: "center",
    marginTop: 50,
  },
  container: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default styles;
