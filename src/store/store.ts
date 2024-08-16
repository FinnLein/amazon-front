import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { cartSlice } from './cart/cart.slice'
import { userSlice } from './user/user.slice'

const persistConfig = {
	key: 'amazonV2',
	storage,
	whiteList: ['cart']
}

const rootReducer = combineReducers({
	user: userSlice.reducer,
	cart: cartSlice.reducer
})

const PersistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: PersistedReducer,
	middleware: getDefaultModdleware =>
		getDefaultModdleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
			}
		})
})

export const persistor = persistStore(store)

export type TypeRootState = ReturnType<typeof rootReducer>
