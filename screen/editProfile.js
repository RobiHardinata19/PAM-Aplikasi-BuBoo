import { React, useState, useEffect } from "react";
import {
  // Other imports
  useFocusEffect,
} from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  Feather,
  Fontisto,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { ImageBackground } from "react-native-web";
import { db, storage } from "../connect";
import { ref as dbref, onValue, set, update } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import {
  ref as stref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const EditProfile = ({ route, navigation }) => {
  const { DataUser } = route.params;
  const [nama, set_nama] = useState(DataUser.Nama);
  const [email, set_email] = useState(DataUser.Email);
  const [alamat, set_alamat] = useState(DataUser.Alamat);
  const [pass, set_pass] = useState(DataUser.Password);
  const [image, setImage] = useState(DataUser.PictSource);
  const [imageBlob, setImageBlob] = useState(null);
  const [todoData, setTodoData] = useState(DataUser);
  

  const Update = async (navigation) => {
    try {
    let downloadUrl = image;
    console.log('Old : ' + downloadUrl);
    const imageRef = stref(storage, "avatar");
      if(imageBlob !== null){
        await uploadBytes(imageRef, imageBlob);
        downloadUrl = await getDownloadURL(imageRef);
        console.log('New : ' + downloadUrl);
      }
    await set(dbref(db, ("Tubes_PAM/DaftarUser/" + (DataUser.id))), {
      Nama: nama,
      Alamat: alamat,
      Email: email,
      Password: pass,
      PictSource: downloadUrl,
    });
    await todoData.forEach(item => {
      if (item.id === DataUser.id){
        navigation.navigate('profileAkun', { DataUser : item });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}
useEffect(() => {
  const starCountRef = dbref(db, ("Tubes_PAM/DaftarUser/"));
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    const newPost = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    setTodoData(newPost);
  })
}, []);

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
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContent}>
          {/* NavAtas */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="#373737" />
            </TouchableOpacity>
            <View style={styles.teksTitle}>
              <Text style={styles.teksDaftar}>Edit Profile</Text>
            </View>
          </View>
          {/* NavAtas */}

          {/* profile */}
          <View style={styles.header2}>
            <TouchableOpacity onPress={pickImage}>
              {image && (
                <Image style={styles.profilephoto} source={{ uri: image }} />
              )}
              {console.log(image)}
            </TouchableOpacity>
            <Text style={styles.nama}>{DataUser.Nama}</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Nama</Text>
            <View style={styles.fieldbox}>
              <TextInput
                value={nama}
                onChangeText={(nama) => set_nama(nama)}
                placeholder={"Masukkan nama"}
                selectTextOnFocus={false}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Alamat Email</Text>
            <View style={styles.fieldbox}>
              <TextInput
                value={email}
                onChangeText={(email) => set_email(email)}
                placeholder={"Masukkan Email"}
                selectTextOnFocus={false}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Password</Text>
            <View style={styles.fieldbox}>
              <TextInput
                value={pass}
                onChangeText={(pass) => set_pass(pass)}
                placeholder={"Masukkan pass"}
                secureTextEntry={true}
                selectTextOnFocus={false}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Alamat Rumah</Text>
            <View style={styles.fieldbox}>
              <TextInput
                value={alamat}
                onChangeText={(alamat) => set_alamat(alamat)}
                placeholder={"Masukkan alamat"}
                selectTextOnFocus={false}
                style={styles.input}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              Update(navigation);
            }}
          >
            <View style={styles.button}>
              <Text style={styles.placeholder}>Simpan</Text>
            </View>
          </TouchableOpacity>
          {/* profile */}
        </View>
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.navBawah}>
        <TouchableOpacity onPress={() => navigation.navigate("Home",{
          DataUser
        })}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require("../assets/btnHomeA.png"
            )}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("cariBuku",{
          DataUser
        })}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require("../assets/btnCari.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("daftarBuku",{
          DataUser
        })}>
          <Image
            style={{ width: 22, height: 22 }}
            source={require("../assets/btnBeli.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("profileAkun",{
          DataUser
        })}>
          <Image
            style={{ width: 18, height: 22 }}
            source={require("../assets/btnProfil2.png")}
          />
        </TouchableOpacity>
      </View>
      {/* Navbar Bawah */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F6F6FC",
    // overflow: "hidden",
    // padding: 20,
    backgroundColor: "#FCFCFC",
    // alignItems: "center",
  },
  bodyContent: {
    padding: 20,
  },
  navBawah: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    elevation: 20,
    // backgroundColor: 'red',
  },
  header: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    position: "relative",
    // backgroundColor: 'red',
  },
  buttonBack: {
    zIndex: 99,
  },
  teksTitle: {
    display: "flex",
    alignItems: "center",
    // backgroundColor:'blue',
    width: "100%",
    position: "absolute",
  },
  teksDaftar: {
    color: "#071D2C",
    fontSize: 20,
    fontWeight: 700,
    marginLeft: 3,
  },
  nama: {
    margin: 5,
    fontWeight: 700,
    fontSize: 16,
  },

  header2: {
    alignItems: "center",
  },

  editbutton: {
    alignItems: "center",
    margin: 5,
    // width: 60,
    // height: 20,
    borderRadius: 5,
    backgroundColor: "#28A7CA",
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 15,
  },

  profilephoto: {
    width: 110,
    height: 110,
    marginTop: 10,
    borderRadius: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: 25,
    flex: 1,
    textAlign: "center",
  },

  box: {
    width: "100%",
    height: 60,
    alignContents: "center",
    justifyContents: "center",
    justifyItems: "center",
    marginBottom: 20,
    margin: "auto",
    // backgroundColor:"red"
  },

  subtitle: {
    color: "#080808",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 700,
  },

  fieldbox: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#ffff",
    // height: 'max-height',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
  },

  placeholder: {
    color: "#ffff",
  },

  detail: {
    // padding: 10,
    height: 25,
  },
  alamat: {
    // padding: 10,
    height: 45,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#28A7CA",
    alignItems: "center",
    justifyContents: "center",
    padding: 12,
    margin: "auto",
    marginTop: 30,
  },
  placeholder: {
    fontSize: 18,
    fontWeight: 700,
    color: "#ffff",
  },
});

export default EditProfile;
