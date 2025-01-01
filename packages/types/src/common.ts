export type Identifier = string | number;

export interface RsRecord<IdentifierType extends Identifier = Identifier>
  extends Record<string, any> {
  id: IdentifierType;
}

export interface StringMap {
  [key: string]: StringMap | string | undefined;
}

export type Dictionary<T = any> = {
  [k: string]: T;
};

export type MetadataType = Record<string, unknown> | null;

export type WithOptionalProperty<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Replace option keys with required
export type WithRequiredProperty<T, K extends keyof T> = T & {
  [Property in K]-?: T[Property];
};

// Remove null, undefined from a type
export type ExpandProperty<T> = T extends (infer U)[] ? NonNullable<U> : NonNullable<T>;

export interface BaseEntity {
  id: Identifier;
  created_at?: Date | string | null;
  updated_at?: Date | string | null;
}

export interface SoftDeletableEntity extends BaseEntity {
  deleted_at?: Date | string | null;
}
