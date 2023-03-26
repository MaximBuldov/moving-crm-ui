import React, { memo, useState } from 'react';
import { DirectionsRenderer, DirectionsService, GoogleMap } from '@react-google-maps/api';
import { useGoogleMaps } from 'hooks';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 32.74,
  lng: -117.13
};

enum TravelMode {
	BICYCLING = 'BICYCLING',
	DRIVING = 'DRIVING',
	TRANSIT = 'TRANSIT',
	WALKING = 'WALKING',
}

export const EstimateStopsFullMap = memo(({ addresses }: { addresses: any }) => {
  const [directions, setDirections] = useState(null);
  const { isLoaded, onLoad, onUnmount } = useGoogleMaps();
  const directionsCallback = (response: any) => {
    if(!directions) {
      if (response?.status === 'OK') {
        setDirections(response);
      }
    }
  };
  let waypoints = [];
  if (addresses.length > 2) {
    waypoints = addresses.slice(1, -1).map((el: any) => ({
      location: el.address,
      stopover: true
    }));
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {addresses && (
        <DirectionsService
          options={{
            origin: addresses[0].address,
            destination: addresses.slice(-1)[0].address,
            travelMode: TravelMode.DRIVING,
            waypoints
          }}
          callback={directionsCallback}
        />
      )}
      {
        directions !== null && (
          <DirectionsRenderer
            options={{ directions }}
          />
        )
      }
    </GoogleMap>
  ) : <></>;
});