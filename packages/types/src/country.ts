import { Identifier } from './common';
import { Region } from './region';

export interface Country {
  id: Identifier;
  iso_2: string;
  iso_3?: string;
  num_code?: number;
  name: string;
  display_name: string;
  region_id: Region['id'] | null;
  region?: Region;
}
