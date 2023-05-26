// import { icon } from 'leaflet';
import { useEffect, useState } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { icon } from './iconn';

export const LocationMarker = () => {
  // eslint-disable-next-line no-unused-vars
  var location = {};

  const [position, setPosition] = useState(null);

  const map = useMap();
  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      location = e.latlng;
      const locationLat = e.latlng.lat;

      const locationLng = e.latlng.lng;

      localStorage.setItem('lat', JSON.stringify(locationLat));
      localStorage.setItem('lng', JSON.stringify(locationLng));
    });
  }, []);

  //useEffect
  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>
        You are here. <br />
        Map bbox: <br />
      </Popup>
    </Marker>
  );
};

export default LocationMarker;
