import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from '../components/MyText';
import MyTextBold from '../components/MyTextBold';

const Login = ({navigation}: any) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      let checkToken = await AsyncStorage.getItem('token');
      if (checkToken) {
        navigation.navigate('Home');
      }
      // console.log(checkToken, 'ooooooooooooo')
    };
    if (AsyncStorage) {
      getToken();
    }
  }, []);

  const handleLogin = async () => {
    try {
      if (!email.value) {
        setEmail(prev => ({...prev, error: 'Invalid email address'}));
        return;
      }
      if (!password.value) {
        setPassword(prev => ({...prev, error: 'Invalid password'}));
        return;
      }

      console.log(`${API_URL}/auth/login`);
      setIsLoading(true);
      let checkUser = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      let data = await checkUser.json();
      setIsLoading(false);
      if (!data.success) {
        if (data.errorCode == 'ERR_INVALID_EMAIL') {
          setEmail(prev => ({...prev, error: 'Email address not found'}));
        } else if (data.errorCode == 'ERR_INVALID_PASSWORD') {
          setPassword(prev => ({...prev, error: 'Wrong password'}));
        }
      }

        await AsyncStorage.setItem('token', data.data.accessToken);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data));
        navigation.navigate('Home');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <View className="w-full h-full items-center justify-center">
      <View className="w-full p-10">
        <MyTextBold className="text-center w-full text-gray-600 px-2 text-4xl">
          Login
        </MyTextBold>
        <MyText className="text-start w-full text-gray-600 px-2 mt-5">
          Email
        </MyText>
        <TextInput
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          className={`border ${
            email.error ? 'border-red-400' : 'border-gray-400'
          } w-full mt-1 rounded-xl text-lg px-2`}
        />
        {email.error && (
          <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
            {email.error}
          </MyText>
        )}
        <MyText className="text-start w-full text-gray-600 px-2 pt-5">
          Password
        </MyText>
        <TextInput
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          secureTextEntry
          className={`border ${
            password.error ? 'border-red-400' : 'border-gray-400'
          } w-full mt-1 rounded-xl text-lg px-2 text-black`}
        />
        {password.error && (
          <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
            {password.error}
          </MyText>
        )}
        <View className="w-full items-end mb-5">
          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordReset')}>
            <MyText className="text-sm text-[#414757] mt-2">
              Forgot your password?
            </MyText>
          </TouchableOpacity>
        </View>
      </View>

      <View className="w-full p-10 py-5 bg-black rounded-t-2xl absolute bottom-0">
        <TouchableOpacity
          className="items-center rounded-xl bg-[#1abc9c] w-full"
          onPress={() => handleLogin()}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" className="p-2" />
          ) : (
            <MyText className="text-white text-xl p-4">Login</MyText>
          )}
        </TouchableOpacity>
        <View className="flex-row mt-2">
          <MyText className="text-white">Don’t have an account? </MyText>
          <TouchableOpacity onPress={() => navigation.replace('Register')}>
            <MyTextBold className="text-white">Sign up</MyTextBold>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
