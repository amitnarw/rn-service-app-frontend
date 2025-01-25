import { View, Text, Image, TextInput, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import MyTextBold from '../components/MyTextBold'
import MyText from '../components/MyText'

const PasswordReset = ({ navigation }: any) => {
  const [email, setEmail] = useState({ value: '', error: '' })

  return (
    <View className='w-full h-full items-center justify-center p-10'>
      <MyTextBold className="text-center w-full text-gray-600 px-2 text-4xl">
          Password reset
        </MyTextBold>
      <MyText className='text-start w-full text-gray-600 px-2 mt-10'>Email</MyText>
      <TextInput
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        className='border border-gray-400 w-full mt-1 rounded-xl text-lg px-2'
      />

      <TouchableOpacity className='p-4 items-center rounded-xl bg-[#3498db] w-full mt-10'>
        <MyText className='text-white text-xl'>Reset Password</MyText>
      </TouchableOpacity>
      <View className='flex-row mt-2'>
        <MyText>Already have an account? </MyText>
        <TouchableOpacity onPress={() => navigation.replace('Login')}>
          <MyTextBold>Login</MyTextBold>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PasswordReset;