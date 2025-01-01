/**
 * ======== CREDIT: Chakra UI ==========
 * https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/number-input/src/use-number-input.ts
 */
import {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  TouchEvent,
  ChangeEvent,
  FocusEvent,
} from 'react';
import { useIsFirstMount } from '../hooks';

const useNumberBoundary = (options: UseNumberInputOptions = {}) => {
  const {
    defaultValue,
    value,
    step = 1,
    precision = 0,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithRange = true,
    formatter = noop,
    parser = noop,
  } = options;

  const [interfaceValue, setInterfaceValue] = useState<string>(
    formatter(numberToString(defaultValue)),
  );

  const numberValue = toNumber(parser(interfaceValue));

  useEffect(() => {
    if (defaultValue === undefined && value !== numberValue) {
      setInterfaceValue(formatter(numberToString(value, precision)));
    }
  }, [value]);

  const change = (multiplier = 1, params: SpinParams = {}) => {
    setInterfaceValue((current: string) => {
      const result = (toNumber(parser(current)) ?? 0) + multiplier * (params?.step || step);
      const digits = params.precision ?? precision;
      if (keepWithRange) {
        if (result > max) return max.toFixed(digits);
        if (result < min) return min.toFixed(digits);
      }
      return formatter(result.toFixed(digits));
    });
  };

  const increment = (params: SpinParams = {}) => {
    change(1, params);
  };
  const decrement = (params: SpinParams = {}) => {
    change(-1, params);
  };

  return {
    interfaceValue,
    numberValue,
    increment,
    decrement,
    setInterfaceValue: (value: string) => setInterfaceValue(formatter(value)),
  };
};

export const useNumberInput = (options: UseNumberInputOptions = {}) => {
  const {
    step = 1,
    precision = 0,
    min = minSafeInteger,
    max = maxSafeInteger,
    keepWithRange = true,
    clampValueOnBlur = true,
    focusInputOnChange = true,
    parser = noop,
    formatter = noop,
    onChange,
  } = options;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { interfaceValue, setInterfaceValue, increment, decrement, numberValue } =
    useNumberBoundary(options);

  const tempInterfaceValue = useRef(interfaceValue);

  const isFirstMounted = useIsFirstMount();

  useEffect(() => {
    if (!isFirstMounted) {
      onChange?.(numberValue, {
        valueText: interfaceValue,
        error: getError(numberValue, min, max),
        eventType: 'change',
      });
    }
  }, [interfaceValue]);

  const spinUp = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    increment({ step });
    if (focusInputOnChange) inputRef.current?.focus();
  };

  const spinDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    decrement({ step });
    if (focusInputOnChange) inputRef.current?.focus();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    tempInterfaceValue.current = interfaceValue;
    const result = parser(event.target.value);
    if (result.match(/^(-|\+)?(0|[1-9]\d*)?(\.)?(\d+)?$/)) {
      setInterfaceValue(result);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const parsedValue = parser(event.target.value);
    if (parsedValue !== '') {
      const nextNum = Number(parsedValue);
      let result = '';
      if (Number.isNaN(nextNum)) {
        result = tempInterfaceValue.current;
      } else {
        result = nextNum.toFixed(precision);
        if (clampValueOnBlur) {
          if (nextNum > max) result = max.toFixed(precision);
          if (nextNum < min) result = min.toFixed(precision);
        }
      }
      setInterfaceValue(result);
      onChange?.(Number(result), {
        valueText: formatter(result),
        eventType: 'blur',
        error: getError(Number(result), min, max),
      });
    } else {
      onChange?.(undefined, {
        valueText: '',
        eventType: 'blur',
        error: null,
      });
    }
  };

  const incrementDisabled = keepWithRange && typeof numberValue === 'number' && numberValue >= max;
  const decrementDisabled = keepWithRange && typeof numberValue === 'number' && numberValue <= min;

  return {
    inputRef,
    getInputProps: (handlers?: Partial<InputHandlers>) => ({
      pattern: '[0-9]*(.[0-9]+)?',
      value: interfaceValue,
      autoComplete: 'off',
      autoCorrect: 'off',
      'aria-valuemin': min,
      'aria-valuemax': max,
      'aria-valuetext': interfaceValue,
      'aria-valuenow': numberValue,
      onChange: handleChange,
      onBlur: callAllHandlers(handleBlur, handlers?.onBlur),
    }),
    getIncrementProps: (handlers?: Partial<ButtonHandlers>) => ({
      tabIndex: -1,
      ...(typeof window !== 'undefined' && !!document.ontouchstart
        ? {
            onTouchStart: callAllHandlers(spinUp, handlers?.onTouchStart),
          }
        : {
            onMouseDown: callAllHandlers(spinUp, handlers?.onMouseDown),
          }),
      onMouseUp: handlers?.onMouseUp,
      onMouseLeave: handlers?.onMouseLeave,
      onTouchEnd: handlers?.onTouchEnd,
      disabled: incrementDisabled,
      'aria-disabled': incrementDisabled ? true : undefined,
    }),
    getDecrementProps: (handlers?: Partial<ButtonHandlers>) => ({
      tabIndex: -1,
      ...(typeof window !== 'undefined' && !!document.ontouchstart
        ? {
            onTouchStart: callAllHandlers(spinDown, handlers?.onTouchStart),
          }
        : {
            onMouseDown: callAllHandlers(spinDown, handlers?.onMouseDown),
          }),
      onMouseUp: handlers?.onMouseUp,
      onMouseLeave: handlers?.onMouseLeave,
      onTouchEnd: handlers?.onTouchEnd,
      disabled: decrementDisabled,
      'aria-disabled': decrementDisabled ? true : undefined,
    }),
  };
};

