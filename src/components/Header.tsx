import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from './MyText';

const Header = ({navigation}: any) => {
  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  
  return (
    <View className="w-full bg-black rounded-b-2xl p-4 flex-row items-center justify-end absolute">
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
