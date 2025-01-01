export enum ShopErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
  FORMATTING_ERROR = 'FORMATTING_ERROR',
}

export class ShopError extends Error {
  public readonly code: ShopErrorCode;
  public readonly originalMessage: string | undefined;

  constructor(code: ShopErrorCode, originalMessage?: string) {
    let message: string = code;
    if (originalMessage) {
      message += ': ' + originalMessage;
    }
    super(message);
    Object.setPrototypeOf(this, ShopError.prototype);

    this.code = code;
    if (originalMessage) {
      this.originalMessage = originalMessage;
    }
  }
}
