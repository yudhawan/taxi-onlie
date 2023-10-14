import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BackIcon from '../assets/chevronLeft.png'
import Map from './components/Map'
import NavigateTo from './components/NavigateTo'
import RideTo from './components/RideTo'
const Stack = createNativeStackNavigator()
const MapScreen = (props) => {
  
  return (
    <View>
      <View className="h-1/2">
        <Map {...props}/>
      </View>
      <View className="bg-white h-1/2 flex-col justify-center">
        <Stack.Navigator screenOptions={{headerShown:false,headerShadowVisible:false}}>
          <Stack.Screen name='navigateTo' component={NavigateTo}  />
          <Stack.Screen name='rideTo' component={RideTo} />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen