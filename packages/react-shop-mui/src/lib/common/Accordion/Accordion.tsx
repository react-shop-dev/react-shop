'use client';
import type { ReactNode, ComponentType } from 'react';
import { useState } from 'react';
import MuiAccordion, { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export interface AccordionProps extends Omit<MuiAccordionProps, 'children'> {
  summary: ReactNode;
  children: ReactNode;
  expandIcon?: ComponentType<SvgIconProps>;
}

export const Accordion = (props: AccordionProps) => {
  const {
    summary,
    children,
    defaultExpanded = false,
    square = false,
    disableGutters = true,
    expandIcon: ExpandIcon = ExpandMoreIcon,
    ...rest
  } = props;

  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);

  return (
    <MuiAccordion
      disableGutters={disableGutters}
      expanded={expanded}
      square={square}
      defaultExpanded={defaultExpanded}
      onChange={() => setExpanded(!expanded)}
      {...rest}
    >
      <AccordionSummary expandIcon={<ExpandIcon />} aria-controls="panel-content">
        {summary}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
