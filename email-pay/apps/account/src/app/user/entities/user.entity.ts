import { IUser, UserEnumRoleEnum } from '@email-pay/interfaces';
import { compare, genSalt, hash } from 'bcrypt';

export class UserEntity implements IUser {
  _id?: string;
  userName: string;
  email: string;
  passwordHash: string;
  role: UserEnumRoleEnum;

  constructor(user: IUser) {
    this._id = user._id;
    this.userName = user.userName;
    this.email = user.email;
    this.role = user.role;
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async validatePassword(password:string) {
    return await compare(password, this.passwordHash)
  }
}
