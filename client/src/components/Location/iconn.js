import L from 'leaflet';

const icon = new L.Icon({
  iconUrl: require('./icons8-location-48.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(24, 24),
});

export { icon };
