import { useState } from 'react';
import { Input } from 'rsuite';
import { useMap } from 'react-leaflet';

interface Location {
  lat: string;
  lon: string;
  display_name: string;
}

interface SearchLocationProps {
  onSearch: (lat: number, lon: number) => void;
}

const SearchInput: React.FC<SearchLocationProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const map = useMap();

  const fetchSuggestions = async (query: string): Promise<void> => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(query)}`
      );
      const data = (await response.json()) as Location[];
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (location: Location): void => {
    const { lat, lon } = location;
    onSearch(parseFloat(lat), parseFloat(lon));
    map.setView([parseFloat(lat), parseFloat(lon)], 10);
    setSearchText(location.display_name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleInputChange = (value: string): void => {
    setSearchText(value);
    fetchSuggestions(value).catch(console.error);
  };
  return (
    <>
      <div className="relative flex w-1/2 float-end flex-col z-[999999] mb-5">
        <Input
          type="text"
          placeholder="Search for a location..."
          value={searchText}
          onChange={handleInputChange}
          className="border p-2 w-full"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded shadow-lg z-50 mt-1"
            style={{ maxHeight: '200px', overflowY: 'auto' }}
          >
            {suggestions.map((location, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(location)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {location.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchInput;
