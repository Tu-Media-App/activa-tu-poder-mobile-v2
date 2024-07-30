import { Colors, CustomFonts } from '@/constants';
import { useSheetStore } from '@/store';
import { SheetOption } from '@/types';
import { Icon, Overlay } from '@rneui/themed';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Sheet = ({ children }: { children: React.ReactElement }) => {
  const [params, hide, setSelected] = useSheetStore(state => [state.params, state.hide, state.setSelected]);

  const _renderItem = (element: SheetOption, index: number) => (
    <TouchableOpacity key={index} onPress={() => setSelected(element)}>
      <View style={styles.itemRow}>
        {element.icon}
        <Text style={styles.label}>{element.label}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      {children}
      <Overlay backdropStyle={styles.backdrop} overlayStyle={styles.overlay} isVisible={!!params} onBackdropPress={hide}>
        <View style={styles.head}>
          <View style={styles.left}>
            <Text style={styles.title}>{params?.title}</Text>
          </View>
          <TouchableOpacity onPress={hide}>
            <Icon name="closecircle" type="antdesign" color={'red'} size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.item}>{params?.options.map((element, index) => _renderItem(element, index))}</View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    marginTop: Dimensions.get('screen').height / 2.4,
    flex: 1,
    width: '100%',
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 0,
  },
  backdrop: { backgroundColor: 'rgba(0,0,0,0.2)' },
  item: { display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20, paddingTop: 30 },
  itemRow: { width: 150, height: 150, justifyContent: 'center', marginBottom: 10, marginHorizontal: 5, backgroundColor: 'rgba(0,0,0,.10)' },
  label: { fontFamily: CustomFonts.BarlowSemiCondensedRegular, fontSize: 20, textAlign: 'center', marginTop: 10, color: 'black' },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  left: {
    paddingRight: 0,
    marginTop: 10,
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: Colors.primary,
  },
  title: {
    borderRadius: 20,
    color: Colors.primary,
    fontSize: 25,
    textAlign: 'center',
    fontFamily: CustomFonts.BarlowSemiCondensedExtraBoldItalic,
  },
});
