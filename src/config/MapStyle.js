const mapsStyle = [
  {
    featureType: 'administrative',
    elementType: 'geometry.fill',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      {
        color: '#F6F6F4',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    stylers: [
      {
        color: '#cee8d3',
      },
      {
        weight: 1,
      },
    ],
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry',
    stylers: [
      {
        color: '#cee8d3',
      },
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    stylers: [
      {
        color: '#cee8d3',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.business',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi.medical',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'transit',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export default mapsStyle;
