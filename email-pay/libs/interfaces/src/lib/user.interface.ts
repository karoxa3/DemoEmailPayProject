export enum UserEnumRoleEnum {
  VENDER = 'Vender',
  CUSTOMER = 'Customer',
}
export interface IUser {
  _id?: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: UserEnumRoleEnum;
}
