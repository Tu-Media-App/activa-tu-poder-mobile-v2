import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import { Colors } from '@/constants/Colors';
import { CustomFonts } from '@/constants/Styles';

import { Icon, Input, InputProps } from '@rneui/themed';

import moment from 'moment';
import 'moment/locale/es';

interface DateInputProps {
  timestamp?: FirebaseFirestoreTypes.Timestamp;
  onChange: (timestamp?: FirebaseFirestoreTypes.Timestamp) => void;
  inputProps?: InputProps;
}

export default function DateInput(props: DateInputProps) {
  const { onChange, timestamp, inputProps } = props;

  const minimumDate = new Date(new Date().setFullYear(new Date().getFullYear() - 120));
  const maximumDate = new Date(new Date().setFullYear(new Date().getFullYear() - 16));

  const [open, setOpen] = useState(false);

  const formatted = timestamp ? moment(timestamp.toDate()).format('LL') : '';

  const date = timestamp?.toDate() ?? new Date();

  return (
    <>
      <TouchableOpacity activeOpacity={1} style={styles.touchable} onPress={() => setOpen(true)}>
        <Input
          value={formatted}
          containerStyle={styles.containerStyle}
          disabled
          pointerEvents="none"
          label={'Fecha de nacimiento'}
          labelStyle={styles.labelStyle}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={{ color: Colors.primary }}
          placeholder="Seleccionar"
          rightIcon={
            date && (
              <TouchableOpacity style={styles.closeButton} onPress={() => onChange(undefined)}>
                <Icon name="circle-with-cross" type="entypo" color={'white'} style={styles.icon} />
              </TouchableOpacity>
            )
          }
          renderErrorMessage={false}
          {...inputProps}
        />
      </TouchableOpacity>
      <DatePicker
        modal
        locale="es-419"
        open={open}
        date={date}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        mode="date"
        onConfirm={(newDate: Date) => {
          const newTimestamp = firestore.Timestamp.fromDate(newDate);
          onChange(newTimestamp);
          setOpen(false);
        }}
        // androidVariant="nativeAndroid"
        onCancel={() => setOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderBottomWidth: 0, // mandatory to override rneui default
    fontFamily: CustomFonts.MontserratRegular,
  },
  touchable: { width: '100%', alignItems: 'center' },
  icon: { width: 25, height: 25 },
  closeButton: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  labelStyle: {
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratBold,
  },
});
