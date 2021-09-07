import React from 'react';
import { View, Text, ToastAndroid, Image, TouchableOpacity } from 'react-native';
import styles from './styles/main';
import Phrase from './../models/Phrase';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { AdMobBanner } from 'expo-ads-admob';

function Home({ navigation }) {

  function init() {
    Phrase.init()
      .then(() => {
        ToastAndroid.show('Reiniciado com sucesso', ToastAndroid.SHORT);
      })
      .catch(e => {
        alert(e);
      })
  }

  function linkSite() {
    var url = 'https://sites.google.com/view/phrases-book/home';
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>

      <View style={styles.subContainer}>
        <Image style={{width: 350, height: 154}}
          source={require('./../assets/logo-ep.png')} />
      </View>

      <View style={styles.buttonsContainer}>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Dê-me uma Frase")}>
          <Text style={styles.textButton}>Dê-me uma frase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Inserir Frase")}>
          <Text style={styles.textButton}>Inserir Frase</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate("Todas")}>
          <Text style={styles.textButton}>Todas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={init}>
          <Text style={styles.textButton}>Reiniciar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}
          onPress={linkSite}>
          <Text style={styles.textButton}>Sobre</Text>
        </TouchableOpacity>

      </View>
      
      <View style={styles.bannerContainer}>

        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID="ca-app-pub-7854818002814670/8223939951"
          servePersonalizedAds={false}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(error) => console.log(error)}
        />

      </View>
      
    </View>
  );
}

export default Home;
