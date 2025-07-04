import { BaseResponse, ListResponse } from '.';

export declare class DonationsListResponse extends ListResponse<
  Donation,
  string
> {
  items?: Donation[];
}

export declare class DonationBaseResponse extends BaseResponse<
  Donation,
  string
> {
  result?: Donation;
  error?: string;
}

export declare class GratitudesListResponse extends ListResponse<
  Gratitude,
  string
> {
  items?: Gratitude[];
}

export declare class GratitudeBaseResponse extends BaseResponse<
  Gratitude,
  string
> {
  result?: Gratitude;
  error?: string;
}
