import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon } from '@rneui/themed';

import {Colors} from '@/constants/Colors';

import { Assets } from '@/constants/Styles';
import RemoteImage from '../global/RemoteImage';

interface ProfileAvatarProps {
  photoUrl: string | undefined;
}

export default function ProfileAvatar({ photoUrl }: ProfileAvatarProps) {
  return (
    <View>
      <RemoteImage circle width={130} height={130} url={photoUrl} defaultSource={Assets.generic_user_01} />
      <View style={styles.iconWrapper}>
        <Icon style={styles.icon} color={Colors.whiteBackGround} name="camera" type="antdesign" size={22} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: { marginTop: -2 },
});
