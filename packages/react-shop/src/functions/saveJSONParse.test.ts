import { vi } from 'vitest';
import { safeJSONParse } from './saveJSONParse';

describe('safeJSONParse', () => {
  it('should parse a valid JSON string', () => {
    const jsonString = '{"key": "value"}';
    const result = safeJSONParse(jsonString);
    expect(result).toEqual({ key: 'value' });
  });

  it('should return the default value for invalid JSON strings', () => {
    const invalidJson = '{key: "value"}';
    const defaultValue = { default: true };
    const result = safeJSONParse(invalidJson, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return the input if it is already an object', () => {
    const obj = { key: 'value' };
    const result = safeJSONParse(obj);
    expect(result).toBe(obj);
  });

  it('should return the default value for null input', () => {
    const defaultValue = { default: true };
    const result = safeJSONParse(null, defaultValue);
    expect(result).toEqual(defaultValue);
  });

  it('should return undefined for undefined input without default value', () => {
    const result = safeJSONParse(undefined);
    expect(result).toBeUndefined();
  });

  it('should log an error and return an error object for invalid JSON without default value', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const invalidJson = '{key: "value"}';
    const result = safeJSONParse(invalidJson);

    expect(result).toHaveProperty('error');
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error parsing JSON:'),
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it('should return the default value if input is not a string or object', () => {
    const input = 42;
    const defaultValue = { default: true };
    const result = safeJSONParse(input, defaultValue);
    expect(result).toEqual(defaultValue);
  });
});
