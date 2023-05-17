import {React,useState,useEffect} from "react";
import { Image, StyleSheet, Text, Button, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { MaterialIcons, Feather, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { ImageBackground } from "react-native-web";
import { db } from "../connect";
import { ref, onValue } from "firebase/database";

const Home = ({ route,navigation }) => {
  const { DataUser } = route.params;
  console.log(DataUser)
  const [todoData, setTodoData] = useState([]);
  const [Buku, setBuku] = useState([]);

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

    return(
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bodyContent}>
          <View style={styles.homeProfile}>
            <TouchableOpacity onPress={() => navigation.navigate('buatAkun')}>
                    <View>
                    <Image
                    style={{width: 55, height:55, borderRadius:10}}
                    source={{uri:DataUser.PictSource}}
                    />
                    </View>
              </TouchableOpacity>
                <View style={styles.teksProfile}>
              <Text style={styles.selamatProfile} >Selamat Datang</Text>
              <Text>
                    <View>
                      <Text style={styles.namaProfile}>{DataUser.Nama}</Text>
                    </View>
              </Text>
              </View>
          </View>
          <View style={styles.buboHome}>
              <Text style={styles.bubo} >BuBoo</Text>
              <Text style={styles.buboSub} >Jelajahi Dunia Pengetahuan dengan Mudah</Text>
          </View>
          
          {/* Jelajahi Buku */}
          <View style={styles.cardBuku}>
            <View style={styles.teksAtas}>
              <Text style={styles.jelajahi} >Jelajahi Buku</Text>
              <TouchableOpacity onPress={() => navigation.navigate('daftarBuku',{
                DataUser,
              })}>
                  <Text style={styles.lihat} >Lihat Selengkapnya</Text>
              </TouchableOpacity>
              
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.wrapBuku}> 
            {Buku.map((item, index) => {
                  return (
                    <View style={styles.buku} key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate('detailBuku', {
                      TentangBuku: item.TentangBuku,
                      HargaBuku: item.HargaBuku,
                      JudulBuku: item.JudulBuku,
                      Penulis: item.Penulis,
                      Pict:item.PictSource,
                      DataUser,
                    })}>
                        <Image
                          style={{width: 142, height:210, borderRadius:10}}
                          source={{uri:item.PictSource}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.judul} >{item.JudulBuku}</Text>
                    <Text style={styles.penulis}>{item.Penulis}</Text>
                    </View>
                  );
                })}
            </View>
            </ScrollView>
          </View>

          {/* Sedang Trending */}
          <View style={styles.cardBuku}>
            <View style={styles.teksAtas}>
              <Text style={styles.jelajahi} >Sedang Trending</Text>
              <TouchableOpacity onPress={() => navigation.navigate('daftarBuku',{
                DataUser
              })}>
                  <Text style={styles.lihat} >Lihat Selengkapnya</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.wrapBuku}>
            {Buku.map((item, index) => {
                  return (
                    <View style={styles.buku} key={index}>
                    <TouchableOpacity onPress={() => navigation.navigate('detailBuku', {
                      TentangBuku: item.TentangBuku,
                      HargaBuku: item.HargaBuku,
                      JudulBuku: item.JudulBuku,
                      Penulis: item.Penulis,
                      Pict : item.PictSource,
                      DataUser,
                    })}>
                        <Image
                          style={{width: 142, height:210, borderRadius:10}}
                          source={{uri : item.PictSource}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.judul} >{item.JudulBuku}</Text>
                    <Text style={styles.penulis}>{item.Penulis}</Text>
                    </View>
                  );
                })}
            </View>
            </ScrollView>
          </View>
          </View>
          </ScrollView>
          

          {/* Navbar Bawah */}
          <View style={styles.navBawah}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', {
              DataUser
            })}>
                  <Image
                    style={{width: 22, height:22}}
                    source={require('../assets/btnHome.png',
                    )}
                  />
              </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('cariBuku',{
              DataUser
            })}>
                  <Image
                    style={{width: 22, height:22}}
                    source={require('../assets/btnCari.png')}
                  />
              </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('daftarBuku',{
              DataUser
            })}>
                  <Image
                    style={{width: 22, height:22}}
                    source={require('../assets/btnBeli.png')}
                  />
              </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('profileAkun',{
              DataUser
            })}>
                  <Image
                    style={{width: 18, height:22}}
                    source={require('../assets/btnProfil.png')}
                  />
              </TouchableOpacity>
          </View>
          {/* Navbar Bawah */}
        </View>
        

        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width :"100%",
    backgroundColor: '#F6F6FC',
    // overflow: "hidden",
    // padding: 20,
    backgroundColor: '#FCFCFC'
    // alignItems: "center",
  },
  bodyContent: {
    padding: 20,
  },
  navBawah:{
    position: 'absolute',
    width: '100%',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 10,
    display : 'flex',
    flexDirection:'row',
    justifyContent: 'space-evenly',
    elevation: 20,
    // backgroundColor: 'red',
  },
  homeProfile:{
    marginTop : 40,
    display : 'flex',
    flexDirection:'row',
    // backgroundColor: 'red',
  },
  teksProfile:{
    // backgroundColor : 'blue',
    marginLeft: 5
  },
  selamatProfile:{
    color: "#0E0E0E",
    fontSize: 15,
    fontWeight : 700,
    top: 0,
  },
  namaProfile:{
    color: "#0E0E0E",
    fontSize: 25,
    fontWeight : 700,
    top: 0,
  },
  bubo:{
    color: "#28A7CA",
    fontSize: 38,
    letterSpacing: 7,
    fontWeight : 700,
    top: 0,
  },
  buboSub:{
    color: "#28A7CA",
    fontSize: 8,
    fontWeight : 700,
    top: 0,
    marginLeft: 3,
  },
  buboHome:{
    marginTop: 20,
  },
  teksAtas:{
    marginTop: 20,
    display : 'flex',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  jelajahi:{
    color: "#0E0E0E",
    fontSize: 22,
    fontWeight : 700,
    top: 0,
    marginLeft: 3,
  },
  lihat:{
    color: "#28A7CA",
    fontSize: 10,
    fontWeight : 700,
    marginLeft: 3,
  },
  judul:{
    marginTop: 4,
    color: "#28A7CA",
    fontSize: 14,
    fontWeight : 700,
    top: 0,
    marginLeft: 3,
  },
  penulis:{
    color: "#969696",
    fontSize: 10,
    fontWeight : 400,
    marginLeft: 3,
  },
  wrapBuku:{
    marginTop: 10,
    display : 'flex',
    flexDirection:'row',
    // backgroundColor: 'red',
  },
  buku:{
    marginLeft: 10,
  }
    
});

export default Home;