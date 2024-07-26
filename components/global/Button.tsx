import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { CustomFonts } from '@/constants/Styles';
import { Icon } from '@rneui/base';

export interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  variant?: 'outlined' | 'contained';
  color?: string;
  shadowed?: boolean;
  icon?: {
    name: string;
    type: string;
    size?: number;
  };
}

export default function Button(props: ButtonProps) {
  const { variant = 'contained', color = Colors.primary, shadowed, children, icon, disabled, ...rest } = props;

  const { name = 'apple1', type = 'antdesign', size = 16 } = icon || {};

  const contained: StyleProp<ViewStyle> = {
    backgroundColor: color,
  };

  const outlined: StyleProp<ViewStyle> = {
    borderColor: color,
    borderWidth: 1,
    backgroundColor: 'white',
  };

  const textColor = variant === 'contained' ? 'white' : Colors.primary;

  const composed: StyleProp<ViewStyle> = [
    styles.container,
    variant === 'contained' ? contained : outlined,
    shadowed && {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,

      elevation: 6,
    },
  ];

  return (
    <TouchableOpacity disabled={disabled} style={[composed, disabled && styles.disabled]} {...rest}>
      {icon && <Icon name={name} type={type} size={size} color={textColor} style={styles.icon} />}
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
      {icon && <Icon name={name} type={type} size={size} color={'transparent'} style={styles.icon} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginHorizontal: 20,
    marginTop: 10,
    height: 50,
    width: '90%',
    borderRadius: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { marginHorizontal: 10 },
  buttonText: {
    textAlign: 'center',
    fontFamily: CustomFonts.MontserratBold,
  },
  disabled: {
    backgroundColor: Colors.grayText1,
  },
});
