import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Divider } from '@rneui/base';

export const Separator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Divider width={2} style={styles.divider} />
      </View>
      <View style={styles.middle}>
        <Text>O</Text>
      </View>
      <View style={styles.section}>
        <Divider width={2} style={styles.divider} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginVertical: 30, alignItems: 'center' },
  section: { width: '30%' },
  divider: { width: '100%' },
  middle: { display: 'flex', marginHorizontal: 10 },
});
