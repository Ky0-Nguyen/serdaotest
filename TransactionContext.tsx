import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  BALANCE_STORAGE_KEY,
  TRANSACTION_STORAGE_KEY,
  TypeTransaction,
} from './constants';

const TransactionContext = createContext(null);

export const useTransactions: any = () => useContext(TransactionContext);

export const TransactionProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [transactions, setTransactions] = useState<TypeTransaction[]>([]);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    loadData();
  }, []);

  // Function to load data from AsyncStorage
  const loadData = async () => {
    try {
      const transactionData = await AsyncStorage.getItem(
        TRANSACTION_STORAGE_KEY,
      );
      const balanceData = await AsyncStorage.getItem(BALANCE_STORAGE_KEY);
      if (transactionData !== null) {
        setTransactions(JSON.parse(transactionData));
      }
      if (balanceData !== null) {
        setBalance(Number(balanceData));
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const addTransaction = async (amount: string, account: any) => {
    const arrTransactions = transactions.concat();
    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      account,
    };
    arrTransactions.push(newTransaction);
    setTransactions(arrTransactions);
    setBalance(prevBalance => prevBalance - parseFloat(amount));
    await Promise.all([
      AsyncStorage.setItem(
        TRANSACTION_STORAGE_KEY,
        JSON.stringify(arrTransactions),
      ),
      AsyncStorage.setItem(
        BALANCE_STORAGE_KEY,
        JSON.stringify(balance - parseFloat(amount)),
      ),
    ]);
  };

  return (
    <TransactionContext.Provider
      value={{transactions, addTransaction, balance}}>
      {children}
    </TransactionContext.Provider>
  );
};
