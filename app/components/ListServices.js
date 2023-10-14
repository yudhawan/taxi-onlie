import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import CarIcon from '../../assets/car.png'
import PackageIcon from '../../assets/package.png'

const ListServices = ({navigation,disabled}) => {
  return (
    <View className="flex-row flex-wrap gap-2 mt-2">
      <TouchableOpacity className={`bg-[#eee] rounded-xl p-8 flex-col justify-center items-center ${disabled?'opacity-50':''}`} onPress={()=>navigation.navigate('MapScreen')} disabled={disabled}>
        <Image source={CarIcon} className="w-24 h-16" />
        <Text className="text-xl">Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`bg-[#eee] rounded-xl p-8 flex-col justify-center items-center ${disabled?'opacity-50':''}`} disabled={disabled}>
        <Image source={PackageIcon} className="w-16 h-16" />
        <Text className="text-xl">Package</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListServices