export interface ValidationErrorMessageWithArgs {
  message: string;
  args: {
    [key: string]: ValidationErrorMessageWithArgs | any;
  };
}

export type ValidationErrorMessage = string | ValidationErrorMessageWithArgs;

export type Validator = (
  value: any,
  values: any,
  props: any,
) => ValidationErrorMessage | null | undefined | Promise<ValidationErrorMessage | null | undefined>;
