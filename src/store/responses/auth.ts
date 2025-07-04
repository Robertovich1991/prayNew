export class UserResponse {
  id: number;
  email: string;
  password: string;
  info?: any;
  role: 'customer';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  subscription?: RegisteredSubscription;
  isFirstRegistration: boolean;
  isUserNew: boolean;
}

export class SuccessLogin {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
  referalCode: string;
}

export class BaseAuthSuccessResult {
  result?: SuccessLogin;
  error?: string;
}
