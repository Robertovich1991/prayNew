import { UserResponse } from './auth';

export type Chat = {
  id: string;
  owner: number;
  ownerName: string;
  language: string;
  createdAt: string;
  updatedAt: string;
  newMessages: number;
  messages: ChatMessage[];
  text: string;
};

export type ChatMessage = {
  id: string;
  chatId: string;
  authorId: number;
  language: string;
  text: string;
  createdAt: string;
  viewedAt?: string;
  timestamp: number;
};

export interface MessagesCount {
  chatId: string;
  count: string;
}

export interface WebsocketNewMessagePayload {
  sender: UserResponse;
  message: ChatMessage;
  chat: Chat;
}

export interface ChatsListResponseAdditionalInfo {
  lastMessages: ChatMessage[];
  newMessages: MessagesCount[];
}

export interface ChatMessagesListAdditionalInfo {
  chat: Chat;
  users: UserResponse[];
}

export interface ChatBase {
  chat: Chat;
  message?: ChatMessage;
}

export interface ChatBaseResponse {
  result?: ChatBase;
  error?: string;
}

export interface ChatsListResponse {
  items?: Chat[];
  additionalInfo?: ChatsListResponseAdditionalInfo;
  error?: string;
  count?: number;
}

export interface ChatMessagesListResponse {
  items?: ChatMessage[];
  additionalInfo?: ChatMessagesListAdditionalInfo;
  error?: string;
  count?: number;
}
