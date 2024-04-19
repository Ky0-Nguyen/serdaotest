export const TRANSACTION_STORAGE_KEY = 'TRANSACTION_STORAGE_KEY';
export const BALANCE_STORAGE_KEY = 'BALANCE_STORAGE_KEY';
export const RECEIVER_STORAGE_KEY = 'RECEIVER_STORAGE_KEY';

export type TypeTransaction = {
  id: number;
  amount: number;
  account: string;
};

export type TypeReceiver = {
  id: number;
  firstName?: string;
  lastName?: string;
  iban: string;
  name: string;
};
