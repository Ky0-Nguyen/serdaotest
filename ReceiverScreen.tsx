import React, {useCallback, useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import IBAN from 'iban';
import {useReceiver} from './ReceiverContext';

const ReceiverScreen = ({navigation}: any): React.JSX.Element => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iban, setIban] = useState('');
  const {addReceiver} = useReceiver();

  const validateIBAN = useCallback(() => {
    return IBAN.isValid(iban);
  }, [iban]);

  const handleAddReceiver = useCallback(() => {
    if (validateIBAN()) {
      const accountDetails = {name: firstName + ' ' + lastName, iban};
      addReceiver(accountDetails);
      navigation.goBack();
      Alert.alert('Add successfully!');
    } else {
      Alert.alert('Invalid IBAN');
    }
  }, [addReceiver, firstName, iban, lastName, navigation, validateIBAN]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setIban}
        value={iban}
        placeholder="Recipient IBAN"
      />
      <Button title="Add Receiver" onPress={handleAddReceiver} />
    </View>
  );
};

export default ReceiverScreen;

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
