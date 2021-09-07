import React from 'react';
import { View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import styles from './styles/main';
import Phrase from './../models/Phrase';
import { AntDesign } from '@expo/vector-icons';

function GetPhrase({ navigation }) {
  const [phrase, setPhrase] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [phraseExists, setPhraseExists] = React.useState(true);

  function initializing() {
    ToastAndroid.show('iniciando...', ToastAndroid.SHORT);
    speak();
  }

  function speak() {
    Phrase.speak(phrase);
  }

  function choosePhrase(phrases) {
    var choosedPhrase = null;

    for (var i in phrases) {
      if(!phrases[i].used) {
        choosedPhrase = phrases[i].text;
        setId(phrases[i].id);
        break;
      }
    }

    if(choosedPhrase) setPhrase(choosedPhrase);
    else {
      setPhrase("Você não tem nehuma frase na fila. "
      +"Na tela inicial, você pode reiniciar ou inserir mais frases");
      setPhraseExists(false);
    }
    makeAsUsed();

  }

  function makeAsUsed() {
    Phrase.makeAsUsed(id)
      .then(result => {
        console.log(result);
      })
      .catch(e => {
        alert(e);
      });
  }

  async function deletePhrase() {
    Phrase.delete(id)
      .then(result => {
        if(result) {
          setPhrase('');
          alert("Frase deletada com sucesso!");
        }
      })
      .catch(e => {
        alert(e);
      });
  }

  (function() {
    Phrase.getPhrase()
      .then(phrases => {
        choosePhrase(phrases);
      })
      .catch(e => {
        alert(e);
      })
  })();

  function nextOne() {
    Phrase.getPhrase()
      .then(phrases => {
        choosePhrase(phrases);
      })
      .catch(e => {
        alert(e);
      })
  }

  if(id && phraseExists) {
    return (
      <View style={styles.formContainer}>

        <TouchableOpacity style={styles.item} onPress={initializing}>
          <Text style={styles.title}>{phrase}</Text>
          <AntDesign name="play" size={24} color="white" onPress={initializing} />
        </TouchableOpacity>

        <View style={[styles.buttonsContainer, {height: 180}]}>

          <TouchableOpacity style={styles.button}
            onPress={nextOne}>
            <Text style={styles.title}>Próxima</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Home")}>
            <Text style={styles.title}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {backgroundColor: '#aa3344'}]}
            onPress={deletePhrase}>
            <Text style={styles.title}>Deletar Frase</Text>
          </TouchableOpacity>

        </View>

      </View>
    );
  } else {
    return (
      <View style={styles.formContainer}>
        <View style={styles.formField}>
          <Text style={[styles.formLabel]}>{phrase}</Text>
        </View>
        <View style={[styles.buttonsContainer, {height: 100}]}>
          <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate("Home")}>
            <Text style={styles.title}>Home</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

export default GetPhrase;
