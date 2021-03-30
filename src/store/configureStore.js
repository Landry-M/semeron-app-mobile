import { createStore } from "redux";

//import reducers
import profilReducer from "./reducers/profilReducer";


//reduc immport
import { persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['profilReducer']
};

const store = createStore(persistCombineReducers(rootPersistConfig, { profilReducer }));

export default store;
