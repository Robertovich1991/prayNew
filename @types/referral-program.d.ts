type FilterState =
  | 'this-month'
  | 'last-month'
  | 'in-three-months'
  | 'over-the-year'
  | 'all';

type ReferralTransaction = {
  id: string;
  referralName: string;
  grade: number;
  amountSpentByReferralsInUSD: number;
  accruedBonus: number;
  totalBonusesAfterAccrual: number;
  registrationDate: number;
  purchaseDate?: number;
};
