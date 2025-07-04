import { IRootStore } from '.';
import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { restApiRoutes } from 'constants/rest-api';
// import { extractDate } from "helpers/utils";

interface IRestApiRequestProps {
  method: Method;
  path: string;
  body?: any;
  successStatus?: number;
  errorStatus?: number;
  responseType?: 'text' | 'json' | 'blob';
  withToken?: boolean;
  withBlock?: boolean; // Check that not performed similar path and method request;
}

const { API_BACKED_URL } = restApiRoutes;

class RestApi {
  private _rootStore: IRootStore;

  blockedRequests: {
    path: string;
    method: string;
    handlers: Array<(result: any) => void>;
  }[] = [];

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;

    //Запустим interceptor для конвертирования ISO DateTime строки в объект Date
    // axios.interceptors.response.use(response => {
    // 	if (response.status >= 200 && response.status < 400 && response?.data) {
    // 		response.data = extractDate(response.data);
    // 	}
    // 	return response;
    // }, error => {
    // 	return Promise.reject(error);
    // });
  }

  async request<T>(props: IRestApiRequestProps): Promise<T | null> {
    const {
      method,
      path,
      body,
      successStatus,
      responseType = 'json',
      withToken,
      errorStatus,
      withBlock = false,
    } = props;
    const url = API_BACKED_URL + path;
    const opts: AxiosRequestConfig = {
      url,
      method,
      // mode: "cors",
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      responseType,
    };

    if (body) {
      opts.data = JSON.stringify(body);
    }

    if (withBlock) {
      const existsBlockedRequest = this.blockedRequests.find(
        r => r.path === path && r.method === method,
      );

      // console.log(
      //   new Date().toJSON(),
      //   'withBlock existsBlockedRequest',
      //   existsBlockedRequest,
      // );

      if (existsBlockedRequest) {
        return new Promise(resolve => {
          const handler = (result: any) => {
            resolve(result);
          };
          existsBlockedRequest.handlers.push(handler);
          console.log('existsBlockedRequest promise', this.blockedRequests);
        });
      } else {
        this.blockedRequests.push({
          method,
          path,
          handlers: [],
        });
      }
    }

    if (withToken) {
      const { accessToken, accessTokenCreatedAt } = this._rootStore.userStore;

      // Здесь можно реализовать функционал обновления токена
      if (!accessToken || accessTokenCreatedAt < Date.now() - 60 * 60 * 1000) {
        const token = await this._rootStore.userStore.getAccessToken();
        if (!token) {
          return null;
        }
      }
      opts.headers = {
        ...opts.headers,
        Authorization: `Bearer ${accessToken}`,
      }; // Или любой другой вид авторизации
    }

    const processWithBlockResponse = (result: any) => {
      if (withBlock) {
        const existsBlockedRequest = this.blockedRequests.find(
          r => r.path === path && r.method === method,
        );

        if (existsBlockedRequest) {
          existsBlockedRequest.handlers.forEach(handler => {
            handler(result);
          });
          this.blockedRequests = [
            ...this.blockedRequests.filter(
              r => !(r.path === path && r.method === method),
            ),
          ];
        }
      }
    };

    return await axios(opts)
      .then((res: AxiosResponse) => {
        console.log('Fetch performed', opts, res.status);
        let result: any = null;
        if (res.status === (successStatus || 200)) {
          // Не всегда успехом будет res.status === 200
          // console.log('FETCH DATA', res.data);

          result = res.data as T;
        }

        processWithBlockResponse(result);

        return result;
      })
      .catch((err: any) => {
        console.log('Error in Perform Request', { opts, err });
        let result: any = null;
        // Когда необходимо обработать текст из ошибки
        if (errorStatus && err?.response?.status === errorStatus) {
          console.log('Fetch perform expecting error', err.response.data);
          try {
            result = JSON.parse(err.response.data?.message);
          } catch {}
        }

        processWithBlockResponse(result);

        return result;
      });
  }
}

export default RestApi;
