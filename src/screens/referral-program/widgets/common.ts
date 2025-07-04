export const extractFilterStateTitle = (state: FilterState) => {
  // ToDo: переделать на возврат translation ключей T_KEYS
  switch (state) {
    case 'this-month':
      return 'This month';
    case 'last-month':
      return 'Last month';
    case 'in-three-months':
      return 'In 3 months';
    case 'over-the-year':
      return 'Over the year';
    case 'all':
      return 'All referrals';
  }
};
