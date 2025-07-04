export enum SupportedLanguages {
  ENGLISH = 'en',
  FRANCAISE = 'fr',
}

export declare class BaseResponse<T, E> {
  result?: T;
  error?: E;
}

export declare class ListResponse<T, A> {
  items?: T[];
  count?: number;
  take?: number;
  page?: number;
  additionalInfo?: A;
  error?: string;
  language?: SupportedLanguages;
}
