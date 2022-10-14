import { useLoadScript } from '@react-google-maps/api';
import { useCallback, useState } from 'react';

export type Libraries = ('drawing' | 'geometry' | 'localContext' | 'places' | 'visualization')[];
export const LIBRARIES: Libraries = ['places'];

export const useGoogleMaps = () => {
  const [map, setMap] = useState<any | null>(null);
  const { isLoaded, loadError } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_SMART || '',
    language: 'en',
    region: 'US',
    libraries: LIBRARIES
  });
  const onLoad = useCallback((map: any) => {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return {
    map, isLoaded, onLoad, onUnmount, loadError
  };
};

