import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';

const CustomModal = ({hideModal, title, description}:any) => {
    return (
        <View className='w-full h-full bg-black/40'>
            <View className='w-[60%] rounded-xl bg-white p-4 m-auto items-center gap-5'>
                <Icon name="exclamationcircleo" size={50} className='!text-red-400' />
                <View className='items-center gap-1'>
                    <Text className='text-xl font-bold'>{title}</Text>
                    <Text className='text-gray-500 text-center'>{description}</Text>
                </View>
                <TouchableOpacity className='p-4 items-center rounded-xl bg-[#34495e] w-full'
                onPress={()=>hideModal()}
                >
                    <Text className='text-white text-xl'>OK</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CustomModal;