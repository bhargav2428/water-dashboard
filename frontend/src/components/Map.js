import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map as OLMap, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import { Select as OLSelect } from 'ol/interaction';
import { click } from 'ol/events/condition';

const Map = ({ stations, onStationClick }) => {
  useEffect(() => {
    const map = new OLMap({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([78.9629, 20.5937]),
        zoom: 5,
      }),
    });

    const vectorSource = new VectorSource({
      features: stations.map(station => new Feature({
        geometry: new Point(fromLonLat([station.longitude, station.latitude])),
        name: station.name,
      })),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    const selectClick = new OLSelect({
      condition: click,
      layers: [vectorLayer],
    });

    selectClick.on('select', (event) => {
      const feature = event.selected[0];
      if (feature) {
        const station = stations.find(station => station.name === feature.get('name'));
        onStationClick(station);
      }
    });

    map.addInteraction(selectClick);

    return () => map.setTarget(null);
  }, [stations, onStationClick]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default Map;
