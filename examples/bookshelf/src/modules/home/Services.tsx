import { Suspense } from 'react';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import DiscountIcon from '@mui/icons-material/Discount';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Grid from '@mui/material/Grid2';
import { fetchList } from '@/lib/data/fetch';
import { ServiceItem } from './components/ServiceItem';
import { ServicesLoading } from './components/ServicesLoading';
import type { Service, ServiceIcon } from '@/types';

const icons: { [key in ServiceIcon]: React.ElementType } = {
  library: LibraryBooksIcon,
  discount: DiscountIcon,
  support: ContactSupportIcon,
};

const ServicesList = async () => {
  const { data: services } = await fetchList<Service>('services');

  return services?.length ? (
    <Grid container spacing={3} sx={{ my: 2 }}>
      {services.map(({ id, icon, ...rest }) => {
        const Icon = icons[icon];
        return (
          <ServiceItem key={id} icon={<Icon color="inherit" sx={{ fontSize: 50 }} />} {...rest} />
        );
      })}
    </Grid>
  ) : null;
};

const Services = () => {
  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServicesList />
    </Suspense>
  );
};

export default Services;
