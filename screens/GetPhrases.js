import React from 'react';
import { View, Text, FlatList, SafeAreaView, ToastAndroid,
  TouchableOpacity } from 'react-native';
import styles from './styles/main';
import Phrase from './../models/Phrase';
import { AntDesign } from '@expo/vector-icons';

function Item({ item }) {
  function initializing() {
    ToastAndroid.show('iniciando...', ToastAndroid.SHORT);
    speak();
  }

  function speak() {
    Phrase.speak(item.title);
  }

  return (
    <TouchableOpacity style={styles.item} onPress={initializing}>
      <Text style={styles.title}>{item.title}</Text>
      <AntDesign name="play" size={24} color="white" onPress={initializing} />
    </TouchableOpacity>
  );

}

function GetPhrases({ navigation }) {

  function renderItem({ item }) {
    return (
      <Item item={item} />
    );
  }

  const [data, setData] = React.useState([]);
  // use async operation with automatic abortion on unmount
  (function useAsync(asyncFn, onSuccess) {
    React.useEffect(() => { //useEffects means: We need to do something after render
      let isMounted = true;
      Phrase.getPhrases() // my effect
        .then(result => {
          if(isMounted) {
            var arrayTemp=[];
            result.forEach((item) => {
              arrayTemp.push({key: `${item.id}`, title: item.text});
            });
            setData(arrayTemp);
          }
        })
        .catch(e => {
          alert("Você não tem nenhuma frase cadastrada");
        });
    }, [asyncFn, onSuccess]);
  })();

  return (
    <SafeAreaView style={styles.formContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

export default GetPhrases;
