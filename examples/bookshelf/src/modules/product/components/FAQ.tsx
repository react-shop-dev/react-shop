'use client';

import { use } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { FAQItem } from '@/lib/data/actions';

export const FAQ = ({ dataPromise }: { dataPromise: Promise<FAQItem[]> }) => {
  const data = use(dataPromise);

  return data?.map((item, index: number) => (
    <Accordion key={index} variant="outlined">
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{item.question}</AccordionSummary>
      <AccordionDetails sx={{ color: 'grey.600' }}>{item.answer}</AccordionDetails>
    </Accordion>
  ));
};
