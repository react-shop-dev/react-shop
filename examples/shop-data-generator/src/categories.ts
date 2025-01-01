import type { ProductCategory } from 'react-shop-types';
import { categoriesMap } from './db/categories';
import { slugify } from './utils';

export const generateCategories = (): ProductCategory[] =>
  Object.keys(categoriesMap)
    .map(id => {
      const {
        name,
        is_active,
        is_internal,
        description,
        parent_category_id,
        category_children_ids,
        type,
      } = categoriesMap[id];
      return {
        id,
        name,
        is_active,
        is_internal: is_internal || false,
        description,
        handle: slugify(name),
        parent_category_id: parent_category_id || null,
        category_children_ids: category_children_ids || [],
        metadata: { type },
      };
    })
    .filter(item => item.is_active);
