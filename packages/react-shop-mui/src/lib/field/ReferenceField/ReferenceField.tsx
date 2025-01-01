import type { ReactNode } from 'react';
import {
  RecordContextProvider,
  UseReferenceResult,
  useRecordContext,
  useReference,
  useTranslate,
} from 'react-shop';
import type { RsRecord, Identifier } from 'react-shop-types';
import get from 'lodash/get';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorIcon from '@mui/icons-material/Error';
import type { SxProps } from '@mui/material/styles';

export const ReferenceField = (props: ReferenceFieldProps) => {
  const { source, emptyText, reference, children } = props;

  const translate = useTranslate();
  const record = useRecordContext(props);
  const id = get(record, source);

  return id == null ? (
    emptyText ? (
      <Typography component="span" variant="body2">
        {emptyText && translate(emptyText, { _: emptyText })}
      </Typography>
    ) : null
  ) : (
    <NonEmptyReferenceField reference={reference} record={record} id={id as Identifier}>
      {children}
    </NonEmptyReferenceField>
  );
};

const NonEmptyReferenceField = ({
  id,
  reference,
  children,
  queryOptions,
  ...props
}: Omit<ReferenceFieldProps, 'source'> & {
  id: Identifier;
}) => {
  return (
    <ReferenceFieldView
      reference={reference}
      {...props}
      {...useReference({ id, reference, options: queryOptions })}
    >
      {children}
    </ReferenceFieldView>
  );
};

const ReferenceFieldView = (props: ReferenceFieldViewProps) => {
  const { referenceRecord, isLoading, error, emptyText, children } = props;

  const translate = useTranslate();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return (
      /* eslint-disable jsx-a11y/role-supports-aria-props */
      <ErrorIcon
        aria-errormessage={error.message ? error.message : error}
        role="presentation"
        color="error"
        fontSize="small"
      />
      /* eslint-enable */
    );
  }

  if (!referenceRecord) {
    return emptyText ? <>{emptyText && translate(emptyText, { _: emptyText })}</> : null;
  }

  return <RecordContextProvider value={referenceRecord}>{children}</RecordContextProvider>;
};

export interface ReferenceFieldProps {
  reference: string;
  children?: ReactNode;
  emptyText?: string;
  sx?: SxProps;
  source: string;
  record?: RsRecord;
  queryOptions?: any;
}

export interface ReferenceFieldViewProps extends UseReferenceResult {
  children?: ReactNode;
  reference: string;
  resource?: string;
  emptyText?: string;
}
