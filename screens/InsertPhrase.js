import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import Phrase from './../models/Phrase';
import mainStyle from './styles/main'

export default function InsertPhrase({ navigation }) {
  const [phrase, setPhrase] = React.useState('');

  function change(text) {
    setPhrase(text);
  }

  function savePhrase() {
    if(phrase.length > 0) {
      Phrase.insert(phrase)
        .then(result => {
          if(result) {
            ToastAndroid.show('Sua frase foi inserida com sucesso!', ToastAndroid.LONG);
            setPhrase('');
          }
        })
        .catch(error => {
          console.error(error);
          alert(error)
        });
    } else {
      alert('Você não digitou nenhuma frase!');
    }
  }
  
  return (
    <KeyboardAvoidingView 
      bahavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.inner, {backgroundColor: '#66c'}]}>
          <Text style={[styles.header, {color: 'white'}]}>
            Inserir Frase
          </Text>
          <TextInput 
            placeholder="Digite uma frase em inglês" 
            style={styles.textInput}
            value={phrase}
            onChangeText={change}
             />
          
          <View style={[styles.btnContainer, {backgroundColor: '#66c'}]}>
            
            <TouchableOpacity style={mainStyle.button}
              onPress={savePhrase}>
              <Text style={mainStyle.textButton}>Inserir Frase</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[mainStyle.button, {marginTop: 5}]}
              onPress={() => navigation.navigate("Home")}>
              <Text style={mainStyle.textButton}>Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.bannerContainer, {backgroundColor: '#66c'}]}>
        <AdMobBanner
          bannerSize="smartBannerLandscape"
          adUnitID="ca-app-pub-7854818002814670/8223939951"
          servePersonalizedAds={false}
          servePersonalizedAds={true}
          onDidFailToReceiveAdWithError={(error) => console.log(error)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16a085'
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    backgroundColor: 'white',
    textAlign: 'center'
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
