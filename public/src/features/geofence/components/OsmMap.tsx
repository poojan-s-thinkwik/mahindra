import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { FaMapMarkerAlt } from 'react-icons/fa';
import SearchInput from './SearchInput';
import { useState } from 'react';

interface OsmMapProps {
  selectedColor: string;
  cordinates: [number, number][];
  MapEvents: () => JSX.Element | null;
}

const OsmMap: React.FC<OsmMapProps> = function OsmMap({
  selectedColor,
  cordinates,
  MapEvents,
}) {
  const [center, setCenter] = useState({
    latitude: '12.9716',
    longitude: '77.5946',
  });
  const handleLocationSearch = (lat: number, lon: number) => {
    setCenter({ latitude: lat.toString(), longitude: lon.toString() });
  };
  return (
    <>
      <MapContainer
        center={[parseFloat(center.latitude), parseFloat(center.longitude)]}
        zoom={8}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapEvents />
        <FaMapMarkerAlt
          className="absolute top-2 right-2 text-xl text-cyan-950 cursor-pointer"
          title="Create Corridor"
        />
        <Polyline
          positions={cordinates}
          pathOptions={{ color: selectedColor, weight: 5 }}
        />
        <SearchInput onSearch={handleLocationSearch} />
      </MapContainer>
    </>
  );
};

export default OsmMap;
