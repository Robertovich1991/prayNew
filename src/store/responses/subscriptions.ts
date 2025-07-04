import { BaseResponse, ListResponse } from '.';

export declare class SubscriptionsListResponse extends ListResponse<
  Subscription,
  string
> {
  items?: Subscription[];
}

export declare class SubscriptionBaseResponse extends BaseResponse<
  Subscription,
  string
> {
  result?: Subscription;
  error?: string;
}

export declare class RegisteredSubscriptionBaseResponse extends BaseResponse<
  RegisteredSubscription,
  string
> {
  result?: RegisteredSubscription;
  error?: string;
}
