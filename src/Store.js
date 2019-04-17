import { createStore, combineReducers, compose } from "redux";
import firebase from 'firebase/app';
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
//Reducers
import notifyReducer from './reducers/notifyReducer';
import settingsReducer from './reducers/settingsReducer'

const firebaseConfig = {
  apiKey: "AIzaSyBprbChRzGIncTM5vA3a3ienxBE7ubBGDI",
  authDomain: "reactclientpanel-50633.firebaseapp.com",
  databaseURL: "https://reactclientpanel-50633.firebaseio.com",
  projectId: "reactclientpanel-50633",
  storageBucket: "reactclientpanel-50633.appspot.com",
  messagingSenderId: "236730041204"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//initialize firebase instance
firebase.initializeApp(firebaseConfig);

//initialize firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

// check for settings in local storage
if(localStorage.getItem('settings') == null) {
  //set Default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  }

  // set to localStorage
  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

// create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};

//create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
