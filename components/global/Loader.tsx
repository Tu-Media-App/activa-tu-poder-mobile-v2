import React from 'react';
import { Dialog } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const LoaderProvider = ({ children }: { children: React.ReactElement }) => {
  const loading = useSelector((state: RootState) => state.loader.loading)

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
