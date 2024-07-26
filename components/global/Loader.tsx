import React from 'react';
import { Dialog } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useLoadingStore } from '@/store';

export const LoaderProvider = ({ children }: { children: React.ReactElement }) => {
  const loading = useLoadingStore(state => state.loading);

  return (
    <>
      <Dialog isVisible={loading}>
        <View>
          <Text style={styles.text}>Cargando..</Text>
        </View>
      </Dialog>
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  text: { textAlign: 'center' },
});
