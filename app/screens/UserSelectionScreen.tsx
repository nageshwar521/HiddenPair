import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { Icon, colors } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import useUsersStorage from '@hooks/useUsersStorage';
import AddUserForm from '@modules/Users/AddUserForm';
import CustomButton from '@components/CustomButton';
import { RootStackParamList } from '@navigation/MainStackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { setSelectedUser as setSelectedUserInGame } from '@store/slices/gameSlice';
import { selectAppData, setSelectedUser as setSelectedUserInApp } from '@store/slices/appSlice';

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
  const { users, deleteUser, addUser, updateUser } = useUsersStorage(); // Custom hook to manage users storage
  const [modalVisible, setModalVisible] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | undefined>(undefined);
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
    if (userToEdit) {
      updateUser(newUser);
    } else {
      addUser(newUser);
    }
    setModalVisible(false);
    setUserToEdit(undefined);
  };

  const handleCancelAddUser = () => {
    setModalVisible(false);
    setUserToEdit(undefined);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setModalVisible(true);
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <TouchableOpacity onPress={() => handleSelectUser(item)} style={styles.userItem}>
      {selectedUser?.id === item.id && (
        <Icon name="check" type="material" color="#00FF00" />
      )}
      <Text style={styles.userName}>{item.name}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleEditUser(item)} style={styles.editButton}>
          <Icon name="edit" type="material" color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item.id)} style={styles.deleteButton}>
          <Icon name="delete" type="material" color="#fff" />
        </TouchableOpacity>
      </View>
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
          <AddUserForm
            onCancel={handleCancelAddUser}
            onSuccess={handleAddUser}
            userToEdit={userToEdit} // Pass user to edit to the form
          />
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
  actionsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: colors.secondary,
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