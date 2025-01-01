'use client';
import type { ReactNode, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Accordion, type AccordionProps } from '@common/Accordion';
import { CheckboxGroupInput } from '../../input/CheckboxGroupInput';
import { FlexRowCenter } from '@views/FlexRowCenter';

export interface FilterInputGroupProps {
  source: string;
  icon?: ReactElement;
  title: ReactNode;
  defaultExpanded?: boolean;
  choices: any[];
  optionValue?: string;
  accordionProps?: AccordionProps;
}

export const FilterInputGroup = (props: FilterInputGroupProps) => {
  const isMatchMedia = useMediaQuery<Theme>(theme => theme.breakpoints.down('md'));

  const {
    source,
    title,
    icon,
    optionValue,
    accordionProps,
    choices,
    defaultExpanded = isMatchMedia ? false : true,
  } = props;

  return (
    <Accordion
      defaultExpanded={defaultExpanded}
      summary={
        <FlexRowCenter>
          {icon}
          <Typography variant="subtitle1" fontSize="14px" component="h2" fontWeight={500}>
            {title}
          </Typography>
        </FlexRowCenter>
      }
      {...defaultProps}
      {...accordionProps}
    >
      <Box color="inherit">
        <CheckboxGroupInput
          optionValue={optionValue}
          source={source}
          group={false}
          choices={choices}
        />
      </Box>
    </Accordion>
  );
};

const defaultProps = {
  elevation: 0,
  color: 'grey.900',
  sx: {
    '& .MuiAccordionDetails-root': {
      pb: 0,
      pl: 3,
    },
  },
};
