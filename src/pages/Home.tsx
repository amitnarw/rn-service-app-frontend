import {Modal, TouchableOpacity, Text, View} from 'react-native';
import React from 'react';
import {Linking} from 'react-native';
import {useModal} from '../custom-hooks/useModal';
import CustomModal from '../components/CustomModal';
import Header from '../components/Header';
import MyText from '../components/MyText';
import MyTextBold from '../components/MyTextBold';

const Home = ({navigation}: any) => {
  const {isVisible, showModal, hideModal} = useModal();

  const handleUPIPayment = async () => {
    const upiURL =
      'upi://pay?pa=amitnarwal115@oksbi&pn=Receiver%20Amit&tid=Txn123456&am=1&tn=Payment%20for%20services&cu=INR';

    try {
      // Directly try to open the URL without canOpenURL check
      await Linking.openURL(upiURL);
      console.log('UPI Payment initiated');
    } catch (error) {
      showModal();
      console.error('Error opening UPI', error);
    }
  };

  return (
    <>
      <Header navigation={navigation}/>
      <View className="w-full h-full justify-center items-center">
        <Modal
          visible={isVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={hideModal}>
          <CustomModal
            hideModal={hideModal}
            title="No UPI App found"
            description="Please install any UPI app for this payment"
          />
        </Modal>
        <MyTextBold className="text-4xl text-gray-800">Service App</MyTextBold>
        <View className="flex-row gap-2 w-[80%] mt-5">
          <TouchableOpacity
            className="p-2 py-5 bg-[#1abc9c] rounded-2xl flex-1"
            onPress={() => {
              // navigation.navigate("Tax");
              handleUPIPayment();
            }}>
            <Text className="text-white text-center text-lg">TAX</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 py-5 bg-[#3498db] rounded-2xl flex-1"
            onPress={() => {
              // navigation.navigate("Finance");
              handleUPIPayment();
            }}>
            <MyText className="text-white text-center text-lg">FINANCE</MyText>
          </TouchableOpacity>
          <TouchableOpacity
            className="p-2 py-5 bg-[#34495e] rounded-2xl flex-1"
            onPress={() => {
              // navigation.navigate("Legal");
              handleUPIPayment();
            }}>
            <MyText className="text-white text-center text-lg">LEGAL</MyText>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Home;
