import { Province } from "./province";

export interface Country {
  name: string;
  code: string;
  provinces: Province[];
}