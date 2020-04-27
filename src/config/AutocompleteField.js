import { metrics, colors } from '~/styles';

const autocomplete = {
  query: {
    key: 'AIzaSyAnMV9sziESm-BTcucLFRTibHEkRoPKaGI',
    language: 'en',
    types: '(regions)',
  },
  searchQuery: {
    rankby: 'distance',
    type: 'cafe',
  },
  detailsQuery: {
    fields: 'formatted_address',
  },
  style: {
    textInputContainer: {
      width: metrics.width,
      backgroundColor: colors.worSky.white,
      borderTopWidth: 0,
    },
    textInput: {
      backgroundColor: colors.worSky.grey,
      textAlign: 'center',
      borderRadius: metrics.baseRadius * 5,
    },
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: colors.worSky.blue,
    },
    listView: {
      backgroundColor: colors.worSky.white,
    },
  },
  filterReverseGeocodingByTypes: [
    'locality',
    'sublocality',
    'postal_code',
    'country',
    'administrative_area1',
    'administrative_area2',
  ],
};

export default autocomplete;
