import React, { useState } from 'react';

import { Image, ImageProps, StyleSheet, View } from 'react-native';

import { Skeleton } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

interface RemoteImageProps {
  url?: string;
  defaultSource?: ImageProps['source'];
  resizeMode?: ImageProps['resizeMode'];
  width: number;
  height: number;
  circle?: boolean;
}

export default function RemoteImage(props: RemoteImageProps) {
  const { url, resizeMode, width, height, circle, defaultSource } = props;
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>();

  const shape = { width, height, borderRadius: circle ? width : 0 };

  return (
    <>
      {url ? (
        <View style={[styles.container, shape]}>
          <Image
            onLoadStart={() => setStatus('loading')}
            onError={() => setStatus('error')}
            onLoad={() => setStatus('success')}
            style={shape}
            resizeMode={resizeMode}
            source={{ uri: url }}
          />
          {status !== 'success' && <Skeleton animation="wave" circle style={[styles.skeleton, shape]} LinearGradientComponent={LinearGradient} />}
        </View>
      ) : (
        <Image style={shape} source={defaultSource} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { position: 'relative' },
  skeleton: { position: 'absolute' },
});
