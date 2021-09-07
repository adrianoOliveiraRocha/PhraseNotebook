import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    // justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#66c',
    // alignContent: 'center',
  },

  subContainer: {
    flex: 0.3,
    paddingTop: 50
    // marginTop: 30,
  },

  buttonsContainer: {
    flex: 0.5,
    flexDirection: 'column',
    width: 185, height: 250, alignItems: 'stretch',
    justifyContent: 'space-around',
    
  },

  bannerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  button: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 3, borderColor: 'white',
    padding: 5, backgroundColor: '#16a085'
  },

  textButton: {
    color: 'white',
    fontSize: 16,    
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66c',
    // padding: 100
  },

  text: {
    fontSize: 15,
    color: 'white',
    fontWeight: '800',
    margin: 10,
    justifyContent: 'center',
    
  },

  formField: {
    alignItems: 'center',
    padding: 10,
    flexDirection: 'column',
    marginVertical: 20
  },

  formLabel: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },

  formItemInput: {
    width: 300,
    height: 50,
    marginHorizontal: 5,
    borderWidth: 2,
    backgroundColor: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },

  item: {
    backgroundColor: '#1abc9c',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    alignItems: 'center'
  },

  title: {
    fontSize: 18, color: 'white',
    padding: 10
  }

});

export default styles;
