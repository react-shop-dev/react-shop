import { useSubmit, useTranslate, UseSubmitProps } from 'react-shop';
import CircularProgress from '@mui/material/CircularProgress';
import SaveIcon from '@mui/icons-material/Save';
import { Button, type ButtonProps } from '@button/Button';
import { IconTooltipButton } from '@button/IconTooltipButton';

export interface SubmitButtonProps extends ButtonProps, UseSubmitProps {
  label?: string;
  loading?: boolean;
  iconOnly?: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    type = 'submit',
    label = 'rs.action.save',
    disabled: disabledProp,
    alwaysEnable,
    transform,
    iconOnly,
    mutationOptions,
    ...rest
  } = props;

  const translate = useTranslate();
  const { disabled, isSubmitting, handleClickSubmit } = useSubmit({
    disabled: disabledProp,
    alwaysEnable,
    transform,
    mutationOptions,
  });

  const displayedLabel = label && translate(label, { _: label });

  const buttonProps = {
    type,
    disabled,
    onClick: type === 'button' ? handleClickSubmit : undefined,
  };

  if (iconOnly) {
    return (
      <IconTooltipButton label={displayedLabel} color="primary" {...buttonProps}>
        <SaveIcon />
      </IconTooltipButton>
    );
  }

  return (
    <Button
      {...buttonProps}
      {...rest}
      label={
        <>
          {isSubmitting ? <CircularProgress size={24} thickness={3} /> : null} &nbsp;
          {displayedLabel}
        </>
      }
    />
  );
};
