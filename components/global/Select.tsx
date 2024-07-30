import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import {Colors} from '@/constants/Colors';
import { CustomFonts } from '@/constants/Styles';

interface SelectItem<T> {
  label: string;
  value: string;
  item?: T;
}

interface SelectProps<T> {
  onSelect: (value: string, item?: T) => void;
  value: string | undefined;
  data: SelectItem<T>[];
  label: string;
  disable?: boolean;
  containerStyle: ViewProps['style'];
  placeholderStyle?: DropdownProps<any>['placeholderStyle'];
  defaultValue?: string;
  errorMessage?: string;
}

export default function Select<T>(props: SelectProps<T>) {
  const { data, label, onSelect, value, disable = false, containerStyle, placeholderStyle, defaultValue, errorMessage } = props;
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (!defaultValue) return;
    onSelect(defaultValue);
  }, [defaultValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        disable={disable}
        style={styles.dropdown}
        placeholderStyle={[styles.placeholderStyle, placeholderStyle]}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{ backgroundColor: Colors.gray }}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Seleccionar' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(element: SelectItem<T>) => {
          onSelect(element.value, element.item);
          setIsFocus(false);
        }}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.whiteBackGround,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  dropdown: {
    height: 50,
    minWidth: '90%',
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: { color: Colors.primary, fontFamily: CustomFonts.MontserratBold, fontSize: 16 },
  placeholderStyle: {
    fontSize: 20,
    color: Colors.grayChat,
  },
  errorMessage: { color: '#ff190c', margin: 5, fontSize: 12 },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: CustomFonts.MontserratMedium,
    color: Colors.primary,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  itemTextStyle: { fontFamily: CustomFonts.MontserratMedium, color: 'black' },
});
