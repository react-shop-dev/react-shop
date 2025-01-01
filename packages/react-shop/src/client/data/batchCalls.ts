export const batchCalls = (fn: any) => {
  let capturedArgs: any[] = [];
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (arg: any) => {
    capturedArgs.push(arg);
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      fn([...capturedArgs]);
      capturedArgs = [];
    }, 0);
  };
};
