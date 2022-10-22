import { TouchableOpacity, StyleProp, TouchableOpacityProps } from 'react-native';
import React from 'react';

export interface IButtonProps extends TouchableOpacityProps {
    children: any;
    style?: StyleProp<any>;
}

const Button: React.FC<IButtonProps> = ({children, style = {}, ...otherProps}) => {
  return (
    <TouchableOpacity style={style} {...otherProps}>
      {children}
    </TouchableOpacity>
  )
}

export default Button;