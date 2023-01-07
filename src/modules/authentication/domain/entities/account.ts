import { BaseEntity } from '@shared/domain/utils/base-entity';
import { AggregateRoot } from '@shared/domain/protocols';
import { Id } from '@shared/domain/value-objects';
import { UserName, Email, Password } from '@authentication/domain/value-objects';

export interface AccountProps {
  id?: Id
  userName: UserName
  email: Email
  password: Password
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface AccountPrimitivesProps {
  id: string
  userName: string
  email: string
  password?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export class AccountEntity extends BaseEntity implements AggregateRoot<AccountPrimitivesProps> {
  private _userName: UserName;
  private _email: Email;
  private _password: Password;
  private _isActive: boolean;

  private constructor(props: AccountProps) {
    super(
      props.id,
      props.createdAt,
      props.updatedAt
    );
    this._userName = props.userName;
    this._email = props.email;
    this._password = props.password;
    this._isActive = props.isActive ?? false;
  }

  static create(props: AccountProps): AccountEntity {
    return new AccountEntity(props);
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  async comparePassword (value: string): Promise<boolean> {
    return this._password.comparePassword(value);
  }

  mapperToPrimitives(): AccountPrimitivesProps {
    return {
      id: this.id.getValue(),
      userName: this.userName.getValue(),
      email: this.email.getValue(),
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
