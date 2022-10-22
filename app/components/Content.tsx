import { Text, StyleProp, TextProps } from 'react-native';
import React from 'react';

export interface IContentProps {
    children: any;
    style?: StyleProp<any>;
    textProps?: TextProps;
}

const Content: React.FC<IContentProps> = ({children, style = {}, textProps = {}}) => {
  return (
    <Text style={style} {...textProps}>
      {children}
    </Text>
  )
}

export default Content;