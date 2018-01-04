import { StyleSheet } from 'react-native';
import * as colors from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: colors.blue,
    height: 20
  },
  title: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center'
  },
  button: {
    marginTop: 20
  },
  deckButton:{
    marginTop: 7
  },
  quizButton: {
    marginBottom: 7
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: colors.purple
  },
  textList: {
    color: `${colors.white}`
  }
});