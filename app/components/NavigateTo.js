import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setCurrent, setDestination } from '../../features/locationSlice';
import { useDispatch } from 'react-redux';
import NavigationFavorite from './NavigationFavorite';

const NavigateTo = ({navigation}) => {
    const dispatch = useDispatch()
  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold text-center">Choose a trip</Text>
        <GooglePlacesAutocomplete
            placeholder='Where to ?'
            nearbyPlacesAPI='GooglePlacesSearch'
            styles={{
            container:{
                marginTop:8,
                flex:0,
                width:'100%'
            },
            textInput:{
                backgroundColor:'#e1e1e3',
                fontSize:20
            }
            }}
            enablePoweredByContainer={false}
            debounce={500}
            textInputProps={{onChangeText:text=>{
              if(!text) dispatch(setDestination(null))
            }}}
            onPress={(data, details=null) => {
              dispatch(setDestination({location:details.geometry.location,description:data.description}));
              navigation.navigate('rideTo')
            }}
            fetchDetails
            query={{
            key: process.env.GOOGLE_TOKEN,
            language: 'en',
            }}
        />
        <NavigationFavorite/>
    </View>
  )
}

export default NavigateTo