import React, { useEffect, useState } from 'react'
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Tax from './pages/Tax';
import { NavigationContainer } from '@react-navigation/native';
import Finance from './pages/Finance';
import Legal from './pages/Legal';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import MyProfile from './pages/MyProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState("");
  useEffect(()=>{
    const getToken = async () => {
        let checkToken = await AsyncStorage.getItem('token');
        if(checkToken){
          setToken(checkToken)
        }
        // console.log(checkToken, 'ooooooooooooo')
    }
    if(AsyncStorage){
        getToken();
    }
}, [])
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName={token ? 'Home' : 'Login'} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tax" component={Tax} />
        <Stack.Screen name="Finance" component={Finance} />
        <Stack.Screen name="Legal" component={Legal} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="MyProfile" component={MyProfile} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}

export default App;