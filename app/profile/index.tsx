/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';

import { Icon, Image, Text } from '@rneui/themed';

import { Alert, AlertButton, AlertOptions, Linking, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Callback, launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { Colors, Assets, CustomFonts } from '@/constants';
import TextInput from '@/components/global/TextInput';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PersonalInfo } from '@/entities/users/personalInfo';
import Select from '@/components/global/Select';
import { Country } from '@/entities/users/country';
import { Province } from '@/entities/users/province';
import { City } from '@/entities/users/city';
import { useDeleteUser, useLogout, useStorePhoto } from '@/hooks';
import DateInput from '@/components/global/DateInput';
import ProfileAvatar from '@/components/users/ProfileAvatar';
import { Timestamp } from '@react-native-firebase/firestore';
import { useAuthStore, useLoadingStore, useSheetStore } from '@/store';
import { OverlayError } from '@/components/global/OverlayError';
import { router } from 'expo-router';
import { Sheet } from '@/components';

type AlertParams = [string, string, AlertButton[], AlertOptions];

const alerts: { success: AlertParams } = {
  success: [
    'Perfil actualizado',
    'Cambios guardados correctamente',
    [
      {
        text: 'De acuerdo',
        onPress: () => {},
      },
    ],
    { cancelable: true },
  ],
};

