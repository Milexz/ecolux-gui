import React from 'react';
import {
  initState as initUserState,
  userInfoReducer,
} from '../Reducers/UserInfoReducer';


const GlobalContext = React.createContext();

const GlobalStoreProvider = (props) => {
  const {children} = props;
  const [user, dispatchUserInfo] = React.useReducer(userInfoReducer, initUserState);

  const value = {
    user,
    dispatchUserInfo,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};


const useUserInfo = () => {
  const context = React.useContext(GlobalContext);
  if(context === undefined) {
    throw new Error('useUserInfo must be used within a GlobalStoreProvider');
  }

  return [context.user, context.dispatchUserInfo];
};


export {
  GlobalStoreProvider,
  useUserInfo,
};
