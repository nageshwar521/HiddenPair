import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button, ButtonProps } from 'react-native-elements';
import Sound from 'react-native-sound';
import buttonClickWav from '@assets/sounds/button_click.wav';
import { selectSettings } from '@store/slices/settingsSlice';
import { useSelector } from 'react-redux';

type CustomButtonProps = ButtonProps & {
  enableSound?: boolean; // Flag to enable or disable sound
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  enableSound = true,
  ...buttonProps
}) => {
  const { soundEnabled } = useSelector(selectSettings);
  
  const handlePress = (e: GestureResponderEvent) => {
    if (enableSound && soundEnabled) {
      const sound = new Sound(buttonClickWav, (error) => {
        if (error) {
          console.log('Error loading sound:', error);
          return;
        }
        console.log('Sound loaded successfully');
        sound.play((success) => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Failed to play sound');
          }
        });
      });
    }
    onPress && onPress(e);
  };

  return <Button title={title} onPress={handlePress} {...buttonProps} />;
};

export default CustomButton;