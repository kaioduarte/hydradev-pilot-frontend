export interface IUser {
  _id: string;
  name: string;
  role: 'basic' | 'admin';
  username: string;
  createdAt: string;
  updatedAt: string;
}
