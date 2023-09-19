import { IsubForm } from './subForm';

export interface IviewForm {
  data: {
    id: number;
    name: string;
    isDeleted: boolean;
    dateOfCreation: string;
    numberOfResponses: number;
    subforms: [
      {
        id: number;
        name: string;
        mainFormId: number;
        size: number;
        order: number;
        formData: [
          {
            id: number;
            subFormId: number;
            fieldQuestion: string;
            isMandatory: boolean;
            size: number;
            order: number;
            fieldtype: number;
            comboBoxItems: string[];
          }
        ];
      }
    ];
  };
  message: '';
  errorList: [];
}
