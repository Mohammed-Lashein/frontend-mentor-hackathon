import { applyMiddleware, createStore } from 'redux'
import { weatherReducer } from './reducers'
import { composeWithDevTools } from '@redux-devtools/extension'
import { thunk } from 'redux-thunk'

export const store = createStore(weatherReducer, composeWithDevTools(applyMiddleware(thunk)))

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
