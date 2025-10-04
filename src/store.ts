import {createStore} from 'redux' 
import {weatherReducer} from './reducers'

const store = createStore(weatherReducer)

export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']