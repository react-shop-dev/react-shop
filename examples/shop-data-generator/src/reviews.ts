import type { Identifier } from 'react-shop-types';
import { Db } from './types';
import { faker } from './faker';
import { REVIEW_STATUS } from './constants';

export const generateReviews = (db: Db): Review[] => {
  const reviews = db.products.flatMap(product => {
    if (product.published && faker.datatype.boolean(0.8)) {
      return Array.from(Array(faker.number.int({ min: 1, max: 3 })).keys()).map(() => ({
        id: faker.string.uuid(),
        product_id: product.id,
        author_id: `cus_${faker.string.uuid()}`,
        author: faker.person.fullName(),
        avatar: faker.image.avatarGitHub(),
        comment: faker.lorem.lines({ min: 1, max: 4 }),
        rating: faker.number.float({
          min: Math.max(Number(product.rating) - 0.5, 2),
          max: Math.min(Number(product.rating) + 0.5, 5),
          precision: 0.1,
        }),
        status: faker.helpers.weightedArrayElement([
          { value: REVIEW_STATUS.pending, weight: 2 },
          { value: REVIEW_STATUS.accepted, weight: 7 },
          { value: REVIEW_STATUS.rejected, weight: 1 },
        ]),
        created_at: faker.date.between({
          from: String(product.published),
          to: new Date().toISOString(),
        }),
      }));
    }
    return [];
  });
  return reviews;
};

type RewiewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

export type Review = {
  id: Identifier;
  author?: string;
  author_id?: string;
  product_id: Identifier;
  avatar?: string;
  comment: string;
  rating: number;
  status: RewiewStatus;
  created_at: Date;
};
