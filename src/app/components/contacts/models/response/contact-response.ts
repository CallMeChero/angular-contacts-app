import { IContactNumber } from './contact-number';

export interface IContactResponse {
  id: number;
  fullName: string;
  imgSrc: string;
  isFavorite: boolean;
  email: string;
  phones: IContactNumber[];
}
