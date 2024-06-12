// src/screens/UserSelectionScreen.tsx
import useUsersStorage from '@hooks/useUsersStorage';
import AddUserForm from '@modules/Users/AddUserForm';
import { RootStackParamList } from '@navigation/MainStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { setSelectedUser as setSelectedUserInGame } from '@store/slices/gameSlice';
import { selectAppData, setSelectedUser as setSelectedUserInApp } from '@store/slices/appSlice';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Button, Alert } from 'react-native';
import { Icon, colors } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '@components/CustomButton';

interface User {
  id: string;
  name: string;
  username: string;
  photo?: string;
}

type UserSelectionScreenProp = StackNavigationProp<RootStackParamList, 'UserSelection'>;

type Props = {
  navigation: UserSelectionScreenProp;
};

const UserSelectionScreen: React.FC<Props> = ({ navigation }) => {
  const { users, deleteUser, addUser } = useUsersStorage(); // Custom hook to manage users storage
  const [modalVisible, setModalVisible] = useState(false);
  const { selectedUser } = useSelector(selectAppData);

  const dispatch = useDispatch();

  const handleSubmitUser = () => {
    if (selectedUser) {
      dispatch(setSelectedUserInGame(selectedUser));
      dispatch(setSelectedUserInApp(selectedUser));
      navigation.goBack();
    } else {
      Alert.alert('Please select a user');
    }
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteUser(userId);
            dispatch(setSelectedUserInApp(null));
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSelectUser = (user: User) => {
    dispatch(setSelectedUserInApp(user));
  };

  const handleAddUser = (newUser: User) => {
    addUser(newUser);
    setModalVisible(false);
  };

  const handleCancelAddUser = () => {
    setModalVisible(false);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userItem}>
      {selectedUser?.id === item.id && (
        <Icon name="check" type="material" color="#00FF00" />
      )}
      <Text style={styles.userName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={[styles.deleteButton, { backgroundColor: colors.secondary }]}>
        <Icon name="delete" type="material" color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Select User</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={item => item.id}
        extraData={selectedUser}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text>Add User</Text>
      </TouchableOpacity>
      <CustomButton title="Submit" onPress={handleSubmitUser} />
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <AddUserForm onCancel={handleCancelAddUser} onSuccess={handleAddUser} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    flex: 1,
    textAlign: 'left',
    marginLeft: 10
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserSelectionScreen;