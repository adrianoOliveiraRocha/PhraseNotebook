import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import * as Speech from 'expo-speech';

const Phrase = {

  getPhrases: async function() {
    try {
      let phrases = await AsyncStorage.getItem('phrases');
      return JSON.parse(phrases);
    } catch (error) {
      return error;
    }
  },

  getPhrase: async function() { // get just one not used phrase
    try {
      var phrases = await this.getPhrases();
      return phrases;
    } catch (e) {
      return e;
    }
  },

  insert: async function(phrase) {
    let result = await this.getPhrases();
    if(result) { // We have some phrase here
      var lastId;
      var data = [];
      result.forEach((item, i) => {
        lastId = item.id;
        let temp = { id: item.id, text: item.text, used: item.used };
        data.push(item);
      });
      let newPhraseId = parseInt(lastId) + 1;
      var newPhrase = { id: newPhraseId, text: phrase, used: false };
      data.push(newPhrase);
      let stringData = JSON.stringify(data);
      await AsyncStorage.setItem('phrases', stringData);
      return true;
    } else { // The result is null So it is the first phrase
      let data = [{ id: 1, text: phrase, used: false }];
      let stringData = JSON.stringify(data);
      await AsyncStorage.setItem('phrases', stringData);
      return true;
    }
  },

  clear: async function() {
    try {
      await AsyncStorage.removeItem('phrases');
      return true;
    } catch (e) {
      return e;
    }
  },

  init: async function() {
    /* Make all phrases not used */
    try {
      var result = await this.getPhrases();
      var data = [];
      for (let phrase of result) {
        let temp = { id: phrase.id, text: phrase.text, used: false };
        data.push(temp);
      }
      var stringData = JSON.stringify(data);
      await AsyncStorage.setItem('phrases', stringData);
      return;
    } catch(e) {
      return e;
    }
  },

  makeAsUsed: async function(id) {
    var phrases = JSON.parse(await AsyncStorage.getItem('phrases'));
    for (var i in phrases) {
      if(phrases[i].id == id) {
        phrases[i].used = true;
      }
    }
    var stringData = JSON.stringify(phrases);
    await AsyncStorage.setItem('phrases', stringData);
    return true;
  },

  delete: async function(id) {
    var phrases = await this.getPhrases();
    var filtPhrases = phrases.filter(function(item) {
      return item.id != id;
    });
    var newPhrases = JSON.stringify(filtPhrases);
    await AsyncStorage.removeItem('phrases');
    await AsyncStorage.setItem('phrases', newPhrases);
    return true;
  },

  speak(phrase) {
    var options = {
      language: 'en-US',
      pitch: 1.0,
      rate: 1.0,
      onError: (error) => alert('Oops! Tivemos um erro: ' + error),
    };

    Speech.speak(
      phrase,
      options,
    );
  }

}

module.exports = Phrase;
