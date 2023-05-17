import { React, useState, useEffect } from "react";
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
import { db } from "../connect";
import { ref, onValue } from "firebase/database";

const ProfileAkun = ({ route, navigation }) => {
  const { DataUser } = route.params;

  // const [todoData, setTodoData] = useState([]);

  // useEffect(() => {
  //   const starCountRef = ref(db, "Tubes_PAM/" + "Profile");
  //   onValue(starCountRef, (snapshot) => {
  //     const data = snapshot.val();
  //     const newPost = Object.keys(data).map((key) => ({
  //       id: key,
  //       ...data[key],
  //     }));
  //     setTodoData(newPost);
  //     // console.log(newPost);
  //   });
  // }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.bodyContent}>
          {/* NavAtas */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={() => navigation.goBack({DataUser})}
            >
              <AntDesign name="arrowleft" size={24} color="#373737" />
            </TouchableOpacity>
            <View style={styles.teksTitle}>
              <Text style={styles.teksDaftar}>Profile Akun</Text>
            </View>
          </View>
          {/* NavAtas */}

          {/* profile */}
          <View style={styles.header2}>
                <View>
                  <Image
                    style={styles.profilephoto}
                    source={{ uri: DataUser.PictSource}}
                  />
                  {console.log(DataUser.AvatarSource)}
                </View>
            <Text>
              
                  <View>
                    <Text style={styles.nama}>{DataUser.Nama}</Text>
                  </View>
                
            </Text>
            <View style={styles.editbutton}>
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("editProfile", {
                          DataUser
                        })
                      }
                    >
                      <Text style={styles.placeholder}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Nama</Text>
            <View style={styles.fieldbox}>
              <Text>
                
                    <View>
                      <Text style={styles.detail}>{DataUser.Nama}</Text>
                    </View>
              </Text>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Alamat Email</Text>
            <View style={styles.fieldbox}>
              <Text>
                    <View>
                      <Text style={styles.detail}>{DataUser.Email}</Text>
                    </View>
              </Text>
            </View>
          </View>

          <View style={styles.box}>
            <Text style={styles.subtitle}>Alamat Rumah</Text>
            <View style={styles.fieldbox}>
              <Text>
                    <View>
                      <Text style={styles.alamat}>{DataUser.Alamat}</Text>
                    </View>
              </Text>
            </View>
          </View>

          <View style={styles.btnRiwayat}>
            <TouchableOpacity
              onPress={() => navigation.navigate("RiwayatPembayaran",{
                DataUser
              })}
            >
              <Text style={styles.riwayat}>Riwayat Pemesanan</Text>
            </TouchableOpacity>
          </View>

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
            source={require("../assets/btnHomeA.png")}
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
    // backgroundColor:"red"
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
    marginTop: 15,
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
    // height: 60,
    alignContents: "center",
    justifyContents: "center",
    justifyItems: "center",
    marginBottom: 5,
    margin: "auto",
    // backgroundColor:"blue"
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
    padding: 15,
    justifyContent: "center",
    // alignItems:"center"
  },

  placeholder: {
    color: "#ffff",
  },
  btnRiwayat: {
    width: "100%",
    alignItems: "flex-end",
  },
  riwayat: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#28A7CA",
    marginTop: 10,
    // marginRight:10,
    color: "#ffff",
  },
});

export default ProfileAkun;