export const callAllHandlers =
  <T>(...handlers: Array<undefined | ((event: T) => void)>) =>
  (event: T) => {
    handlers.forEach(handler => {
      if (typeof handler === 'function') {
        handler(event);
      }
    });
  };

const getError = (value: number | undefined, min: number, max: number): NumberInputError | null => {
  if (typeof value === 'number') {
    if (value < min) return 'below-min';
    if (value > max) return 'exceed-max';
  }
  return null;
};

export const numberToString = (value?: number, precision = 0) => {
  const result = value?.toFixed(precision) ?? '';
  if (result === 'NaN') {
    return '';
  }
  return result;
};

export const toNumber = (value?: string) => {
  if (value === '') return undefined;
  const result = Number(value);
  return Number.isNaN(result) ? undefined : result;
};

export const minSafeInteger = Number.MIN_SAFE_INTEGER || -9007199254740991;
export const maxSafeInteger = Number.MAX_SAFE_INTEGER || 9007199254740991;

const noop = <T>(value: T) => value;

export interface BoundaryParams {
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
}

export interface SpinParams {
  step?: number;
  precision?: number;
}

export type NumberInputEventType = 'change' | 'blur';
export type NumberInputError = 'exceed-max' | 'below-min';

export type UseNumberInputOptions = {
  formatter?: (value: string) => string;
  parser?: (value: string) => string;
  keepWithRange?: true;
  clampValueOnBlur?: true;
  focusInputOnChange?: true;
  onChange?: (
    value: number | undefined,
    metadata: {
      valueText?: string;
      error: NumberInputError | null;
      eventType?: NumberInputEventType;
    },
  ) => void;
} & BoundaryParams &
  SpinParams;

interface InputHandlers {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

interface ButtonHandlers {
  onTouchStart: (event: TouchEvent<HTMLButtonElement>) => void;
  onTouchEnd: (event: TouchEvent<HTMLButtonElement>) => void;
  onMouseDown: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseUp: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave: (event: MouseEvent<HTMLButtonElement>) => void;
}
