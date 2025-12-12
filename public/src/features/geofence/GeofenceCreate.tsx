import { useState } from 'react';
import GeofenceCreateForm from './components/GeofenceCreateForm';
import OsmMap from './components/OsmMap';
import { useMapEvents } from 'react-leaflet';

export default function GeofenceCreate() {
  const [selectedColor, setSelectedColor] = useState<string>('#2196F3');
  const [cordinates, setCoordinates] = useState<[number, number][]>([]);

  const MapEvents = () => {
    useMapEvents({
      click: (event) => {
        const newCoordinate: [number, number] = [
          event.latlng.lat,
          event.latlng.lng,
        ];
        setCoordinates((prev) => [...prev, newCoordinate]);
      },
    });
    return null;
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-3xl text-custom-blue font-semibold">
            Create Geofence
          </span>
        </div>
      </div>
      <div className="bg-white w-full h-auto mt-3 rounded-md">
        <div className="p-4 flex gap-3">
          <div className="w-1/3">
            <GeofenceCreateForm
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              handleClear={() => setCoordinates([])}
              cordinates={cordinates}
            />
          </div>
          <div className="w-full">
            <OsmMap
              selectedColor={selectedColor}
              MapEvents={MapEvents}
              cordinates={cordinates}
            />
          </div>
        </div>
      </div>
    </>
  );
}
