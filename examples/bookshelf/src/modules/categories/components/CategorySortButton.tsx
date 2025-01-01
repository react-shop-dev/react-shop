import { SortButton } from 'react-shop-mui/SortButton';

const options: { [key: string]: string | null } = {
  'id:ASC': 'rs.sort.default',
  '_price:ASC': 'rs.sort.lowToHigh',
  '_price:DESC': 'rs.sort.hignToLow',
  'sales:DESC': 'rs.sort.top',
  rating: null,
};

export const CategorySortButton = () => <SortButton options={options} />;
