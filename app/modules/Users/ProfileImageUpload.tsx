import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Icon } from 'react-native-elements';
import { colors } from 'react-native-elements';

interface ProfileImageUploadProps {
  onImageSelect: (imageUri: string) => void;
  imageUrl?: string;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({ onImageSelect, imageUrl }) => {
  const [imageUri, setImageUri] = useState<string | undefined>(imageUrl);

  const handlePhotoUpload = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo' },
      (response) => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri || ''; // Use empty string as default value
          setImageUri(uri);
          onImageSelect(uri);
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={handlePhotoUpload} style={styles.imageUploadContainer}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        ) : (
          <Icon name="camera" type="feather" size={30} color="white" />
        )}
      </View>
      <Text style={styles.changeImageText} onPress={handlePhotoUpload}>
        Change Image
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageUploadContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  changeImageText: {
    marginTop: 5,
    color: colors.primary,
  },
});

export default ProfileImageUpload; 