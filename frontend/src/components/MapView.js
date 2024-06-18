import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarkerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41],
});

const MapView = ({ geojsonData }) => {
  const defaultCenter = [22.3511148, 78.6677428];
  const defaultZoom = 5;

  if (!geojsonData || !Array.isArray(geojsonData)) {
    return null;
  }

  return (
    <MapContainer center={defaultCenter} zoom={defaultZoom} style={{ height: '750px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />

   
      {geojsonData.map((feature, index) => {
        if (feature.geometry.type === 'Point') {
          const [lng, lat] = feature.geometry.coordinates;
          return (
            <Marker key={index} position={[lat, lng]} icon={customMarkerIcon}>
              <Popup>
                <div>
                  <h3>{feature.properties?.name || 'No name'}</h3>
                  <p>{feature.properties?.description || 'No description'}</p>
                </div>
              </Popup>
            </Marker>
          );
        } else {
          return <GeoJSON key={index} data={feature.geometry} />;
        }
      })}
    </MapContainer>
  );
};

export default MapView;
