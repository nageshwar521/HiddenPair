import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

interface ToolbarProps {
  stepCount: number;
  selectedUserName: string;
  onBackPress: () => void; // Function to handle back button press
}

const Toolbar: React.FC<ToolbarProps> = ({ stepCount, selectedUserName, onBackPress }) => {
  // Shorten the user name if it exceeds 10 characters
  const displayedUserName = selectedUserName.length > 10 
    ? `${selectedUserName.slice(0, 10)}...` 
    : selectedUserName;

  return (
    <View style={styles.toolbar}>
      <Icon name="arrow-back" onPress={onBackPress} />
      <View style={styles.infoContainer}>
        <Text style={styles.label}>User:</Text>
        <Text style={styles.info} numberOfLines={1} ellipsizeMode="tail">{displayedUserName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Step Count:</Text>
        <Text style={styles.info}>{stepCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    elevation: 4, // Add elevation for a shadow effect (Android)
    shadowColor: '#000000', // Shadow color for iOS
    shadowOpacity: 0.2, // Opacity of the shadow for iOS
    shadowOffset: { width: 0, height: 2 }, // Offset of the shadow for iOS
    position: 'absolute', // Position at the top
    top: 0, // Top of the screen
    left: 0,
    right: 0,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  info: {
    fontSize: 16,
    color: '#333333',
  },
});

export default Toolbar;