import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';

import { Colors } from '@/constants/Colors';
import { CustomFonts } from '@/constants/Styles';
import { config } from '@/config/config';
import { useTermsAndConditionsStore } from '@/store';

export const TermsAndConditions = () => {
  const [isAccepted, toggle] = useTermsAndConditionsStore(state => [state.isAccepted, state.toggle]);

  const openTerms = () => {
    Linking.openURL(config.termsUrl);
  };

  return (
    <>
      <TouchableOpacity style={[styles.terms, { marginTop: 40 }]} onPress={openTerms}>
        <Text style={styles.termsText}>
          Para crear una cuenta debes aceptar los <Text style={styles.termsLink}>términos y condiciones</Text>
        </Text>
      </TouchableOpacity>
      <CheckBox
        containerStyle={styles.checkBox}
        textStyle={{ color: Colors.primary }}
        checked={isAccepted}
        onPress={toggle}
        title="He leído y acepto los términos y condiciones"
      />
    </>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    marginVertical: 30,
  },
  termsText: {
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratRegular,
  },
  terms: { paddingHorizontal: 10, flexDirection: 'row' },
  termsLink: {
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratRegular,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
