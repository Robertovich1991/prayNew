type LanguageBasedStructure = {
  en: string;
  fr: string;
};

type GratitudeType =
  | 'default'
  | 'donation-gratitude'
  | 'request-gratitude'
  | 'subscription-gratitude';

type Article = {
  id: number;
  history?: any | {};
  title: LanguageBasedStructure;
  titleImageUrl: string;
  text: LanguageBasedStructure;
  youtubeLink: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
};

type Pastor = {
  id: number;
  isActive?: boolean;
  history?: any | {};
  name: LanguageBasedStructure;
  titleImageUrl: string;
  avatarImageUrl: string;
  teaser: LanguageBasedStructure;
  text: LanguageBasedStructure;
  youtubeLink: string;
  videoUrl: string;
  videoTitle: LanguageBasedStructure;
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
};

type Prayer = {
  id: number;
  isActive?: boolean;
  history?: any | {};
  text: LanguageBasedStructure;
  description: LanguageBasedStructure;
  biblioPhrase: LanguageBasedStructure;
  biblioPhraseSource: LanguageBasedStructure;
  titleImageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
  totalRequestsCount?: number;
  activeRequestsCount: number;
};

type Subscription = {
  id: number;
  price: number;
  googleSku: string;
  isActive?: boolean;
  history?: any | {};
  title: LanguageBasedStructure;
  text: LanguageBasedStructure;
  titleImageUrl: string;
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
};

type Donation = {
  id: number;
  amount: number;
  isActive?: boolean;
  googleSku: string;
  history?: any | {};
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
  googleDonation?: any; // This field need to be filled via Google Play data;
};

type Gratitude = {
  id: number;
  isActive?: boolean;
  history?: any | {};
  phrase: LanguageBasedStructure;
  source: LanguageBasedStructure;
  createdAt: Date;
  updatedAt?: Date;
  isPublished?: boolean;
  publishedAt: Date;
  type: GratitudeType;
};

type GoogleIAPPayment = {
  orderId: string;
  packageName: string;
  productId: string;
  purchaseTime: number;
  purchaseState: number;
  purchaseToken: string;
  quantity?: number;
  autoRenewing?: boolean;
  acknowledged?: false;
};

interface RegisteredSubscription extends Subscription {
  activatedAt: Date;
  expiredAt: Date;
  trialExpiredAt: Date;
}

type PrayerRequestMessage = {
  authorId: number;
  timestamp: number;
  authorEntity: any;
  text: string;
  viewedAt: number;
};

interface PrayerRequest {
  id: string;
  prayerId: number;
  owner: number;
  isOwnerBlessed: boolean;
  ownerName: string;
  language: string;
  isActive?: boolean;
  text: string;
  createdAt: Date;
  updatedAt: Date;
  messages: PrayerRequestMessage[];
  newMessages: number;
}
