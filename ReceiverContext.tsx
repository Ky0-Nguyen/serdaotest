import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RECEIVER_STORAGE_KEY, TypeReceiver} from './constants';

const ReceiverContext = createContext(null);

export const useReceiver: any = () => useContext(ReceiverContext);

export const ReceiverProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const [listReceiver, setListReceiver] = useState<TypeReceiver[] | any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  // Function to load data from AsyncStorage
  const loadData = async () => {
    try {
      const listReceiverData = await AsyncStorage.getItem(RECEIVER_STORAGE_KEY);
      if (listReceiverData !== null) {
        setListReceiver(JSON.parse(listReceiverData));
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const addReceiver = async (receiver: {name: string; iban: string}) => {
    const arrReceiver = listReceiver.concat();
    arrReceiver.push({...receiver, id: Date.now()});
    setListReceiver(arrReceiver);
    await AsyncStorage.setItem(
      RECEIVER_STORAGE_KEY,
      JSON.stringify(arrReceiver),
    );
  };

  return (
    <ReceiverContext.Provider value={{listReceiver, addReceiver}}>
      {children}
    </ReceiverContext.Provider>
  );
};
