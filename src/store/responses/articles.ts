import { BaseResponse, ListResponse } from '.';

export class ArticlesListResponseAdditionalInfo {
  savedList: number[];
}

export declare class ArticlesListResponse extends ListResponse<
  Article,
  ArticlesListResponseAdditionalInfo
> {
  items?: Article[];
  additionalInfo?: ArticlesListResponseAdditionalInfo;
}

export declare class ArticleBaseResponse extends BaseResponse<Article, string> {
  result?: Article;
  error?: string;
}
