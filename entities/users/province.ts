import { City } from "./city";

export interface Province {
  name: string;
  code: string;
  cities: City[];
}
