import { React, useState, useEffect } from "react";
import { db, storage } from "../connect";
import { ref as dbref, onValue, set } from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import {
  ref as stref,
  uploadBytes,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
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

const RiwayatPembayaran = ({ navigation, route }) => {
  const { DataUser} = route.params;
  const [todoData, setTodoData] = useState([]);
  useEffect(() => {
    const starCountRef = dbref(db, "Tubes_PAM/BuktiTransaksi/DaftarBukti");
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
              <Text style={styles.teksDaftar}>Riwayat Pemesanan</Text>
            </View>
          </View>
          {/* NavAtas */}
          {todoData.map((item, index) => {
            return (
              <View style={styles.wrap} key={index}>
                <View style={styles.teksDetail}>
                  <Text style={styles.headTeks}>Nama Buku</Text>
                  <Text style={styles.isiTeks}>{item.Judul}</Text>
                  <Text style={styles.headTeks}>Penerima</Text>
                  <Text style={styles.isiTeks}>{item.Nama}</Text>
                  <Text style={styles.headTeks}>Tanggal Pemesanan</Text>
                  <Text style={styles.isiTeks}>{item.Tanggal}</Text>
                  <Text style={styles.headTeks}>Status Pemesanan</Text>
                  <Text style={styles.isiTeks}>Sudah Terkirim</Text>
                </View>
                <View style={styles.bukti}>
                  <Image
                    style={{ width: "100%", height: 250 }}
                    source={{uri:item.PictSource}}
                  />
                </View>
              </View>
            );
          })}
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

  wrap: {
    marginTop: 20,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#28A7CA",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  teksDetail: {
    width: "50%",
  },
  headTeks: {
    fontSize: 14,
    fontWeight: 400,
    color: "#F0FF3D",
  },
  isiTeks: {
    fontSize: 16,
    fontWeight: 700,
    color: "#Fff",
    marginBottom: 20,
  },
  bukti: {
    width: "50%",
    backgroundColor: "yellow",
  },
});

export default RiwayatPembayaran;
