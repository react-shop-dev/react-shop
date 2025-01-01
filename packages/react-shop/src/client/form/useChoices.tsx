import { ReactElement, useCallback, isValidElement, ReactNode } from 'react';
import get from 'lodash/get';
import type { RsRecord } from 'react-shop-types';
import { useTranslate } from '../i18n/useTranslate';

import { RecordContextProvider } from '../core/RecordContextProvider';

export type OptionTextElement = ReactElement<{ record: RsRecord }>;

export type OptionTextFunc = (choice: any) => ReactNode;
export type OptionText = OptionTextElement | OptionTextFunc | string;

export interface UseChoicesOptions {
  optionValue?: string;
  optionText?: OptionText;
  disableValue?: string;
  translateChoice?: boolean;
}

export interface ChoicesProps {
  choices?: any[];
  optionValue?: string;
  optionText?: OptionText;
  translateChoice?: boolean;
}

export const useChoices = ({
  optionText = 'name',
  optionValue = 'id',
  disableValue = 'disabled',
  translateChoice = true,
}: UseChoicesOptions) => {
  const translate = useTranslate();

  const getChoiceText = useCallback(
    (choice: any) => {
      if (isValidElement(optionText)) {
        return <RecordContextProvider value={choice}>{optionText}</RecordContextProvider>;
      }

      const choiceName =
        typeof optionText === 'function' ? optionText(choice) : get(choice, optionText);

      return isValidElement(choiceName)
        ? choiceName
        : translateChoice
          ? translate(String(choiceName), { _: choiceName })
          : String(choiceName);
    },
    [translate, translateChoice, optionText],
  );

  const getChoiceValue = useCallback((choice: any) => get(choice, optionValue), [optionValue]);

  const getDisableValue = useCallback((choice: any) => get(choice, disableValue), [disableValue]);

  return {
    getChoiceText,
    getChoiceValue,
    getDisableValue,
  };
};
