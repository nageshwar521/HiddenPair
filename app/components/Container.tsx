import { View, StyleProp, ViewProps } from 'react-native';
import React from 'react';

export interface IContainerProps {
    children: any;
    style?: StyleProp<any>;
    viewProps?: ViewProps;
}

const Container: React.FC<IContainerProps> = ({children, style = {}, viewProps = {}}) => {
  return (
    <View style={style} {...viewProps}>
      {children}
    </View>
  )
}

export default Container;