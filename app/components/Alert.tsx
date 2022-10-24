import React, {useState} from 'react';
import {
  Alert as AlertComp,
  Modal,
  Text,
  Pressable,
  View,
  StyleProp,
} from 'react-native';
import createStyles from '../utils/createStyles';

export interface IAlertProps {
  isOpen?: boolean;
  title?: string;
  content?: string;
  children?: any;
  buttonText?: string;
  buttonStyle?: StyleProp<any>;
  titleTextStyle?: StyleProp<any>;
  buttonTextStyle?: StyleProp<any>;
  contentTextStyle?: StyleProp<any>;
  onClose: () => void;
}

const Alert: React.FC<IAlertProps> = ({
  isOpen = false,
  title = 'Congratulations!',
  content,
  children,
  buttonText = 'Close',
  buttonStyle = {},
  titleTextStyle = {},
  buttonTextStyle = {},
  contentTextStyle = {},
  onClose,
}) => {
  const styles = getStyles();

  const handleModalClose = () => {
    if (onClose) {
      onClose();
    }
  };

  console.log(typeof children, 'typeof children');

  return (
    <Modal
      animationType="slide"
      visible={isOpen}
      transparent
      onRequestClose={handleModalClose}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text style={[styles.modalTitle, titleTextStyle]}>{title}</Text>
          <View style={styles.contentContainerStyle}>
            {content ? (
              <Text style={[styles.modalContent, contentTextStyle]}>
                {content}
              </Text>
            ) : (
              children
            )}
          </View>
          <Pressable
            style={[styles.button, styles.buttonClose, buttonStyle]}
            onPress={handleModalClose}>
            <Text style={[styles.textStyle, buttonTextStyle]}>
              {buttonText}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const getStyles = () => {
  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    wrapper: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    contentContainerStyle: {},
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 15,
      textAlign: 'center',
    },
    modalContent: {
      fontSize: 14,
      marginBottom: 15,
      textAlign: 'center',
    },
  };
  return createStyles(styles);
};

export default Alert;
