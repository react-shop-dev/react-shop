export function delayedFunction<TArgs extends any[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn> | TReturn,
  debounce = 0,
) {
  return async (...args: TArgs) => {
    const start = Date.now();
    const result = await fn(...args);
    const end = Date.now();

    const elapsedTime = end - start;

    if (elapsedTime < debounce) {
      const remainingTime = debounce - elapsedTime;
      await new Promise(resolve => setTimeout(resolve, remainingTime));
    }

    return result;
  };
}
