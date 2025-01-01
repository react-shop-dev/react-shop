import type { ComponentType } from 'react';
import { useTranslate } from 'react-shop/translate';
import Typography from '@mui/material/Typography';
import EmptyIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { Centered } from '@views/Centered';
import { EmptyClasses, StyledEmpty } from './Empty.styles';

export type EmptyProps = {
  message?: string;
  icon?: ComponentType;
};

export const Empty = (props: EmptyProps) => {
  const { message = 'rs.message.empty', icon: Icon = DefaultIcon } = props;
  const translate = useTranslate();

  return (
    <StyledEmpty>
      <Centered>
        <Icon className={EmptyClasses.icon} />
        <Typography variant="h6" component="p" gutterBottom>
          {translate(message)}
        </Typography>
      </Centered>
    </StyledEmpty>
  );
};

const DefaultIcon = EmptyIcon;
