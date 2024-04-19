import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransactionContext = createContext();

// export const useAsyncStorage = () => {
//   return useContext(AsyncStorageContext);
// };

export const useTransactions = () => useContext(TransactionContext);

// export const beneficiaries_key = 'beneficiaries';
export const TRANSACTION_STORAGE_KEY = 'TRANSACTION_STORAGE_KEY';
export const BALANCE_STORAGE_KEY = 'BALANCE_STORAGE_KEY';

export const TransactionProvider = ({children}): React.JSX.Element => {
  const [transactions, setTransactions] = useState<any[]>([]);
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

  // // Function to save data to AsyncStorage
  // const saveData = async newData => {
  //   try {
  //     await AsyncStorage.setItem('your_storage_key', JSON.stringify(newData));
  //     setData(newData);
  //   } catch (error) {
  //     console.error('Error saving data to AsyncStorage:', error);
  //   }
  // };

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
