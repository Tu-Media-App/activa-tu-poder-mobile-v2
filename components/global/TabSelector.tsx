import React from 'react';
import { StyleSheet } from 'react-native';

import { Tab, TabProps } from '@rneui/themed';
import { Colors } from '@/constants/Colors';

interface TabSelectorProps {
  value: number;
  onChange: TabProps['onChange'];
}

export default function TabSelector(props: TabSelectorProps) {
  const { value, onChange } = props;
  return (
    <Tab value={value} onChange={onChange} style={styles.container} disableIndicator variant="primary">
      <Tab.Item
        title="Correo"
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        icon={{ name: 'email', type: 'entypo', color: Colors.whiteBackGround }}
      />
      <Tab.Item
        title="Apple"
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        icon={{ name: 'apple1', type: 'antdesign', color: Colors.whiteBackGround }}
      />
      <Tab.Item
        title="Google"
        containerStyle={styles.containerStyle}
        titleStyle={styles.titleStyle}
        icon={{ name: 'google', type: 'antdesign', color: Colors.whiteBackGround }}
      />
    </Tab>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, marginHorizontal: 20, borderRadius: 10 },
  containerStyle: { borderRadius: 10 },
  titleStyle: { fontSize: 12, color: Colors.whiteBackGround, marginTop: 10 },
});
