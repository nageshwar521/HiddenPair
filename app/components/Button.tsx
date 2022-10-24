import {TouchableOpacity, StyleProp, TouchableOpacityProps} from 'react-native';
import React from 'react';
import Content from './Content';

export interface IButtonProps extends TouchableOpacityProps {
  children: any;
  style?: StyleProp<any>;
  contentStyle?: StyleProp<any>;
}

const Button: React.FC<IButtonProps> = ({
  children,
  style = {},
  contentStyle = {},
  ...otherProps
}) => {
  return (
    <TouchableOpacity style={style} {...otherProps}>
      {['string', 'number'].includes(typeof children) ? (
        <Content style={contentStyle}>{children}</Content>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default Button;
