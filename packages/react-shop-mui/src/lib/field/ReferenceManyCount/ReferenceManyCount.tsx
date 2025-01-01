import {
  SortPayload,
  useRecordContext,
  useReferenceManyFieldController,
  useTimeout,
} from 'react-shop';
import type { RsRecord } from 'react-shop-types';
import Typography, { type TypographyProps } from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorIcon from '@mui/icons-material/Error';
import { NextMuiLink, type NextMuiLinkProps } from '@common/NextMuiLink';

export type ReferenceManyCountProps = {
  reference: string;
  target: string;
  sort?: SortPayload;
  filter?: any;
  timeout?: number;
  source?: string;
  record?: RsRecord;
  link?: string;
} & TypographyProps &
  NextMuiLinkProps;

export const ReferenceManyCount = (props: ReferenceManyCountProps) => {
  const { reference, source = 'id', target, filter, sort, timeout = 1000, link, ...rest } = props;

  const record = useRecordContext(props);
  const timeoutHasPassed = useTimeout(timeout);

  const { isPending, error, total } = useReferenceManyFieldController({
    page: 1,
    perPage: 1,
    record,
    reference,
    source,
    target,
    filter,
    sort,
  });

  const body = isPending ? (
    timeoutHasPassed ? (
      <CircularProgress size={14} />
    ) : (
      ''
    )
  ) : error ? (
    <ErrorIcon color="error" fontSize="small" titleAccess="error" />
  ) : (
    total
  );

  return link ? (
    <NextMuiLink {...rest} href={link}>
      {body}
    </NextMuiLink>
  ) : (
    <Typography component="span" variant="body2" {...rest}>
      {body}
    </Typography>
  );
};
