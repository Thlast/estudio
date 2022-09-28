// import React, { Children, createContext, useState, useContext } from 'react';

// export const userContext = createContext();

// // const Provider = userContext.Provider;
// // export const authContext = createContext();

// export const useAuth = () => {
//   const context = useContext(userContext);
//   if (!context) throw new Error("There is no Auth provider");
//   return context; 
// };

// export const UserContextProvider = (props) => {
//   const [userLogin, setUserLogin] = useState(localStorage.getItem('login'));
//   const [userInfo, setUserInfo] = useState(
//     JSON.parse(localStorage.getItem('user'))
//   );

//   const loginUser = (user) => {
//     setUserLogin(true);
//     localStorage.setItem('login', true);
//     setUserInfo(user);
//     localStorage.setItem('user', JSON.stringify(user));
//   };
//   const logoutUser = () => {
//     setUserLogin(false);
//     localStorage.removeItem('login');
//     setUserInfo();
//     localStorage.removeItem('user');
//   };

//   return (
//     <userContext.Provider value={{ userLogin, loginUser, logoutUser, userInfo }}>
//       {props.children}
//     </userContext.Provider>
//   );
// };
