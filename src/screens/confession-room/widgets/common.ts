import { useLanguageBasedStructure as language } from '../../../hooks';

export const sinTypeDescription: Record<SinType, string> = {
  'against-god': 'Against God',
  'against-fellow': 'Against fellow',
  'against-yourself': 'Against yourself',
  'against-truth': 'Against Truth',
};

export const sinSeverityDescription: Record<SinSeverity, string> = {
  light: 'Light sin',
  medium: 'Medium sin',
  grave: 'Grave sin',
};

export const filterSin = (params: {
  sin: SinElement;
  sinType: SinType;
  sinSeverity: SinSeverity;
  searchQuery?: string;
}) => {
  const { sin, sinType, sinSeverity, searchQuery } = params;

  let condition = sin.type === sinType && sin.severity === sinSeverity;

  if (searchQuery) {
    const searchQueryCondition = language(sin.headerTitle)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    condition = condition && searchQueryCondition;
  }

  return condition;
};
