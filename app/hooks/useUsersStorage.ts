import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  name: string;
  username: string;
  photo?: string;
}

interface UsersStorage {
  users: User[];
  addUser: (newUser: User) => void;
  updateUser: (updatedUser: User) => void;
  deleteUser: (userId: string) => void;
}

const useUsersStorage = (): UsersStorage => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await AsyncStorage.getItem('users');
        if (usersData) {
          setUsers(JSON.parse(usersData));
        }
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    loadUsers();
  }, []);

  const addUser = async (newUser: User) => {
    try {
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const updateUser = async (updatedUser: User) => {
    try {
      const updatedUsers = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const updatedUsers = users.filter((user) => user.id !== userId);
      setUsers(updatedUsers);
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return { users, addUser, updateUser, deleteUser };
};

export default useUsersStorage;