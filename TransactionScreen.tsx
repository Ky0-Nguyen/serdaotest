import React, {useCallback, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useTransactions} from './TransactionContext';
import IBAN from 'iban';

const TransactionScreen = ({navigation}: any): React.JSX.Element => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const {addTransaction} = useTransactions();

  const validateIBAN = useCallback(() => {
    return IBAN.isValid(iban);
  }, [iban]);
  const handleTransaction = useCallback(() => {
    if (validateIBAN()) {
      const accountDetails = {name, iban};
      addTransaction(amount, accountDetails);
      navigation.goBack();
    } else {
      Alert.alert('Invalid IBAN');
    }
  }, [addTransaction, amount, iban, name, navigation, validateIBAN]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Recipient Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginVertical: 8,
  },
});
