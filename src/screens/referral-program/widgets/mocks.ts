import { generateUuid } from 'helpers/utils';

export const mockedReferrals: ReferralTransaction[] = [
  {
    id: generateUuid(),
    accruedBonus: 390,
    amountSpentByReferralsInUSD: 3.9,
    grade: 10,
    referralName: 'Zaebumba',
    registrationDate: +new Date('2025-03-24'),
    purchaseDate: +new Date('2025-03-25'),
    totalBonusesAfterAccrual: 390,
  },
  {
    id: generateUuid(),
    accruedBonus: 390,
    amountSpentByReferralsInUSD: 3.9,
    grade: 10,
    referralName: 'Lumumba',
    registrationDate: +new Date('2025-04-24'),
    purchaseDate: +new Date('2025-04-25'),
    totalBonusesAfterAccrual: 780,
  },
  {
    id: generateUuid(),
    accruedBonus: 390,
    amountSpentByReferralsInUSD: 3.9,
    grade: 10,
    referralName: 'Michael',
    registrationDate: +new Date('2025-05-22'),
    purchaseDate: +new Date('2025-05-23'),
    totalBonusesAfterAccrual: 780 + 390,
  },
  {
    id: generateUuid(),
    accruedBonus: 390,
    amountSpentByReferralsInUSD: 3.9,
    grade: 10,
    referralName: 'Johanes',
    registrationDate: +new Date('2025-05-24'),
    purchaseDate: +new Date('2025-05-25'),
    totalBonusesAfterAccrual: 780 + 780,
  },
];
