import { View, Text, Image } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrent} from '../features/locationSlice'
import ListServices from './components/ListServices'
import NavigationFavorite from './components/NavigationFavorite';

const HomeScreen = (props) => {
  const dispatch = useDispatch()
  const {current} =useSelector(state=>state.locationState)
  return (
    <View className="w-full h-full bg-white p-6">
      <View className='flex-row'>
        <Text className="text-[40px] text-orange-500 font-bold" >WB</Text>
        <Text className="text-[40px] text-blue-950 font-bold" >Car</Text>
      </View>
      <Text className="mt-8 text-2xl text-gray-700 font-semibold">Go anywhere, get anything</Text>
      <GooglePlacesAutocomplete
        placeholder='Where from ?'
        nearbyPlacesAPI='GooglePlacesSearch'
        styles={{
          container:{
            marginTop:8,
            flex:0
          },
          textInput:{
            backgroundColor:'#e1e1e3',
            fontSize:20
          }
        }}
        textInputProps={{onChangeText:text=>{
          if(!text) dispatch(setCurrent(null))
        }}}
        debounce={500}
        enablePoweredByContainer={false}
        onPress={(data, details=null) => {
          dispatch(setCurrent({location:details.geometry.location,description:data.description}));
        }}
        fetchDetails
        query={{
          key: process.env.GOOGLE_TOKEN,
          language: 'en',
        }}
      />
      <ListServices {...props} disabled={!current} />
      <NavigationFavorite/>
    </View>
  )
}

export default HomeScreen