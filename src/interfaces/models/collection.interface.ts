import { ICard } from './card.interface';
import { IUser } from './user.interface';

export interface ICollection {
  _id: string;
  name: string;
  cards: ICard[];
  user?: IUser;
}
