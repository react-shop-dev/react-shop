import { Logo } from 'react-shop';
import Typography from '@mui/material/Typography';
import { FlexBox } from '@views/FlexBox';

const Creator = () => {
  return (
    <FlexBox>
      <Typography component="span" lineHeight={1.3}>
        Created by
      </Typography>
      <a
        rel="noopener noreferrer"
        href="https://reactshop.dev"
        aria-label="React shop site link"
        target="_blank"
      >
        <Logo height={18} width={125} />
      </a>
    </FlexBox>
  );
};

export default Creator;