export default function ProfileScreen() {
  const [currentUser, user] = useAuthStore(state => [state.firebaseUser, state.user]);

  const mode = 'edit';
  const { logout } = useLogout();
  const { deleteUser } = useDeleteUser();
  const { storePhoto } = useStorePhoto();
  const [showLoader, hideLoader] = useLoadingStore(state => [state.showLoader, state.hideLoader]);
  const [sheetSelection, showSheet] = useSheetStore(state => [state.selected, state.show]);

  useEffect(() => {
    if (!user || !currentUser) {
      router.push('/');
    }
  }, [user, currentUser]);

  const form = useForm<PersonalInfo>({
    mode: 'onSubmit',
    values: {
      about: user?.about,
      name: user?.name,
      lastName: user?.lastName,
      birthdate: user?.birthdate,
      profession: user?.profession,
      wish: user?.wish,
      gender: user?.gender,
      country: user?.country,
      province: user?.province,
      city: user?.city,
      photoUrl: user?.photoUrl,
      blocked: user ? user.blocked : [],
    },
  });

  //sync dirty profile
  // const dispatch = useDispatch();

  // const syncDirty = useCallback(() => {
  //   // dispatch(GlobalActions.setDirtyProfile(form.formState.isDirty));
  // }, [dispatch, form.formState.isDirty]);

  // useEffect(() => {
  //   syncDirty();
  // }, [syncDirty]);

  const watcher = form.watch();

  const countries: Country[] = Assets.countries;
  const provinces: Province[] | undefined = countries.find(item => item.code === watcher.country)?.provinces;
  const cities: City[] | undefined = provinces?.find(item => item.code === watcher.province)?.cities;

  const submit: SubmitHandler<PersonalInfo> = async (fields: PersonalInfo) => {
    showLoader();
    // await updateProfile(user.uid, fields);
    hideLoader();

    Alert.alert(...alerts.success);
    // navigation.navigate('Home');
  };

  useEffect(() => {
    const handleSelection = async () => {
      try {
        if (!sheetSelection) return;
        if (sheetSelection.value === 'camera') {
          await launchCamera({ mediaType: 'photo' }, cameraCallback);
        } else if (sheetSelection.value === 'gallery') {
          const response = await launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
            selectionLimit: 1,
          });
          if (response.errorCode === 'permission') {
            Alert.alert(
              'Acceso a la cámara y librería de fotos',
              'Debes habilitar el acceso a la cámara y librería de fotos',
              [
                {
                  text: 'Cancelar',
                  onPress: () => {},
                },
                {
                  text: 'Dar acceso',
                  onPress: () => Linking.openSettings(),
                },
              ],
              { cancelable: true },
            );
          } else if (response.assets) {
            const photo = response?.assets?.[0].uri;
            if (photo && user) {
              showLoader();
              await storePhoto(user.uid, photo);
              hideLoader();
            }
          }
        }
      } catch (error) {
        console.error(error);
        hideLoader();
      }
    };
    handleSelection();
  }, [sheetSelection]);

  const cameraCallback: Callback = async response => {
    if (response.assets) {
      const photo = response?.assets?.[0].uri;
      if (photo && user) {
        showLoader();
        await storePhoto(user.uid, photo);
        hideLoader();
      }
    } else if (response.errorCode === 'permission') {
      Alert.alert(
        'Acceso a la cámara y librería de fotos',
        'Debes habilitar el acceso a la cámara y librería de fotos',
        [
          {
            text: 'Cancelar',
            onPress: () => {},
          },
          {
            text: 'Dar acceso',
            onPress: () => Linking.openSettings(),
          },
        ],
        { cancelable: true },
      );
    }
  };

  const handleImage = async () => {
    try {
      const options = [
        { value: 'camera', label: 'Tomar una foto', icon: <Icon type="entypo" name="camera" /> },
        { value: 'gallery', label: 'Ir a galería', icon: <Icon type="entypo" name="image" /> },
      ];
      showSheet({ options });
    } catch (error) {
      console.error(error);
      hideLoader();
    }
  };

  const onDelete = () => {
    Alert.alert('Confirmar eliminación', 'Si eliminas tu perfil no podrás acceder a menos que te registres de nuevo', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          if (currentUser) await deleteUser(currentUser);
          logout();
        },
      },
    ]);
  };

  return (
    <Sheet>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardDismissMode="interactive" keyboardShouldPersistTaps={'never'}>
          <View style={styles.head}>
            <Image source={Assets.primary_icon} style={styles.headIcon} resizeMode="contain" />
          </View>
          <View style={styles.card}>
            <View style={styles.avatar}>
              <TouchableOpacity onPress={handleImage}>
                <ProfileAvatar photoUrl={user?.photoUrl} />
              </TouchableOpacity>
            </View>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {user?.name} {user?.lastName}
              </Text>
            </View>
            <TextInput name="about" control={form.control} label={'Acerca de mí'} autoCapitalize="none" multiline numberOfLines={3} />
            <TextInput name="name" control={form.control} label={'Nombre'} autoCapitalize="none" />
            <TextInput name="lastName" control={form.control} label={'Apellido'} autoCapitalize="none" />
            <Controller
              name="birthdate"
              rules={{ required: 'Campo requerido' }}
              control={form.control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <DateInput
                  timestamp={value}
                  onChange={(newTimestamp: Timestamp | undefined) => onChange(newTimestamp)}
                  inputProps={{
                    renderErrorMessage: !!error,
                    errorMessage: error?.message,
                  }}
                />
              )}
            />
            <TextInput name="profession" control={form.control} label={'Ocupación'} autoCapitalize="none" />
            <TextInput name="wish" control={form.control} label={'¿Qué le pedirías a Luisa?'} autoCapitalize="none" />
            <Controller
              name="gender"
              rules={{ required: 'Campo requerido' }}
              control={form.control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  value={value}
                  containerStyle={styles.select}
                  onSelect={(newValue: string) => onChange(newValue)}
                  label="Género"
                  data={[
                    { label: 'Masculino', value: 'male' },
                    { label: 'Femenino', value: 'female' },
                    { label: 'Otro', value: 'other' },
                    { label: 'Prefiero no decir', value: 'notProvided' },
                  ]}
                  errorMessage={error?.message}
                />
              )}
            />

            {/* address */}

            <Controller
              name="country"
              rules={{ required: 'Campo requerido' }}
              control={form.control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <Select
                  value={value}
                  containerStyle={styles.select}
                  onSelect={onChange}
                  label="País"
                  data={countries.map(item => ({ label: item.name, value: item.code, item }))}
                  errorMessage={error?.message}
                />
              )}
            />

            {provinces && (
              <Controller
                name="province"
                rules={{ required: 'Campo requerido' }}
                control={form.control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    containerStyle={styles.select}
                    onSelect={onChange}
                    label="Provincia"
                    data={provinces.map(item => ({ label: item.name, value: item.code, item }))}
                    errorMessage={error?.message}
                  />
                )}
              />
            )}

            {cities && (
              <Controller
                name="city"
                rules={{ required: 'Campo requerido' }}
                control={form.control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <Select
                    value={value}
                    containerStyle={styles.select}
                    onSelect={onChange}
                    label="Ciudad"
                    data={cities.map(item => ({ label: item.name, value: item.code, item }))}
                    errorMessage={error?.message}
                  />
                )}
              />
            )}

            <View style={styles.actions}>
              {mode === 'edit' && (
                <>
                  {form.formState.isDirty && (
                    <TouchableOpacity onPress={form.handleSubmit(submit, error => console.warn(error))} style={[styles.button, { marginBottom: 40 }]}>
                      <Text style={styles.buttonText}>Guardar cambios</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={logout} style={[styles.button, styles.negative]}>
                    <Text style={styles.buttonText}>Cerrar Sesión</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onDelete} style={[styles.button, { backgroundColor: 'red' }]}>
                    <Text style={styles.buttonText}>Eliminar mi cuenta</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          <OverlayError />
        </ScrollView>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 85,
    marginTop: 60,
    paddingBottom: 400,
  },
  head: { width: '100%', alignItems: 'center' },
  headIcon: { width: 135, height: 135 },
  avatar: { position: 'absolute', marginTop: -65, width: '100%', justifyContent: 'center', alignItems: 'center' },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  containerStyle: {
    width: '90%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 14,
    paddingVertical: 10,
    backgroundColor: Colors.whiteBackGround,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },
  inputContainerStyle: {
    borderBottomWidth: 0, // mandatory to override rneui default
    fontFamily: CustomFonts.MontserratRegular,
  },
  select: {
    marginBottom: 15,
  },
  labelStyle: {
    color: Colors.primary,
    fontFamily: CustomFonts.MontserratBold,
  },
  actions: { marginTop: 20 },
  button: {
    alignSelf: 'center',
    marginHorizontal: '5%',
    marginBottom: 10,
    width: 250,
    height: 50,
    borderRadius: 15,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: Colors.whiteBackGround,
    fontFamily: CustomFonts.MontserratBold,
  },
  header: { alignItems: 'center' },
  headerText: {
    textAlign: 'center',
    fontFamily: CustomFonts.BarlowSemiCondensedExtraBoldItalic,
    fontSize: 40,
    display: 'flex',
    width: 200,
    color: Colors.primary,
  },
  negative: { backgroundColor: Colors.secondary },
});
