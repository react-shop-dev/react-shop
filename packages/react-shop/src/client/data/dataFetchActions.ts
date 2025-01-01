export const fetchActionsWithRecordResponse = ['getOne', 'create', 'update'];

export const fetchActionsWithArrayOfIdentifiedRecordsResponse = [
  'getList',
  'getMany',
  'getManyReference',
];

export const fetchActionsWithArrayOfRecordsResponse = [
  ...fetchActionsWithArrayOfIdentifiedRecordsResponse,
  'updateMany',
  'deleteMany',
];

export const fetchActionsWithTotalResponse = ['getList', 'getManyReference'];

export const dataFetchActions = [
  ...fetchActionsWithRecordResponse,
  ...fetchActionsWithArrayOfRecordsResponse,
];
