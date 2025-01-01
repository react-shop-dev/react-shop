import { ChangeEvent, KeyboardEvent, useRef } from 'react';

export interface UseSeparatorInputProps {
  maxLength: Array<number>;
  separator?: string;
  defaultValue?: string;
  value?: string;
}

export const useSeparatorInput = (props: UseSeparatorInputProps) => {
  const { separator, maxLength } = props;

  const maxCharacters = maxLength.reduce((total, sum) => total + sum) + maxLength.length - 1;
  const separatorIndexes = getSeparatorChars(maxLength);

  const codeRef = useRef<string | undefined>();

  const addSeparator = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let newValue = inputValue;

    if (someEqual(inputValue.length, separatorIndexes)) {
      newValue =
        codeRef.current === 'Backspace' ? inputValue.slice(0, -1) : `${inputValue}${separator}`;
    }
    newValue = newValue.substring(0, maxCharacters);
    return newValue;
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    codeRef.current = event.code;
  };

  return {
    addSeparator,
    onKeyDownHandler,
  };
};

const getSeparatorChars = (maxLength: Array<number>) => {
  const chars: Array<number> = [];
  let count = 0;
  maxLength.forEach((num, index, array) => {
    count += num;
    if (index !== array.length - 1) {
      chars.push(count);
    }
    count += 1;
  });
  return chars;
};

const someEqual = <T>(value: T, matches: Array<T>) => matches.some(match => value === match);
