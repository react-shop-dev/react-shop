export const substituteTokens = (template: string, data: any) =>
  template && data
    ? String.prototype.replace.call(template, defaultTokenRegex, function (expression, argument) {
        if (!Object.prototype.hasOwnProperty.call(data, argument || data[argument] == null)) {
          return expression;
        }
        return data[argument];
      })
    : template;

const defaultTokenRegex = /\{(.*?)\}/g;
