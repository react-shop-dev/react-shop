import type { ComponentType } from 'react';
import { useAtom, ViewMode, viewModeState } from 'react-shop';
import { useTranslate } from 'react-shop/translate';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ButtonGroup from '@mui/material/ButtonGroup';
import ViewList from '@mui/icons-material/ViewList';
import Apps from '@mui/icons-material/Apps';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import { StyledSwitchViewMode, SwitchViewModeClasses } from './SwitchViewMode.styles';

export type SwitchViewModeProps = {
  label?: string;
  gridIcon?: ComponentType<SvgIconProps>;
  listIcon?: ComponentType<SvgIconProps>;
};

export const SwitchViewMode = (props: SwitchViewModeProps) => {
  const {
    label = 'rs.view.title',
    gridIcon: GridIcon = Apps,
    listIcon: ListIcon = ViewList,
  } = props;

  const [mode, setMode] = useAtom(viewModeState);

  const translate = useTranslate();

  const isGridMode = mode === ViewMode.grid;
  const isListMode = mode === ViewMode.list;

  return (
    <StyledSwitchViewMode gap={0.5}>
      {label ? (
        <Typography whiteSpace="pre" color="inherit" className={SwitchViewModeClasses.label}>
          {typeof label === 'string' ? translate(label, { _: label }) : label}:
        </Typography>
      ) : null}
      <ButtonGroup color="inherit" size="small" aria-label="Switch view">
        <Button
          variant="text"
          onClick={() => setMode(ViewMode.grid)}
          disabled={isGridMode}
          aria-label="Grid mode"
        >
          <Tooltip title={translate(`rs.view.${ViewMode.grid}`)}>
            <GridIcon color={isGridMode ? 'primary' : 'inherit'} fontSize="small" />
          </Tooltip>
        </Button>
        <Button
          variant="text"
          onClick={() => setMode(ViewMode.list)}
          disabled={isListMode}
          aria-label="List mode"
        >
          <Tooltip title={translate(`rs.view.${ViewMode.list}`)}>
            <ListIcon color={isListMode ? 'primary' : 'inherit'} fontSize="small" />
          </Tooltip>
        </Button>
      </ButtonGroup>
    </StyledSwitchViewMode>
  );
};
