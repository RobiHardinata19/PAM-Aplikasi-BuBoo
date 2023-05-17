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

const Pembayaran = ({ route, navigation }) => {
  const [todoData, setTodoData] = useState([]);
  useEffect(() => {
    const starCountRef = ref(db, "Tubes_PAM/" + "Profile/");
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
  const { TentangBuku, HargaBuku, Penulis, JudulBuku, Pict, DataUser } = route.params;
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Note: Months are zero-based, so January is 0
  const day = currentDate.getDate();
  const formatDate = `${day} - ${month} - ${year}`;
  const [value, setValue] = useState(1);
  const decreaseValue = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const HargaTotal = parseInt(HargaBuku) * value + 10000;
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
              <Text style={styles.teksDaftar}>Pembayaran Buku</Text>
            </View>
          </View>
          {/* NavAtas */}

          {/* detail Buku */}
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Image
              style={{ width: 122, height: 180, borderRadius: 10 }}
              source={{ uri: Pict }}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ color: "#28A7CA", fontSize: 20, fontWeight: 700 }}>
                {JudulBuku}
              </Text>
              <Text style={{ fontSize: 16, color: "#969696", fontWeight: 400 }}>
                {Penulis}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  marginTop: 10,
                }}
              >
                Rp. {HargaBuku},-
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity onPress={decreaseValue}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/kurang.png")}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    fontWeight: "bold",
                  }}
                >
                  {value}
                </Text>
                <TouchableOpacity onPress={() => setValue(value + 1)}>
                  <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../assets/tambah.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/*  */}

            {/* form user */}
          </View>
          <View style={{ marginTop: 10 }}>
            {/* penerima */}
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "#969696", fontSize: 14, fontWeight: 400 }}>
                Penerima :
              </Text>
              <Text>
                    <View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontWeight: 400,
                          marginTop: 2,
                        }}
                      >
                        {DataUser.Nama}
                      </Text>
                    </View>
              </Text>
            </View>
            {/*  */}

            {/* penerima */}
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "#969696", fontSize: 14, fontWeight: 400 }}>
                Alamat :
              </Text>
              <Text>
                    <View>
                      <Text
                        style={{
                          color: "black",
                          fontSize: 16,
                          fontWeight: 400,
                          marginTop: 2,
                        }}
                      >
                        {DataUser.Alamat}
                      </Text>
                    </View>
              </Text>
            </View>
            {/*  */}

            {/* Alamat */}
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "#969696", fontSize: 14, fontWeight: 400 }}>
                Tanggal Pemesanan :
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 2,
                }}
              >
                {formatDate}
              </Text>
            </View>
            {/*  */}

            {/* metode pem*/}
            <View style={{ marginTop: 5 }}>
              <Text style={{ color: "#969696", fontSize: 14, fontWeight: 400 }}>
                No. Rek Pembayaran :
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  fontWeight: 400,
                  marginTop: 2,
                }}
              >
                0001-01-0111822-53-4 - Toko BuBoo (BRI)
              </Text>
            </View>

            {/* tabel bayar */}
            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#969696", fontSize: 16, fontWeight: 500 }}>
                Harga Barang
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: 500,
                  marginRight: 14,
                }}
              >
                Rp. {parseInt(HargaBuku) * value},-
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#969696", fontSize: 16, fontWeight: 500 }}>
                Ongkos Kirim
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: 500,
                  marginRight: 14,
                }}
              >
                Rp. 10000,-
              </Text>
            </View>
            <Text
              style={{ backgroundColor: "black", height: 1.5, marginTop: 10 }}
            ></Text>
            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "#969696", fontSize: 16, fontWeight: 500 }}>
                Total Pembayaran
              </Text>
              <Text
                style={{
                  color: "black",
                  fontSize: 18,
                  fontWeight: 500,
                  marginRight: 14,
                }}
              >
                Rp.{HargaTotal},-
              </Text>
            </View>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("UploadBukti", {
                        DataUser,
                        formatDate,
                        NamaBuku:JudulBuku,
                      })
                    }
                  >
                    <View
                      style={{
                        alignItems: "flex-end",
                        marginTop: 35,
                        marginRight: 13,
                      }}
                    >
                      <Text
                        style={{
                          backgroundColor: "#28A7CA",
                          width: 130,
                          paddingLeft: 11,
                          paddingRight: 11,
                          paddingBottom: 15,
                          paddingTop: 15,
                          textAlign: "center",
                          borderRadius: 10,
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        Beli Sekarang
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
          </View>
          {/* Daftar Buku */}
        </View>
      </ScrollView>

      {/* Navbar Bawah */}
      <View style={styles.navBawah}>
        <TouchableOpacity onPress={() => navigation.navigate("Home",{
          DataUser,
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

export default Pembayaran;
