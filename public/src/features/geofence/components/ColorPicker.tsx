import { Button } from 'rsuite';

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
  handleClear: () => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
  handleClear,
}) => {
  const colors = ['#FF0000', '#00FF00', '#0000FF', '#000000', '#FFFFFF'];
  return (
    <div>
      <span>Draw Polygon:</span>
      <div style={{ display: 'flex', margin: '10px 0' }}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => onColorChange(color)}
            style={{
              backgroundColor: color,
              width: '20px',
              height: '20px',
              margin: '0 5px',
              cursor: 'pointer',
              border: selectedColor === color ? '2px solid black' : 'none',
            }}
          />
        ))}
      </div>
      <Button appearance="default" onClick={handleClear}>
        Delete selected shape
      </Button>
    </div>
  );
};

export default ColorPicker;
