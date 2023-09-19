import { IformData } from './formData';

export interface IreturnSubForm {
  id: number;
  mainFormId: number;
  name: string;
  size: number;
  order: number;
  formData: IformData[];
}
