import React from 'react';
import { StyleSheet } from 'react-native';

import { Input, InputProps } from '@rneui/themed';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

import { Colors } from '@/constants/Colors';
import { CustomFonts } from '@/constants/Styles';

interface TextInputProps<T extends FieldValues> extends InputProps {
  control: ControllerProps<T>['control'];
  name: ControllerProps<T>['name'];
  rules?: ControllerProps<T>['rules'];
}

export default function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
  const { name, control, rules, ...inputProps } = props;
  const { inputStyle, ...inputPropsRest } = inputProps;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          containerStyle={styles.containerStyle}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={[{ color: Colors.primary }, inputStyle]}
          renderErrorMessage={!!error}
          errorMessage={error?.message}
          {...inputPropsRest}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 14,
    paddingVertical: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },
  inputContainerStyle: {
    borderBottomWidth: 0, // mandatory to override rneui default
    fontFamily: CustomFonts.MontserratRegular,
  },
  labelStyle: {
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratBold,
  },
});
