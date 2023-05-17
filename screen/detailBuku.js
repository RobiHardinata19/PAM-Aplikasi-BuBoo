import {React,useState, useEffect} from "react";
import { Image, StyleSheet, Text, Button, View, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { MaterialIcons, Feather, Fontisto, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { ImageBackground } from "react-native-web";
import { db } from "../connect";
import { ref, onValue } from "firebase/database";

const DetailBuku = ({ route, navigation }) => {
  const { TentangBuku, HargaBuku, Penulis, JudulBuku, Pict, DataUser } = route.params;
  const Harga = String(HargaBuku);

    return(
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.bodyContent}>
            {/* NavAtas */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.buttonBack}
              onPress={ () => navigation.goBack()}
            >
            <AntDesign name="arrowleft" size={24} color="#373737" />
            </TouchableOpacity>
                <View style={styles.teksTitle}>
              <Text style={styles.teksDaftar} >Detail Buku</Text>
              </View>
          </View>
           {/* NavAtas */}
          
          {/* cardBuku */}
          <View style={styles.card}>
            {console.log(Pict)}
            <Image
                    style={{width: 197, height:271, borderRadius:5, }}
                    source={{uri : Pict}}/>
              <Text style={styles.judul} >{JudulBuku}</Text>
              <Text style={styles.penulis} >{Penulis}</Text>
          </View>
          <View style={styles.wrapRating}>
          <Image
                    style={{width: 83, height:15, borderRadius:5,}}
                    source={require('../assets/rating.png')}/>
          </View>
          {/* cardBuku */}

          {/* tentang */}
          <View style={styles.wrapTentang}>
          <Text style={styles.judulTentang} >Tentang Buku</Text>
            <View>
              <Text style={styles.isiTeks}>{TentangBuku}</Text> 
            </View>
          </View>
          {/* tentang */}

          {/* kontenHarga */}
          <View style={styles.wrapHarga}>
            <View style={styles.teksHarga}>
              <Text style={styles.harga} >Harga</Text>
              <Text style={styles.hargaJumlah} >Rp. {Harga}</Text>
            </View>
            <View style={styles.btnHarga}>
              <TouchableOpacity onPress={() => navigation.navigate('pembayaran',{
                TentangBuku,
                HargaBuku,
                JudulBuku,
                Penulis,
                Pict,
                DataUser
              })}>
                  <Text style={styles.btnDetail} >Beli Sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* kontenHarga */}
          
          </View>
          </ScrollView>
          

          {/* Navbar Bawah */}
          <View style={styles.navBawah}>
            <TouchableOpacity onPress={() => navigation.navigate('Home', {
              DataUser
            })}>
                  <Image
                    style={{width: 22, height:22}}
                    source={require('../assets/btnHomeA.png')}
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
  header:{
    marginTop : 40,
    display : 'flex',
    flexDirection:'row',
    position:'relative',
    // backgroundColor: 'red',
  },
  buttonBack:{
    zIndex:99,
  },
  teksTitle:{
    display:'flex',
    alignItems:'center',
    // backgroundColor:'blue',
    width:"100%",
    position:'absolute',
  },
  teksDaftar:{
    color: "#071D2C",
    fontSize: 20,
    fontWeight : 700,
    marginLeft: 3,
  },
  card:{
    marginTop:20,
    justifyContent:'center',
    alignItems:'center',
  },
  judul:{
    marginTop: 4,
    color: "#28A7CA",
    fontSize: 16,
    fontWeight : 700,
    top: 0,
    marginLeft: 3,
  },
  penulis:{
    color: "#969696",
    fontSize: 12,
    fontWeight : 400,
    marginLeft: 3,
  },
  wrapRating:{
    // backgroundColor: 'red',
    marginTop:20,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  judulTentang:{
    color: "#071D2C",
    fontSize: 16,
    fontWeight : 700,
  },
  isiTeks:{
    color: "#071D2C",
    fontSize: 12,
    fontWeight : 300,
    textAlign:'justify',
  },
  harga:{
    color: "#969696",
    fontSize: 12,
    fontWeight : 700,
  },
  hargaJumlah:{
    color: "#071D2C",
    fontSize: 15,
    fontWeight : 700,
  },
  wrapHarga:{
    // backgroundColor:'red',
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center"
  },
  btnDetail:{
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight : 700,
    backgroundColor:'#28A7CA',
    paddingHorizontal:16,
    paddingVertical:14,
    borderRadius: 6,
  },
  wrapTentang:{
    marginTop:15,
  }
    
});

export default DetailBuku;