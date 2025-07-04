import { restApiRoutes } from 'constants/rest-api';
import { makeAutoObservable, runInAction } from 'mobx';
import { Alert } from 'react-native';
import { IRootStore } from '.';
import {
  ArticleBaseResponse,
  ArticlesListResponse,
} from './responses/articles';

class ArticlesStore {
  private _rootStore: IRootStore;

  articles: Article[] = [];
  saved: number[] = [];
  lastArticlesFetchTimestamp = 0;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    makeAutoObservable(this);

    console.log('ArticleStore store constructor');
  }

  async fetchArticles() {
    if (this.lastArticlesFetchTimestamp > Date.now() - 15 * 3600 * 1000) {
      return this.articles;
    }

    this._rootStore.modalStore.showSpinner('fetchArticles');

    try {
      const result =
        await this._rootStore.restApi.request<ArticlesListResponse>({
          method: 'GET',
          path: restApiRoutes.ARTICLES_LIST,
          withToken: true,
        });

      if (result?.error) {
        this._rootStore.modalStore.clearSpinner('fetchArticles');
        return null;
      } else {
        runInAction(() => {
          if (result?.items) {
            this.articles = result?.items;
            this.lastArticlesFetchTimestamp = Date.now();
            result.additionalInfo?.savedList
              ? (this.saved = result.additionalInfo.savedList)
              : false;
          }
        });
        this._rootStore.modalStore.clearSpinner('fetchArticles');
        return result?.items;
      }
    } catch {
      this._rootStore.modalStore.clearSpinner('fetchArticles');
      return null;
    }
  }

  async toggleArticleSave(article: Article) {
    let saved = false;
    if (this.saved.includes(article.id)) {
      saved = true;
    }

    const toggledArticle =
      await this._rootStore.restApi.request<ArticleBaseResponse>({
        method: 'GET',
        path: `${restApiRoutes.ARTICLES_LIST}/${article.id}/toggle-favorite`,
        withToken: true,
      });

    if (toggledArticle?.result) {
      runInAction(() => {
        if (saved) {
          this.saved = [...this.saved.filter(x => x !== article.id)];
        } else {
          this.saved = [...this.saved, article.id];
        }
      });
    } else {
      Alert.alert('Error while Toggled');
    }
  }

  async viewArticle(articleId: number) {
    const { language } = this._rootStore.commonStore.settings;

    try {
      const result = await this._rootStore.restApi.request<ArticleBaseResponse>(
        {
          method: 'GET',
          path:
            restApiRoutes.ARTICLES_LIST +
            `/${articleId}/view/${language || 'en'}`,
          withToken: true,
        },
      );

      if (result?.error) {
        Alert.alert('Oops, something went wrong: ' + result.error);
      }
    } catch {
      Alert.alert('Oops, something went wrong');
    }
  }
}

export default ArticlesStore;
