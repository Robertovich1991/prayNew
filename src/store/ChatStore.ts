import { IRootStore } from './index';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  Chat,
  ChatBaseResponse,
  ChatMessagesListResponse,
  ChatsListResponse,
  WebsocketNewMessagePayload,
} from './responses/chats';
import { restApiRoutes } from 'constants/rest-api';
import { Alert } from 'react-native';

class ChatStore {
  _rootStore: IRootStore;

  listChats: Chat[] = [];
  totalChatsCount = 0;
  unattendedMessagesCount = 0;

  constructor(rootStore: IRootStore) {
    this._rootStore = rootStore;
    console.log('ChatStore constructor');
    makeAutoObservable(this);
  }

  async getMessagesByChat({ chatId }: { chatId: string }) {
    let path = `/chats/${chatId}/messages`;

    const res = await this._rootStore.restApi.request<ChatMessagesListResponse>(
      {
        path,
        method: 'GET',
        withToken: true,
      },
    );

    runInAction(() => {
      const chat = this.listChats.find(x => x.id === chatId);
      if (res?.items && chat) {
        this.listChats = [
          ...this.listChats.filter(x => x.id !== chatId),
          {
            ...chat,
            messages: res.items.sort(
              (a, b) => +new Date(a.createdAt) - +new Date(b.createdAt),
            ),
          },
        ].sort((a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt));
      }
    });

    return res;
  }

  async getChats({
    pageSize = 10,
    current = 1,
    formParams,
  }: {
    pageSize?: number;
    formParams?: any;
    current?: number;
  }) {
    // console.log(new Date().toJSON(), 'getChats start', this.lastFetchChatsTimestamp);
    let path = `/chats?page=${current}&take=${pageSize}`;
    if (formParams) {
      path += '&form_params=' + encodeURI(JSON.stringify(formParams));
    }
    const res = await this._rootStore.restApi.request<ChatsListResponse>({
      path,
      method: 'GET',
      withToken: true,
    });

    runInAction(() => {
      if (res?.items) {
        this.listChats = res.items
          .map(x => {
            const { text } =
              res.additionalInfo?.lastMessages?.find(l => l.chatId === x.id) ||
              {};
            const { count } =
              res.additionalInfo?.newMessages?.find(n => n.chatId === x.id) ||
              {};

            // console.log(new Date().toJSON(), 'get Chats', JSON.stringify(res));
            return {
              ...x,
              messages: [],
              text: text || '',
              newMessages: parseInt(count || '0'),
            };
          })
          .sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
        this.totalChatsCount = res.count || 0;

        const { language = 'en' } = this._rootStore.commonStore.settings;
        const chatBySelectedLang = this.listChats.find(
          x => x.language === language,
        );
        if (chatBySelectedLang) {
          const newMessages = res.additionalInfo?.newMessages?.find(
            x => x.chatId === chatBySelectedLang.id,
          );
          // const unattendedMessagesCount = res.additionalInfo?.newMessages.map(x => parseInt(x.count || '0')).reduce((sum, value) => sum + value, 0);
          const { count = 0 } = newMessages || {};
          this.setUnattendedMessagesCount(+count);
        } else {
          this.setUnattendedMessagesCount(0);
        }
      }
    });

    return res;
  }

  async getMessages({
    pageSize = 10,
    current = 1,
    formParams,
  }: {
    pageSize?: number;
    formParams?: any;
    current?: number;
  }) {
    const language = this._rootStore.commonStore.settings.language || 'en';
    let path = `/chats/messages?language=${language}&page=${current}&take=${pageSize}`;
    if (formParams) {
      path += '&form_params=' + encodeURI(JSON.stringify(formParams));
    }
    const res = await this._rootStore.restApi.request<ChatMessagesListResponse>(
      {
        path,
        method: 'GET',
        withToken: true,
      },
    );

    runInAction(() => {
      if (res?.items && res.additionalInfo?.chat) {
        // const chat = this.listChats.find(x => x.id === res.additionalInfo?.chat.id);
        this.listChats = [
          ...this.listChats.filter(x => x.id != res.additionalInfo?.chat.id),
          {
            ...res.additionalInfo?.chat,
            messages: res.items.sort(
              (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
            ),
          },
        ];
      }
      console.log('This List chats', this.listChats);
    });
    return res;
  }

  async sendNewMessage(text: string) {
    const ownerName = this._rootStore.userStore.userName;
    const { language } = this._rootStore.commonStore.settings;

    let path = '/chats/new-message';
    const res = await this._rootStore.restApi.request<ChatBaseResponse>({
      path,
      method: 'POST',
      withToken: true,
      body: {
        text,
        ownerName,
        language,
      },
      successStatus: 201,
    });

    if (res?.result?.message) {
      const chat = this.listChats.find(x => x.id === res.result?.chat.id);

      runInAction(() => {
        if (chat) {
          const message = chat.messages.find(
            m => res.result!.message?.id === m.id,
          );
          if (message) {
            return;
          }
          chat.messages.push(res.result!.message!);
          chat.messages?.sort(
            (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
          );
          chat.updatedAt = res.result!.chat!.updatedAt;
          this.listChats = [...this.listChats];
        } else {
          this.listChats = [
            ...this.listChats,
            {
              ...res.result!.chat,
              messages: res.result?.chat?.messages
                ? res.result.chat.messages.sort(
                    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt),
                  )
                : [res.result!.message!],
            },
          ];
        }
        console.log('this.listChats', this.listChats);
      });
    }

    return !!res?.result?.message;
  }

  get currentChat() {
    const chat = this.listChats.find(
      x => x.language === this._rootStore.commonStore.settings.language,
    );
    console.log('currentChat', chat?.messages.length, chat);
    return chat;
  }

  async addMessageFromWebsocket(payload: WebsocketNewMessagePayload) {
    const chat = this.listChats.find(x => x.id === payload.chat.id);
    console.log('addMessageFromWebsocket', this.listChats, chat);
    if (!chat) {
      runInAction(() => {
        this.listChats = [
          ...this.listChats,
          {
            ...payload.chat,
            messages: [payload.message],
          },
        ].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
      });
    }
    if (chat) {
      const existsMessage = chat.messages.find(
        x => x.id === payload.message.id,
      );
      console.log('existsMessage', existsMessage);
      if (existsMessage) {
        return;
      }
      runInAction(() => {
        chat.messages = [payload.message, ...chat.messages];
        chat.updatedAt = new Date().toISOString();
        this.listChats = [
          ...this.listChats.filter(x => x.id !== payload.message.chatId),
          {
            ...chat,
          },
        ].sort((a, b) => +new Date(a.updatedAt) - +new Date(b.updatedAt));
      });
    }

    if (payload?.message?.authorId !== this._rootStore.userStore.user?.id) {
      this.setUnattendedMessagesCount(this.unattendedMessagesCount + 1);
    }
  }

  setUnattendedMessagesCount(count: number) {
    runInAction(() => {
      this.unattendedMessagesCount = count;
    });
  }

  async attendadMessage() {
    if (this.currentChat) {
      try {
        const req = await this._rootStore.restApi.request<ChatBaseResponse>({
          method: 'GET',
          path: restApiRoutes.BASE_CHATS + `${this.currentChat.id}/attended`,
          withToken: true,
          successStatus: 200,
        });

        console.log('attendadMessage result', JSON.stringify(req));
        if (req?.error) {
          Alert.alert('Oops, something went wrong:' + req.error);
          return;
        }
      } catch {
        Alert.alert('Oops, something went wrong');
      }
    }
  }
}

export default ChatStore;
