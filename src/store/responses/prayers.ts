import { BaseResponse, ListResponse } from '.';

export declare class PrayersListResponse extends ListResponse<Prayer, string> {
  items?: Prayer[];
}

export declare class PrayerBaseResponse extends BaseResponse<Prayer, string> {
  result?: Prayer;
  error?: string;
}

export declare class PrayerRequestsListResponseAdditionalInfo {
  prayers: Prayer[];
}

export declare class PrayerRequestsListResponse extends ListResponse<
  PrayerRequest,
  PrayerRequestsListResponseAdditionalInfo
> {
  items?: PrayerRequest[];
  additionalInfo?: PrayerRequestsListResponseAdditionalInfo;
}

export declare class PrayerRequestBaseResponse extends BaseResponse<
  PrayerRequest,
  string
> {
  result?: PrayerRequest;
  error?: string;
}

export interface IPrayerRequestPayload {
  prayerRequest: PrayerRequest;
}
