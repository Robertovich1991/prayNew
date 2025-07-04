import { BaseResponse, ListResponse } from '.';

export declare class PastorsListResponse extends ListResponse<Pastor, string> {
  items?: Pastor[];
}

export declare class PastorBaseResponse extends BaseResponse<Pastor, string> {
  result?: Pastor;
  error?: string;
}
