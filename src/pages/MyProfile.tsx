import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import MyText from '../components/MyText';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env';

const MyProfile = ({navigation}: any) => {
  const [name, setName] = useState({value: '', error: ''});
  const [last, setLast] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [hidePassword, setHidePassword] = useState(true);
  const [date, setDate] = useState({value: new Date(), error: ''});
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(prev => ({...prev, value: currentDate}));
  };

  const saveProfile = async () => {
    try {
      if (!name.value) {
        setName(prev => ({...prev, error: 'Invalid first name'}));
        return;
      }
      if (!last.value) {
        setLast(prev => ({...prev, error: 'Invalid last name'}));
        return;
      }
      if (!phone.value) {
        setPhone(prev => ({...prev, error: 'Invalid phone'}));
        return;
      }
      if (!date.value) {
        setDate(prev => ({...prev, error: 'Invalid date of birth'}));
        return;
      }
      if (!email.value) {
        setEmail(prev => ({...prev, error: 'Invalid email address'}));
        return;
      }
      if (!password.value) {
        setPassword(prev => ({...prev, error: 'Invalid password'}));
        return;
      }
      setIsLoading(true);
      let registerUser = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          img: 's',
          firstName: name.value,
          lastName: last.value,
          phone: phone.value,
          dob: date.value,
          email: email.value,
          password: password.value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });

      let data = await registerUser.json();
      setIsLoading(false);

      if (!data.success) {
        if (data.errorCode == 'ERR_INVALID_EMAIL') {
          setEmail(prev => ({...prev, error: 'Email address not found'}));
          return;
        } else if (data.errorCode == 'ERR_INVALID_PASSWORD') {
          setPassword(prev => ({...prev, error: 'Wrong password'}));
          return;
        } else if (data.errorCode == 'ERR_PHONE_ALREADY_EXISTS') {
          setPhone(prev => ({...prev, error: 'Phone number already exists'}));
          return;
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: data.error,
          });
          return;
        }
      }
      showSuccessToast();
      await AsyncStorage.setItem('token', data.data.accessToken);
      await AsyncStorage.setItem('userData', JSON.stringify(data.data));
      navigation.navigate('Home');
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Saved Successful!',
      text2: 'User information updated successfully',
      visibilityTime: 3000, // 3 seconds
      autoHide: true, // Auto hide after visibilityTime
      //   topOffset: 200, // Adjust if needed
      text1Style: {
        fontSize: 15,
      },
      text2Style: {
        fontSize: 13,
      },
    });
  };

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView className="w-full p-10 mt-14">
        <View className="w-full h-full items-center">
          <Image
            source={require('../assets/logo.jpg')}
            className="w-36 h-36 rounded-full object-cover"></Image>
          <View className="flex-row w-full gap-2">
            <View className="w-[49%]">
              <MyText className="text-start w-full text-gray-600 px-2 mt-5">
                First name
              </MyText>
              <TextInput
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName({value: text, error: ''})}
                className={`border ${
                  name.error ? 'border-red-400' : 'border-gray-400'
                } w-full mt-1 rounded-xl text-lg px-2`}
              />
              {name.error && (
                <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
                  {name.error}
                </MyText>
              )}
            </View>

            <View className="w-[49%]">
              <MyText className="text-start w-full text-gray-600 px-2 mt-5">
                Last name
              </MyText>
              <TextInput
                returnKeyType="next"
                value={last.value}
                onChangeText={text => setLast({value: text, error: ''})}
                className={`border ${
                  last.error ? 'border-red-400' : 'border-gray-400'
                } w-full mt-1 rounded-xl text-lg px-2`}
              />
              {last.error && (
                <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
                  {last.error}
                </MyText>
              )}
            </View>
          </View>
          <MyText className="text-start w-full text-gray-600 px-2 mt-5">
            Phone
          </MyText>
          <TextInput
            returnKeyType="next"
            keyboardType="numeric"
            value={phone.value}
            onChangeText={text => setPhone({value: text, error: ''})}
            className={`border ${
              phone.error ? 'border-red-400' : 'border-gray-400'
            } w-full mt-1 rounded-xl text-lg px-2`}
          />
          {phone.error && (
            <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
              {phone.error}
            </MyText>
          )}
          <MyText className="text-start w-full text-gray-600 px-2 mt-5">
            Date of birth
          </MyText>

          <View>
            {show && (
              <DateTimePicker
                value={date.value}
                mode="date"
                display="default" // For iOS: 'spinner', 'calendar', or 'compact'
                onChange={onChange}
              />
            )}
          </View>

          <TouchableOpacity
            className="border border-gray-400 bg-gray-200 w-full mt-1 rounded-xl text-lg p-3"
            onPress={() => setShow(true)}>
            <MyText className="text-center">
              {date.value ? date.value.toLocaleDateString() : 'Choose date'}
            </MyText>
            {date.error && (
              <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full">
                {email.error}
              </MyText>
            )}
          </TouchableOpacity>

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
          <View className="relative w-full">
            <MyText className="text-start w-full text-gray-600 px-2 pt-5">
              Password
            </MyText>

            <View className="mb-20">
              <TextInput
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ''})}
                secureTextEntry={hidePassword}
                className={`border ${
                  password.error ? 'border-red-400' : 'border-gray-400'
                } w-full mt-1 rounded-xl text-lg px-2 text-black`}
              />
              {password.error && (
                <MyText className="text-red-500 text-sm px-2 text-start mt-1 w-full absolute bottom-[50]">
                  {password.error}
                </MyText>
              )}
              <TouchableOpacity
                className="p-2 rounded-full absolute right-2 top-3"
                onPress={() => setHidePassword(!hidePassword)}>
                <Icon
                  name={hidePassword ? 'eye' : 'eye-off'}
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="w-full p-10 py-5 bg-black rounded-t-2xl">
        <TouchableOpacity
          className="items-center rounded-xl bg-white w-full"
          //   onPress={handleRegister}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="black" className="p-2.5" />
          ) : (
            <MyText className="text-black text-xl p-4">SAVE</MyText>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MyProfile;
