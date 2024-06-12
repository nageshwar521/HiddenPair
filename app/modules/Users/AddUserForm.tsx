import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
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
  onSuccess: (user: User) => void;
  userToEdit?: User; // User to edit, if any
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onCancel, onSuccess, userToEdit }) => {
  const { addUser, updateUser } = useUsersStorage(); // Custom hook to manage users storage
  const [name, setName] = useState(userToEdit?.name || '');
  const [username, setUsername] = useState(userToEdit?.username || '');
  const [profileImage, setProfileImage] = useState<string | undefined>(userToEdit?.photo);
  const [nameError, setNameError] = useState<string | undefined>('');
  const [usernameError, setUsernameError] = useState<string | undefined>('');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setUsername(userToEdit.username);
      setProfileImage(userToEdit.photo);
    }
  }, [userToEdit]);

  const generateUsername = (name: string) => {
    const usernamePrefix = name.toLowerCase().replace(/\s+/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${usernamePrefix}${randomNum}`;
  };

  const handleSaveUser = () => {
    if (!name || !username) {
      if (!name) setNameError('Name is required');
      if (!username) setUsernameError('Username is required');
      return;
    }

    const user: User = {
      id: userToEdit ? userToEdit.id : Date.now().toString(),
      name,
      username,
      photo: profileImage,
    };

    if (userToEdit) {
      updateUser(user);
    } else {
      addUser(user);
    }
    onSuccess(user); // Call onSuccess when a user is successfully added or updated
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userToEdit ? 'Edit User' : 'Add New User'}</Text>
      <View style={styles.imageUploadContainer}>
        <ProfileImageUpload onImageSelect={setProfileImage} imageUrl={profileImage} />
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter Name"
          value={name}
          onChangeText={text => {
            setName(text);
            if (!userToEdit) {
              setUsername(generateUsername(text)); // Auto-generate username based on name
            }
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
        <CustomButton title={userToEdit ? 'Save User' : 'Add User'} onPress={handleSaveUser} buttonStyle={[styles.button, { marginVertical: 10 }]} />
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