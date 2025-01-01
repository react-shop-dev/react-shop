export interface Currency {
  /**
   * The symbol of the currency
   * @example
   * $
   */
  symbol: string;
  /**
   * The ISO 3 character of the currency
   * @example
   * usd
   */
  code: string;
  /**
   * The counter of the currency
   * @example
   * US
   */
  country?: string;
  /**
   * The name of the currency
   * @example
   * US Dollar
   */
  name?: string;
  /**
   * Tax including
   */
  includes_tax?: boolean;
}
