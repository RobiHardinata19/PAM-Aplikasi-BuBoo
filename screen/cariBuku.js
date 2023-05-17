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

const CariBuku = ({ navigation, route }) => {
  const [cari, set_cari] = useState("");
  const [CariBuku, setCariBuku] = useState([]);
  const [Buku, setBuku] = useState([]);
  const { DataUser } = route.params;

  useEffect(() => {
    const starCountRef = ref(db, "Tubes_PAM/" + "Buku/DaftarBuku/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const newPost = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      const filteredData = newPost.filter((item) =>
      item.JudulBuku.toLowerCase().includes(cari.toLowerCase())
      );
      setCariBuku(filteredData);
    });
  }, [cari]);

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
              <Text style={styles.teksDaftar}>Cari Buku</Text>
            </View>
          </View>
          {/* NavAtas */}

          {/* btnCari */}
          <View style={styles.cari}>
            <View style={styles.box}>
              <View style={styles.inputbox}>
                <TextInput
                  value={cari}
                  onChangeText={(cari) => set_cari(cari)}
                  placeholder={"Cari"}
                  style={styles.input}
                />
                <Image
                  style={{ width: 25, height: 25 }}
                  source={require("../assets/cari.png")}
                ></Image>
              </View>
            </View>
          </View>
          {/* btnCari */}

          {/* sedang dicari */}
          <View style={styles.cardBuku}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.wrapBuku}>
                {CariBuku.map((item, index) => {
                  return (
                    <View style={styles.buku} key={index}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("detailBuku", {
                            TentangBuku: item.TentangBuku,
                            HargaBuku: item.HargaBuku,
                            JudulBuku: item.JudulBuku,
                            Penulis: item.Penulis,
                            Pict: item.PictSource,
                            DataUser,
                          })
                        }
                      >
                        <Image
                          style={{ width: 142, height: 210, borderRadius: 10 }}
                          source={{ uri: item.PictSource }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.judul}>{item.JudulBuku}</Text>
                      <Text style={styles.penulis}>{item.Penulis}</Text>
                      {console.log(item.HargaBuku)}
                    </View>
                  );
                })}
            </View>
            </ScrollView>
            <View style={styles.teksAtas}>
              <Text style={styles.jelajahi}>Sering Dicari</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.wrapBuku}>
                {Buku.map((item, index) => {
                  return (
                    <View style={styles.buku} key={index}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("detailBuku", {
                            TentangBuku: item.TentangBuku,
                            HargaBuku: item.HargaBuku,
                            JudulBuku: item.JudulBuku,
                            Penulis: item.Penulis,
                            Pict: item.PictSource,
                            DataUser,
                          })
                        }
                      >
                        <Image
                          style={{ width: 142, height: 210, borderRadius: 10 }}
                          source={{ uri: item.PictSource }}
                        />
                      </TouchableOpacity>
                      <Text style={styles.judul}>{item.JudulBuku}</Text>
                      <Text style={styles.penulis}>{item.Penulis}</Text>
                      {console.log(item.HargaBuku)}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
          {/* sedang dicari */}
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
            source={require("../assets/btnCariB.png")}
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
  box: {
    marginTop: 20,
  },
  inputbox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "space-between",
  },
  jelajahi: {
    color: "#0E0E0E",
    fontSize: 22,
    fontWeight: 700,
    top: 0,
    marginLeft: 3,
    marginTop: 20,
  },
  lihat: {
    color: "#28A7CA",
    fontSize: 10,
    fontWeight: 700,
    marginLeft: 3,
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
  wrapBuku: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    // backgroundColor: 'red',
  },
  buku: {
    marginLeft: 10,
  },
  input: {
    width: "85%",
  },
});

export default CariBuku;
