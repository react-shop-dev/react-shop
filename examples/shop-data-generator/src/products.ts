import data from './db';
import { faker } from './faker';
import { ProductStatus, type Identifier } from 'react-shop-types';
import {
  generateCombinations,
  generateDate,
  generateID,
  generateImages,
  generateOptions,
  generatePrice,
  generateRating,
  generateTags,
  generateVariants,
  shuffle,
  slugify,
  weightedArrayElements,
} from './utils';
import {
  SIZES,
  COLORS,
  FORMATS,
  MAX_SALES,
  MIN_SALES,
  STOCK_STATUS,
  STORAGE_URL,
  PRODUCT_TYPE,
  STORAGE_IMAGE_FORMAT,
} from './constants';
import { categoriesMap } from './db/categories';
import type { StoreItem, StoreItemType, StoreItemBase, PublishedItem, Metadata } from './types';
import { salesChannel, profile } from './shared';

export const generateProducts = (): StoreItem[] =>
  shuffle<StoreItemBase>(data).map(item => {
    const { category_id, imagesCount, thumbnail: imageName, ...itemBase } = item;
    // ID
    const product_id = `prod_${generateID(item.title)}`;
    // Stock status
    const stock_status = faker.helpers.weightedArrayElement([
      { value: STOCK_STATUS.inStock, weight: 7 },
      { value: STOCK_STATUS.outOfStock, weight: 2 },
      { value: STOCK_STATUS.preOrder, weight: 1 },
    ]);
    // Number of Sales
    const sales = faker.number.int({ min: MIN_SALES, max: MAX_SALES });
    // Category
    const category = {
      ...categoriesMap[category_id],
      id: category_id,
      handle: slugify(categoriesMap[category_id].name),
    };
    // Type
    const type_id = `ptyp_${faker.string.uuid()}`;
    const typeValue = (category_id ? category?.type : item.type) || PRODUCT_TYPE.book;
    const type: { id: Identifier; value: StoreItemType } = {
      id: type_id,
      value: typeValue,
    };
    // Price
    const discountable = faker.datatype.boolean({ probability: sales < MAX_SALES / 2 ? 0.7 : 0.2 });
    const price = generatePrice({
      discountAvailable: discountable && stock_status === STOCK_STATUS.inStock,
      min: typeValue === 'accessory' ? 1 : 25,
      max: typeValue === 'accessory' ? 10 : 50,
    });
    // Metadata
    const metadata = generateMatadata(typeValue);
    // Options and variants
    const optionKeys = getOptionKeysByType(typeValue);
    const optionValues = getOptionValuesByType(typeValue, metadata);
    const combinators = generateCombinations(optionValues);
    const options = generateOptions(product_id, optionKeys, combinators);
    const variants = generateVariants(product_id, price, stock_status, options, combinators);
    // Images
    const thumbnail = imageName ? `${STORAGE_URL}/assets/${imageName}.${STORAGE_IMAGE_FORMAT}` : '';
    const images = imageName ? generateImages(imageName, imagesCount) : [];
    // Published StoreItem Data
    const published = typeValue === 'book' ? generateDate() : null;
    const generatePublishedData = (): PublishedItem =>
      stock_status !== STOCK_STATUS.preOrder
        ? {
            tags: generateTags(sales, published),
            sales,
            rating: generateRating(sales),
            published,
          }
        : { rating: null };

    return {
      ...defaultData,
      ...itemBase,
      id: product_id,
      handle: slugify(item.title),
      thumbnail,
      images,
      type_id,
      type,
      options,
      variants,
      price,
      category_id,
      categories: [category],
      profile_id: profile.id,
      profile,
      profiles: [profile],
      discountable,
      ...metadata,
      // Custom fields
      _price: price.calculated_price,
      stock_status,
      ...generatePublishedData(),
    };
  });

const defaultData = {
  status: ProductStatus.PUBLISHED,
  is_gitfcard: false,
  collection_id: null,
  collection: null,
  external_id: null,
  origin_country: null,
  hs_code: null,
  mid_code: null,
  sales_channels: [salesChannel],
};

const getOptionKeysByType = (type: StoreItemType): string[] => {
  switch (type) {
    case PRODUCT_TYPE.book:
      return ['Format'];
    case PRODUCT_TYPE.accessory:
      return ['Color', 'Size'];
    default:
      return [];
  }
};

const generateMatadata = (type: StoreItemType): Metadata => {
  switch (type) {
    case PRODUCT_TYPE.book:
      return { format: weightedArrayElements(FORMATS, [0.5, 0.3, 0.1], 'Paperback') };
    case PRODUCT_TYPE.accessory:
      return {
        color: faker.helpers.arrayElements(COLORS),
        size: faker.helpers.arrayElements(SIZES),
      };
    default:
      return {};
  }
};

const getOptionValuesByType = (
  type: StoreItemType,
  { color = [], format = [], size = [] }: Metadata,
): string[][] => {
  switch (type) {
    case PRODUCT_TYPE.book:
      return [format];
    case PRODUCT_TYPE.accessory:
      return [color, size];
    default:
      return [];
  }
};
