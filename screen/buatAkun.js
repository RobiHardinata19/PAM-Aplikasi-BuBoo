import {React,useState,useEffect} from "react";
import { Image, StyleSheet, Text, Button, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { db, storage } from "../connect";
import { ref as dbref, onValue, set, once } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import {
  ref as stref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const BuatAkun = ({ navigation }) => {
const [ nama, set_nama ] = useState("");
const [ email, set_email ] = useState("");
const [ pass, set_pass ] = useState("");
const [ alamat, set_alamat ] = useState("Silahkan isi alamat!");
const [ pict, set_pict ] = useState("https://firebasestorage.googleapis.com/v0/b/tubes-pam-f22ec.appspot.com/o/fotoProfile.jpg?alt=media&token=ed63079a-93bf-4bad-ba80-d4114d5b433f");



const RegisAkun = async () => {
  try {
  let index=0;
  const dataRef = dbref(db, "Tubes_PAM/DaftarUser/");
  let existingData = {};
  await onValue(dataRef, (snapshot) => {
    existingData = snapshot.val() || {};
    index = Object.keys(existingData).length;
    console.log(index);
  });
  await set(dbref(db, "Tubes_PAM/DaftarUser/User"+(index+1)), {
    Nama: nama,
    Alamat : alamat,
    Password: pass,
    Email: email,
    PictSource : pict,
  });
  } catch (error) {
    console.log(error.message);
  }
};

    return(
        <View style = { styles.container }>
          <View style = { styles.bodyContent }>
      <View style={ styles.header }>
        <Text style = { styles.title }>Buat Akun</Text>
      </View>
      <View style = {styles.logo}>
        <Image style={{width: 185, height:244}} source={require('../assets/Logo.png')}></Image>
      </View>

      <View style = {styles.box}>
        <Text style = {styles.subtitle}>Nama</Text>
        <View style = {styles.inputbox}>
          <TextInput
          value={nama}
          onChangeText={(nama) => set_nama(nama)}
          placeholder={'Masukkan Nama'}
          style={styles.input}
          />
          <Image style={{width: 18, height:20}} source = {require('../assets/icouser.png')}></Image>
        </View>
      </View>

      <View style = {styles.box}>
        <Text style = {styles.subtitle}>Email</Text>
        <View style = {styles.inputbox}>
          <TextInput
          value={email}
          onChangeText={(email) => set_email(email)}
          placeholder={'Masukkan Email'}
          selectTextOnFocus={false}
          style={styles.input}
          />
          <Image style={{width: 24, height:20}} source = {require('../assets/icoemail.png')}></Image>
        </View>
      </View>

      <View style = {styles.box}>
        <Text style = {styles.subtitle}>Kata Sandi</Text>
        <View style = {styles.inputbox}>
          <TextInput
          value={pass}
          onChangeText={(pass) => set_pass(pass)}
          placeholder={'Masukkan Kata Sandi'}
          secureTextEntry={true}
          selectTextOnFocus={false}
          style={styles.input}
          />
          <Image style={{width: 25, height:20}} source = {require('../assets/icopass.png')}></Image>
        </View>
      </View>
      <TouchableOpacity onPress={() => {RegisAkun(); navigation.navigate('loginAkun');}}>
      <View style={styles.button}>
        <Text style={styles.placeholder}>Buat Akun</Text>
      </View>
        </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
    width :"100%",
    backgroundColor: '#70EDE9',
    // overflow: "hidden",
    // padding: 20,
    // backgroundColor: '#FCFCFC'
    alignItems: "center",
    },
    bodyContent: {
    padding: 20,
  },
    title: {
      marginTop:40,
      fontSize: 30,
      fontWeight: 700,
      marginBottom: 25,
    },
    logo: {
      justifyContent:'center',
      alignItems:'center',
      // backgroundColor:'red',
      marginBottom: 20,
    }, 
    box: {
      width: "100%",
      height: 70,  
      alignContents: 'center',
      justifyContents: 'center',
      justifyItems: 'center',
      marginBottom: 15,
      margin: 'auto',
    },
    subtitle: {
      color: '#ffff',
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 700,
    },
    inputbox: {
      // margin: 'auto',
      padding: 15,
      width: "100%",
      height: 100,
      borderRadius: 10,
      backgroundColor: '#ffff',
      // marginLeft:6,
      // alignContents: 'center',
      flex: 2,
      flexDirection: 'row',
      justifyContents: 'space-between',
      alignItems:"center"
      // alignContents: 'center',
    },
    input: {
      flex: 1, 
      color: '#B1B1B1',
      fontSize: 14,
    },
    icon: {
      flex: 1,
      width: 'max-width',
      height: 18,
    },
    button: {
      width: "100%",
      height: 50,
      borderRadius: 10,
      backgroundColor: '#28A7CA',
      alignItems: 'center',
      justifyContents: 'center',
      padding: 14,
      margin: 'auto',
      marginBottom: 20,
      marginTop: 20,
     },
     placeholder: {
      color: '#ffff',
    }
   
    
});

export default BuatAkun;