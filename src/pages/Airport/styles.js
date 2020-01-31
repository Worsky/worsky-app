import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleContainer: {
    marginTop: metrics.baseMargin,
    paddingHorizontal: metrics.basePadding / 2,
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },

  titleFollowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleAirport: {
    color: colors.worSky.black,
    fontWeight: 'bold',
    fontSize: 20,
    width: metrics.width / 1.6,
  },

  titleFollowButtom: {
    width: metrics.width / 3,
    height: metrics.height / 20,
    borderWidth: 1,
    borderColor: colors.worSky.blue,
    borderRadius: metrics.baseRadius * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleFollowTextButtom: {
    color: colors.worSky.blue,
  },

  titleInfoContainer: {
    flexDirection: 'row',
    marginTop: metrics.baseMargin / 2,
  },

  titleInfoLocationContainer: {
    width: metrics.width / 1.6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleInfoIconLocation: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: metrics.baseMargin / 2,
  },

  titleInfoLocation: {
    fontSize: 12,
    color: colors.worSky.black,
  },

  titleInfoDataContainer: {
    width: metrics.width / 3.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  titleInfoDataBlock: {
    flexDirection: 'column',
  },

  titleInfoData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.worSky.black,
    alignSelf: 'center',
  },

  titleInfoDataLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.worSky.black,
    alignSelf: 'center',
  },

  scrollableTabViewContainer: {
    marginTop: metrics.baseMargin,
    height: metrics.height / 15,
  },

  centeredContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default styles;
