import {React,useState,useEffect} from "react";
import { Image, StyleSheet, Text, Button, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { MaterialIcons, Feather, Fontisto, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { ImageBackground } from "react-native-web";
import { db, storage, } from "../connect";
import { ref , onValue, set, once } from "firebase/database";
import firebase from 'firebase/app';

const LoginAkun = ({ navigation }) => {
const [ email, set_email ] = useState("");
const [ pass, set_pass ] = useState("");
const [todoData, setTodoData] = useState([]);

useEffect(() => {
  const starCountRef = ref(db, "Tubes_PAM/DaftarUser/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const newPost = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    setTodoData(newPost);
    console.log(newPost);
  });
}, []);

const cekLogin = (navigation) => {
  todoData.forEach(item => {
    if(item.Email === email && item.Password === pass){
      navigation.navigate('Home', {DataUser : item, DataUserId : item});
    }
  }
  )
}

    return(
        <View style = { styles.container }>
          <View style = { styles.bodyContent }>
      <View style={ styles.header }>
        <Text style = { styles.title }>Login Akun</Text>
      </View>
      <View style = {styles.logo}>
        <Image style={{width: 185, height:244}} source={require('../assets/Logo.png')}></Image>
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

      <TouchableOpacity onPress={() => cekLogin(navigation)}>
      <View style={styles.button}>
        <Text style={styles.placeholder}>Login</Text>
      </View>
        </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('buatAkun')}>
      <Text style={styles.teksBuat}>Buat Akun?</Text> 
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
    },
    teksBuat: {
      color: '#19809C',
      fontSize: 14,
      fontWeight: 700,
      textAlign:"right"
    }
   
    
});

export default LoginAkun;