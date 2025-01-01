import { Button } from 'react-shop-mui/Button';
import { FlexBox } from 'react-shop-mui/FlexBox';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export const ShowMoreButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <FlexBox justifyContent="flex-end">
      <Button label="Show More" onClick={handleClick}>
        <AutorenewIcon />
      </Button>
    </FlexBox>
  );
};
