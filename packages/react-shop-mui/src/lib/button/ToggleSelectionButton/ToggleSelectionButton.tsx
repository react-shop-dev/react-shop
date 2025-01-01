import { useCallback } from 'react';
import type { Identifier } from 'react-shop-types';
import { useRecordContext, useTranslate, useListContext } from 'react-shop';
import Tooltip from '@mui/material/Tooltip';
import CheckBoxIcon from '@mui/icons-material/Done';
import BlankIcon from '@mui/icons-material/RadioButtonUnchecked';
import MuiToggleButton from '@mui/material/ToggleButton';
import { StyledToggleButtonRoot } from './ToggleSelectionButton.styles';

export const ToggleSelectionButton = () => {
  const { selectedIds, onToggleItem } = useListContext();

  const record = useRecordContext();
  const translate = useTranslate();

  const selected = selectedIds?.includes(record?.id as Identifier);

  const handleClick = useCallback(() => {
    if (onToggleItem) {
      onToggleItem(record?.id as Identifier);
    }
  }, [record, onToggleItem]);

  return (
    <Tooltip title={translate(selected ? 'rs.action.unselect' : 'rs.action.select')}>
      <StyledToggleButtonRoot>
        <MuiToggleButton
          selected={selected}
          value={selected ? 'checked' : 'uncheked'}
          size="small"
          onClick={handleClick}
        >
          {selected ? <CheckBoxIcon fontSize="inherit" /> : <BlankIcon fontSize="inherit" />}
        </MuiToggleButton>
      </StyledToggleButtonRoot>
    </Tooltip>
  );
};
