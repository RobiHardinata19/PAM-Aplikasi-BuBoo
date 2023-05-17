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

const Home = ({ navigation,route }) => {
  const {DataUser } = route.params;
  const [Buku, setBuku] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "Tubes_PAM/" + "Buku/DaftarBuku/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setBuku(newPost);
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
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="arrowleft" size={24} color="#373737" />
            </TouchableOpacity>
            <View style={styles.teksTitle}>
              <Text style={styles.teksDaftar}>Daftar Buku</Text>
            </View>
          </View>
          {/* NavAtas */}

          {/* Daftar Buku */}
          <View style={styles.daftarBuku}>
            {Buku.map((item, index) => {
              return (
                <View style={styles.wrap} key={index}>
                  <View style={styles.wrapBuku}>
                    <View style={styles.detailBuku}>
                      <Image
                        style={{ width: 70, height: 96, borderRadius: 5 }}
                        source={{uri:item.PictSource}}
                      />
                      <View style={styles.wrapDetail}>
                        <Text style={styles.judul}>{item.JudulBuku}</Text>
                        <Text style={styles.penulis}>{item.Penulis}</Text>
                        <Image
                          style={{ width: 83, height: 15, borderRadius: 5 }}
                          source={require("../assets/rating.png")}
                        />
                        <Text style={styles.harga}>Rp. {item.HargaBuku},-</Text>
                      </View>
                    </View>
                    <View style={styles.wrapBtn}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('detailBuku',
                        {
                          TentangBuku: item.TentangBuku,
                          HargaBuku: item.HargaBuku,
                          JudulBuku: item.JudulBuku,
                          Penulis: item.Penulis,
                          Pict:item.PictSource,
                          DataUser,
                        }
                        )}
                      >
                        <Text style={styles.btnDetail}>Detail Buku</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.tesgaris}></Text>
                </View>
              );
            })}
            {/* buku */}

            {/* buku */}
          </View>
          {/* Daftar Buku */}
        </View>
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.navBawah}>
        <TouchableOpacity onPress={() => navigation.navigate("Home",{
          DataUser})}>
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
            source={require("../assets/btnBeliB.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("profileAkun",{
          DataUser
        })}>
          <Image
            style={{ width: 18, height: 22 }}
            source={require("../assets/btnProfil.png")}
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
  btnDetail: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: 700,
    backgroundColor: "#28A7CA",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },

  // daftarBuku
  wrapBuku: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: 'green',
  },
  detailBuku: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    // backgroundColor: 'red',
  },
  wrapDetail: {
    marginLeft: 10,
    // backgroundColor:'blue',
  },
  wrapBtn: {
    justifyContent: "flex-end",
    // backgroundColor:'yellow',
  },
  judul: {
    marginTop: 4,
    color: "#28A7CA",
    fontSize: 14,
    fontWeight: 700,
    top: 0,
    marginLeft: 3,
  },
  penulis: {
    color: "#969696",
    fontSize: 10,
    fontWeight: 400,
    marginLeft: 3,
  },
  harga: {
    color: "#071D2C",
    fontSize: 18,
    fontWeight: 700,
  },
  garisBuku: {
    marginTop: 10,
    height: 1.5,
    backgroundColor: "##EBEBEB",
  },
  tesgaris: {
    marginTop: 10,
    backgroundColor: "#EBEBEB",
    height: 1.5,
  },
  // daftarBuku
});

export default Home;
