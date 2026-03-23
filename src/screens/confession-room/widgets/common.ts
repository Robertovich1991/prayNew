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

  // Check if sin is not empty - validate essential fields
  const isValidSin = 
    sin.machineName && 
    sin.machineName.trim() !== '' &&
    sin.headerTitle && 
    (sin.headerTitle.en?.trim() !== '' || sin.headerTitle.fr?.trim() !== '') &&
    sin.description && 
    (sin.description.en?.trim() !== '' || sin.description.fr?.trim() !== '') &&
    sin.confessionTasks && 
    Array.isArray(sin.confessionTasks) && 
    sin.confessionTasks.length > 0;

  if (!isValidSin) {
    return false;
  }

  let condition = sin.type === sinType && sin.severity === sinSeverity;

  if (searchQuery) {
    const searchQueryCondition = language(sin.headerTitle)
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    condition = condition && searchQueryCondition;
  }

  return condition;
};
