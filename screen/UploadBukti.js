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

const UploadBukti = ({ navigation, route }) => {
  const { DataUser,formatDate,NamaBuku} = route.params;
  const [imageBlob, setImageBlob] = useState(null);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const { uri } = result;
      const response = await fetch(uri);
      const blob = await response.blob();
      setImage(uri);
      setImageBlob(blob);
      console.log(blob);
    }
  };
  
  const upload = async (navigation) => {
    try {
    let index=0;
    const dataRef = dbref(db, "Tubes_PAM/BuktiTransaksi/DaftarBukti");
    let existingData = {};
    await onValue(dataRef, (snapshot) => {
      existingData = snapshot.val() || {};
      index = Object.keys(existingData).length;
      console.log(index);
    });
    const imageRef = stref(storage, ("Bukti"+(index+1)));
    await uploadBytes(imageRef, imageBlob);
    const downloadUrl = await getDownloadURL(imageRef);
    console.log("Durl : " + downloadUrl);
    await setUrl(downloadUrl);
    await set(dbref(db, "Tubes_PAM/BuktiTransaksi/DaftarBukti/Bukti"+(index+1)), {
      Nama: DataUser.Nama,
      Alamat: DataUser.Alamat,
      Tanggal: formatDate,
      PictSource: downloadUrl,
      Judul:NamaBuku,
    });
    } catch (error) {
      console.log(error.message);
    }
    await navigation.navigate('RiwayatPembayaran',{
      DataUser
    })
  };

  return(
      <View style={styles.container}>
      {console.log('url : ' + url)}
      <View style={styles.wrapKirim}>
        <Image
          style={{ height: 244, width: 153 }}
          source={{uri:image
          }}
        />
        <TouchableOpacity onPress={pickImage}>
        <Text style={styles.Kirim} >Upload Bukti</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => upload(navigation)}>
        <Text style={styles.Kirim} >Kirim Bukti</Text>
        </TouchableOpacity>
      </View>
    </View> 
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: '#F6F6FC',
    alignItems: "center",
    justifyContent: "center"
  },
  wrapKirim: {
    width: 304,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#28A7CA",

  },
  Kirim: {
    backgroundColor: "#28A7CA",
    padding: 10,
    marginTop: 15,
    color: "#ffff",
    borderRadius: 5,
  }


});

export default UploadBukti;