import React, {useCallback, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useTransactions} from './TransactionContext';
import IBAN from 'iban';
import {useReceiver} from './ReceiverContext';
import {TypeReceiver} from './constants';

const TransactionScreen = ({navigation}: any): React.JSX.Element => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const [isVisible, setShowModal] = useState(false);
  const {addTransaction} = useTransactions();
  const {listReceiver} = useReceiver();
  console.log('listReceiver', listReceiver);

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

  const onPressItem = (item: TypeReceiver) => {
    setIban(item?.iban);
    setName(item?.name);
    setShowModal(false);
  };

  const renderItem = ({item}: {item: TypeReceiver}) => {
    return (
      <TouchableOpacity onPress={() => onPressItem(item)} style={styles.item}>
        <Text>Name: {item?.name}</Text>
        <Text>IBAN: {item?.iban}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => setShowModal(true)}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          editable={false}
          placeholder="Recipient Name"
          onFocus={() => setShowModal(true)}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Submit Transaction" onPress={handleTransaction} />
      <Modal visible={isVisible}>
        <View style={styles.containerModal}>
          <Button
            title="Add"
            onPress={() => {
              setShowModal(false);
              navigation.navigate('Receiver');
            }}
          />
          <View style={styles.line} />
          <Button
            title="Close modal"
            onPress={() => {
              setShowModal(false);
            }}
          />
          <View style={styles.line} />
          <FlatList data={listReceiver} renderItem={renderItem} />
        </View>
      </Modal>
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
  containerModal: {
    flex: 1,
    padding: 16,
  },
  item: {
    marginTop: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    height: 16,
    width: '100%',
  },
});
