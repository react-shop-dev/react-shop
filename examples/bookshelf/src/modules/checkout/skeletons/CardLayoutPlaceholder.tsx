import Skeleton from '@mui/material/Skeleton';
import { InputHolder } from '../../common/InputHolder';

const CardLayoutPlaceholder = () => {
  return (
    <>
      <InputHolder gridColumn={6}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </InputHolder>
      <InputHolder gridColumn={3}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </InputHolder>
      <InputHolder gridColumn={3}>
        <Skeleton variant="rounded" width="100%" height={40} />
      </InputHolder>
    </>
  );
};

export default CardLayoutPlaceholder;
