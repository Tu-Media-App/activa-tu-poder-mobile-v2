import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Overlay, Image } from '@rneui/themed';
import {Colors} from '@/constants/Colors';
import { Assets } from '@/constants/Styles';

export default function OverlayError({ isVisible, setVisible, errorMsg }) {
  return (
    <Overlay isVisible={isVisible} onBackdropPress={() => setVisible(false)} borderRadius={25} height={350}>
      <View style={styles.content}>
        <Image source={Assets.error} style={styles.image} containerStyle={styles.image} />
        <Text style={styles.textStyle}>{errorMsg}</Text>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingVertical: 0,
  },
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
