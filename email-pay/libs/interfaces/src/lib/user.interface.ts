export enum UserEnumRoleEnum{
  VENDER = 'Vender',
  CUSTOMER = 'Customer',

}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserEnumRoleEnum,
}
