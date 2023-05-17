import * as React from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screen/HomePage';
import CariBuku from './screen/cariBuku';
import DetailBuku from './screen/detailBuku';
import EditProfile from './screen/editProfile';
import ProfileAkun from './screen/profileAkun';
import LoginAkun from './screen/loginAkun';
import Pembayaran from './screen/pembayaran';
import DaftarBuku from './screen/daftarBuku';
import BuatAkun from './screen/buatAkun';
import RiwayatPembayaran from './screen/RiwayatPembayaran';
import UploadBukti from './screen/UploadBukti';

const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loginAkun">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="cariBuku" component={CariBuku} options={{ headerShown: false }}/>
        <Stack.Screen name="daftarBuku" component={DaftarBuku} options={{ headerShown: false }}/>
        <Stack.Screen name="detailBuku" component={DetailBuku} options={{ headerShown: false }}/>
        <Stack.Screen name="editProfile" component={EditProfile} options={{ headerShown: false }}/>
        <Stack.Screen name="profileAkun" component={ProfileAkun} options={{ headerShown: false }}/>
        <Stack.Screen name="loginAkun" component={LoginAkun} options={{ headerShown: false }}/>
        <Stack.Screen name="buatAkun" component={BuatAkun} options={{ headerShown: false }}/>
        <Stack.Screen name="pembayaran" component={Pembayaran} options={{ headerShown: false }}/>
        <Stack.Screen name="RiwayatPembayaran" component={RiwayatPembayaran} options={{ headerShown: false }}/>
        <Stack.Screen name="UploadBukti" component={UploadBukti} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}