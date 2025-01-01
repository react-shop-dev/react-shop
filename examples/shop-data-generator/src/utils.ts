import { faker } from './faker';
import md5 from 'md5';
import { isAfter, subDays } from 'date-fns';
import type {
  ExpandProperty,
  PriceType,
  Image as ProductImage,
  ProductOption,
  ProductTag,
  ProductVariant,
} from 'react-shop-types';
import {
  EBOOK_DISCOUNT,
  MAX_RATING,
  MAX_SALES,
  MAX_STOCK_VALUE,
  MIN_RATING,
  MIN_STOCK_VALUE,
  STOCK_STATUS,
  PUBLISHED_AGO,
  STORAGE_IMAGE_FORMAT,
  STORAGE_URL,
} from './constants';
import type { PublishedItem, StockItemStatus } from './types';

export const generateID = (inputString: string): string => md5(inputString);

export const slugify = (value: string) => faker.helpers.slugify(value).toLowerCase();

export const shuffle = <T>(array: T[]): T[] => {
  // Clone the array to avoid modifying the original array
  const shuffledArray = array.slice();
  // Start from the end of the array and swap each element with a randomly selected one before it
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements at i and j
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

export const weightedArrayElements = <TValue>(
  values: readonly TValue[],
  weights: number[],
  defaultValue?: TValue,
): TValue[] => {
  const result = values
    .map((item, index) => faker.helpers.maybe(() => item, { probability: weights[index] }))
    .filter((item): item is TValue => item !== undefined);

  return result.length === 0 && defaultValue ? [defaultValue] : result;
};

export const generateRating = (sales: number): number => {
  // Calculate the probability of getting a higher rating based on sales
  const probability = Math.min(1, sales / MAX_SALES);
  // Use Faker to generate a random rating within the specified range
  const rating = faker.number.float({
    min: MIN_RATING,
    max: MAX_RATING,
    precision: 0.1,
  });
  // Adjust the rating based on the calculated probability
  const adjustedRating = Number((rating + (MAX_RATING - rating) * probability).toFixed(1));

  return Math.min(MAX_RATING, adjustedRating); // Ensure the rating is within the valid range
};

export const generateDate = (years = PUBLISHED_AGO, asDate = false): Date | string => {
  const maxDate = new Date().getTime();
  const minDate = new Date(faker.date.past({ years })).getTime();
  const range = maxDate - minDate;

  const ts = Math.pow(Math.random(), 2) * range;
  const date = new Date(minDate + ts);
  return asDate ? date : date.toISOString();
};

export const generatePrice = ({
  min,
  max,
  digits = 0,
  discountAvailable = true,
}: {
  min: number;
  max: number;
  digits?: number;
  discountAvailable?: boolean;
}): PriceType => {
  const percentageDiscount = discountAvailable
    ? faker.helpers.maybe(() => faker.helpers.arrayElement([5, 10, 15]))
    : null;

  const price = Number(faker.commerce.price({ min, max, dec: digits }));
  const price_number = price * (digits ? 1 : 100);
  let difference = 0;
  let calculated_price: PriceType['calculated_price'] = price_number;
  let original_price: PriceType['original_price'] = price_number;
  if (percentageDiscount) {
    difference = (price_number * percentageDiscount) / 100;
    calculated_price = price_number - difference;
  }
  if (digits > 0) {
    original_price = price;
    calculated_price = Number(calculated_price.toFixed(digits));
  }
  return {
    calculated_price,
    original_price,
    difference,
    price_type: percentageDiscount ? 'sales' : 'default',
  };
};

export const generateTags = (
  sales: PublishedItem['sales'],
  published: PublishedItem['published'],
): Array<ProductTag> => {
  const tags: Array<ProductTag> = [];

  // Published 2 months ago or after
  if (published && isAfter(published, subDays(new Date(), 62))) {
    tags.push({ value: 'new', id: `tag_${faker.string.uuid()}` });
  }
  if (sales && sales > MAX_SALES - MAX_SALES / 8) {
    tags.push({ value: 'bestseller', id: `tag_${faker.string.uuid()}` });
  }

  return tags;
};

const arrayImageRepeater = (value: string, extension: string, count: number): Array<ProductImage> =>
  Array.from({ length: count }, (_, index) => ({
    id: `img_${faker.string.uuid()}`,
    url: `${value}${index + 1}.${extension}`,
  }));

export const generateImages = (thumbnailName: string, imagesCount?: number) => {
  return [
    {
      id: `img_${faker.string.uuid()}`,
      url: `${STORAGE_URL}/assets/${thumbnailName}.${STORAGE_IMAGE_FORMAT}`,
    },
    ...(imagesCount
      ? arrayImageRepeater(
          `${STORAGE_URL}/assets/${thumbnailName}`,
          STORAGE_IMAGE_FORMAT,
          imagesCount,
        )
      : []),
  ];
};

export const generateCombinations = <T extends string>(
  arrays: ExpandProperty<T>[][],
): ExpandProperty<T>[][] => {
  if (arrays.length === 0) return [[]];
  const [first, ...rest] = arrays;
  const combinations = generateCombinations(rest);
  return first.flatMap(value => combinations.map(combination => [value, ...combination]));
};

const generateOptionValues = <T extends string>(
  product_id: string,
  option_id: string,
  combinations: T[][],
  index: number,
) => {
  return combinations.map((combination, i) => {
    const value = combination[index];
    return {
      id: `optval_${generateID(`${value}${i}`)}`,
      value,
      option_id,
      variant_id: generateVariantId(product_id, combination),
    };
  });
};

export const generateOptions = <T extends string>(
  product_id: string,
  keys: string[],
  combinations: T[][],
): ProductOption[] => {
  return keys.map((key, index) => {
    const option_id = `opt_${generateID(key)}`;
    const optionValues = generateOptionValues<T>(product_id, option_id, combinations, index);

    return {
      id: option_id,
      product_id,
      title: key,
      values: optionValues,
    };
  });
};

export const generateVariants = <T extends string>(
  product_id: string,
  price: PriceType,
  stock_status: StockItemStatus,
  options: ProductOption[],
  combinations: T[][],
): ProductVariant[] => {
  return combinations.map(combination => {
    const title = combination.join('/');
    const variant_id = generateVariantId(product_id, combination);
    const variantOptions = combination.map((_value, index) => {
      const optionValue = findOptionValueByVariantId(options[index], variant_id)!;
      return {
        id: optionValue.id,
        value: optionValue.value,
        option_id: optionValue.option_id,
        variant_id,
      };
    });

    const manage_inventory = title !== 'E-book';
    const calculated_price = generatePriceForVariant(price.calculated_price, title);
    const original_price = generatePriceForVariant(price.original_price, title);

    return {
      id: variant_id,
      title,
      product_id,
      sku: faker.commerce.isbn({ separator: '-', variant: 10 }),
      options: variantOptions,
      calculated_price,
      original_price,
      calculated_price_type: price.price_type,
      manage_inventory,
      allow_backorder: stock_status === STOCK_STATUS.preOrder,
      inventory_quantity:
        stock_status === STOCK_STATUS.inStock
          ? manage_inventory
            ? faker.number.int({ min: MIN_STOCK_VALUE, max: MAX_STOCK_VALUE })
            : MAX_STOCK_VALUE // always the same value
          : 0,
    };
  });
};

const generateVariantId = (productId: string, value: string[]) =>
  `variant_${generateID(`${productId}${value.join('_')}`)}`;

const findOptionValueByVariantId = (option: ProductOption, variant_id: string) =>
  (option.values || []).find(val => val.variant_id === variant_id);

const subtractPrice = (price: number) =>
  Number.isInteger(price) ? +price - EBOOK_DISCOUNT : price;

const generatePriceForVariant = (price: number, title: string) =>
  title === 'E-book' ? subtractPrice(price) : price;
