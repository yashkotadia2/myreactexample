import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import userReducer from '../slice/user_info'


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware: [thunk]
})

export const persistor = persistStore(store)

