import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ProfileImageUpload from './ProfileImageUpload'; // Assuming you have a ProfileImageUpload component
import useUsersStorage from '../../hooks/useUsersStorage'; // Assuming you have a custom hook for managing users storage
import CustomButton from '@components/CustomButton';

interface User {
  id: string;
  name: string;
  username: string;
  photo?: string;
}

interface AddUserFormProps {
  onCancel: () => void;
  onSuccess: (newUser: User) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onCancel, onSuccess }) => {
  const { addUser } = useUsersStorage(); // Custom hook to manage users storage
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState<string | undefined>(undefined);
  const [nameError, setNameError] = useState<string | undefined>('');
  const [usernameError, setUsernameError] = useState<string | undefined>('');

  const generateUsername = (name: string) => {
    const usernamePrefix = name.toLowerCase().replace(/\s+/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${usernamePrefix}${randomNum}`;
  };

  const handleAddUser = () => {
    if (!name || !username) {
      if (!name) setNameError('Name is required');
      if (!username) setUsernameError('Username is required');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      username,
      photo: profileImage,
    };
    addUser(newUser);
    onSuccess(newUser); // Call onSuccess when a new user is successfully added
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      <View style={styles.imageUploadContainer}>
        <ProfileImageUpload onImageSelect={setProfileImage} imageUrl={profileImage} />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter Name"
          value={name}
          onChangeText={text => {
            setName(text);
            setUsername(generateUsername(text)); // Auto-generate username based on name
            setNameError('');
          }}
          errorMessage={nameError}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameError('');
          }}
          errorMessage={usernameError}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton title="Cancel" onPress={onCancel} buttonStyle={[styles.button, { marginVertical: 10 }]} />
        <CustomButton title="Add User" onPress={handleAddUser} buttonStyle={[styles.button, { marginVertical: 10 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
  },
});

export default AddUserForm;