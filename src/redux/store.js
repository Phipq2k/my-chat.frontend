import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./reducers/auth-reducer";
import toastReducer from "./reducers/toast-reducer";
import loadingReducer from "./reducers/loadingFetch-reducer";
import conversationReducer from "./reducers/conversation-reducer";
import messageReducer from "./reducers/message-reducer";
import fileReducer from "./reducers/file-reducer";
import userReducer from "./reducers/user-reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    authReducer,
    toastReducer,
    loadingReducer,
    conversationReducer,
    messageReducer,
    fileReducer,
    userReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;