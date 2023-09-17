import { IformData } from './formData';

export interface IsubForm {
  mainFormId: number;
  name: string;
  size: number;
  order: number;
  formData: IformData[];
}
