export interface CorruptionCase {
  id: string;
  rank: number;
  caseName: string;
  amount: number;
  year: number;
  references: string[];
}

export interface CorruptionStats {
  totalCases: number;
  totalAmount: number;
}

export const formatCurrency = (amount: number): string => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return formatter.format(amount);
};

export const formatSimplifiedAmount = (amount: number): string => {
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  });
  
  if (amount >= 1e15) {
    return `${formatter.format(amount / 1e15)} Kuadrilun`;
  }
  if (amount >= 1e12) {
    return `${formatter.format(amount / 1e12)}T`;
  }
  if (amount >= 1e9) {
    return `${formatter.format(amount / 1e9)}M`;
  }
  if (amount >= 1e6) {
    return `${formatter.format(amount / 1e6)}JT`;
  }
  return formatter.format(amount);
};