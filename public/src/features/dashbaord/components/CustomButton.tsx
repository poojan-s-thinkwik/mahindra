import { Button } from 'rsuite';

interface CustomButtonProps {
  text: string;
  backgroundColor: string;
  width: string;
  height: string;
  handleNavigate?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  backgroundColor,
  width,
  height,
  handleNavigate,
}) => {
  return (
    <Button
      style={{
        background: backgroundColor,
        width: width,
        height: height,
      }}
      onClick={handleNavigate}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
