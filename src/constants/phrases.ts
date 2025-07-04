export const THANKS_MODAL_DEFAULT_PHRASES: Record<
  GratitudeType,
  { phrase: { en: string; fr: string }; source: { en: string; fr: string } }
> = {
  default: {
    phrase: {
      en: 'Hatred stirs up conflict, but love covers over all wrongs.',
      fr: `La haine attise les conflits, mais l'amour couvre tous les torts.`,
    },
    source: {
      en: 'Proverbs 10:12',
      fr: 'Paraboles 10:12',
    },
  },
  'donation-gratitude': {
    phrase: {
      en: 'A generous person will prosper; whoever refreshes others will be refreshed.',
      fr: 'Une personne généreuse prospérera, celui qui donne aux autres, sera être remboursé.',
    },
    source: {
      en: 'Proverbs 11:25',
      fr: 'Paraboles 11:25',
    },
  },
  'subscription-gratitude': {
    phrase: {
      en: 'A generous person will prosper; whoever refreshes others will be refreshed.',
      fr: 'Une personne généreuse prospérera, celui qui donne aux autres, sera être remboursé.',
    },
    source: {
      en: 'Proverbs 11:25',
      fr: 'Paraboles 11:25',
    },
  },
  'request-gratitude': {
    phrase: {
      en: 'And the prayer of faith will heal him who is sick, and the Lord will raise him up. If he has committed sins, he will be forgiven.',
      fr: `Et la prière de la foi sauvera le malade, et le Seigneur le relèvera; et s'il a commis des péchés, il lui sera pardonné.`,
    },
    source: {
      en: 'Jacob 5:15',
      fr: 'Jacques 5:15',
    },
  },
};
