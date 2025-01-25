import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from './MyText';
import MyTextBold from './MyTextBold';
import {useRoute} from '@react-navigation/native';

const Header = ({navigation}: any) => {
  const route = useRoute();
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <View className="w-full bg-black rounded-b-2xl p-4 flex-row items-center justify-between absolute">
      {route.name === 'MyProfile' ? (
        <TouchableOpacity
          className="p-2 rounded-2xl bg-white/30 flex-row gap-2 justify-center items-center"
          onPress={() => navigation.goBack()}>
          <Icon name="left" size={15} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="flex-row gap-2 items-center"
          onPress={() => navigation.navigate('MyProfile')}>
          <Image
            source={require('../assets/logo.jpg')}
            className="w-10 h-10 rounded-full object-cover"></Image>
          <View className="flex-col">
            <MyTextBold className="text-white">Username</MyTextBold>
            <MyText className="text-gray-300 text-sm mt-[-5]">Email</MyText>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        className="p-2 rounded-2xl bg-red-500/80 flex-row gap-2 justify-center items-center"
        onPress={() => handleLogout()}>
        <Icon name="logout" size={15} color="white" />
        <MyText className="text-white">Logout</MyText>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
