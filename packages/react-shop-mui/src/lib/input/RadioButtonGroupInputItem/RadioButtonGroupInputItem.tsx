'use client';
import { type OptionText, useChoices } from 'react-shop';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

export type RadioButtonGroupInputItemProps = {
  source: string;
  choice: any;
  optionValue: string;
  optionText: OptionText;
  translateChoice?: boolean;
};

export const RadioButtonGroupInputItem = ({
  source,
  choice,
  optionValue,
  optionText,
  translateChoice,
}: RadioButtonGroupInputItemProps) => {
  const { getChoiceText, getChoiceValue } = useChoices({
    optionText,
    optionValue,
    translateChoice,
  });

  const label = getChoiceText(choice);
  const value = getChoiceValue(choice);

  const nodeId = `${source}_${value}`;

  return (
    <FormControlLabel
      label={label}
      htmlFor={nodeId}
      value={value}
      control={<Radio id={nodeId} color="primary" />}
    />
  );
};
