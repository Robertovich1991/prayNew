import { generateUuid } from './utils';

export const googleIAPPaymentGenerator = (): GoogleIAPPayment => {
  const res: GoogleIAPPayment = {
    orderId: generateUuid(),
    packageName: 'ru.nsstms.prayersforafrica.app',
    productId: 'standart-sub',
    purchaseState: 0,
    purchaseTime: Date.now(),
    purchaseToken: generateUuid(),
  };
  return res;
};
