import firebase from 'firebase/app';
import 'firebase/storage';
import { config } from '../config'

firebase.initializeApp(config.firebaseConfig);
const storage = firebase.storage();

export {
  storage, firebase as default
}
