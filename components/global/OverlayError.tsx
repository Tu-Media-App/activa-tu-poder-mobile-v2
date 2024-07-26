import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Image } from '@rneui/themed';
import { Colors } from '@/constants/Colors';
import { Assets } from '@/constants/Styles';
import { useErrorStore } from '@/store';

export const OverlayError = () => {
  const [errorMessage, clearError] = useErrorStore(state => [state.error, state.clearError]);

  return (
    <>
      <Overlay isVisible={!!errorMessage} onBackdropPress={clearError}>
        <View style={styles.content}>
          <Image source={Assets.error} style={styles.image} containerStyle={styles.image} />
          <Text style={styles.textStyle}>{errorMessage}</Text>
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    borderWidth: 0,
  },
  image: {
    width: 140,
    height: 140,
  },
  textStyle: {
    textAlign: 'center',
    marginVertical: 10,
    color: Colors.grayText2,
  },
});
