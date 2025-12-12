import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const devices = [
  {
    id: '1',
    name: 'RT843',
    timestamp: '20/11/2024, 16:26:02',
    lat: 12.9716,
    lng: 77.5946,
    address: 'Bangalore, India',
  },
  {
    id: '2',
    name: 'RT825',
    timestamp: '20/11/2024, 18:29:59',
    lat: 28.7041,
    lng: 77.1025,
    address: 'Delhi, India',
  },
  {
    id: '3',
    name: 'BT REFLEX03',
    timestamp: '8/4/2024, 13:55:35',
    lat: 19.076,
    lng: 72.8777,
    address: 'Mumbai, India',
  },
];

const MapComponent = () => {
  return (
    <div className="h-screen w-full">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {devices.map((device) => (
          <Marker
            key={device.id}
            position={[device.lat, device.lng]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <strong>{device.name}</strong>
                <br />
                <small>{device.timestamp}</small>
                <br />
                <em>{device.address}</em>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
