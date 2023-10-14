import { View, Text } from 'react-native'
import React, { useState,useRef, useEffect } from 'react'
import MapView, { Marker, } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useDispatch, useSelector } from 'react-redux'
import { setTimeInformation } from '../../features/locationSlice'
const Map = () => {
    const {current,destination} = useSelector(state=>state.locationState)
    const [moveMarker,setMoveMarker] = useState(null)
    const dispatch = useDispatch()
    const mapRef=useRef()
    const regionChange = (region)=>{
        if(!destination) setMoveMarker(region)
    }
    useEffect(()=>{
        if(!current || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['current','destination'],{
            edgePadding:{
                top:50,
                left:50,
                bottom:50,
                right:50,
            }
        })
    },[current,destination,regionChange])
    useEffect(()=>{
        async function getTravelTime(){
            const data = await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination?.description}&origins=${current?.description}&units=imperial&key=${process.env.GOOGLE_TOKEN}`)
            const docs = await data.json()
            dispatch(setTimeInformation(docs?.rows[0]?.elements))
        }
        getTravelTime()
    },[current,destination])
  return (
    <MapView
        ref={mapRef} 
        mapType='terrain'
        style={{flex:1}} 
        initialRegion={{
            longitude:moveMarker?moveMarker.longitude:current?.location?.lng,
            latitude:moveMarker?moveMarker.latitude:current?.location?.lat,
            longitudeDelta:moveMarker?moveMarker.longitudeDelta:0.005,
            latitudeDelta:moveMarker?moveMarker.latitudeDelta:0.005
        }} 
        onRegionChange={regionChange}
        >
            {current&&destination&&<MapViewDirections 
                origin={{
                    latitude:current?.location?.lat,
                    longitude:current?.location?.lng
                }}
                destination={{
                    longitude:destination?.location?.lng,
                    latitude:destination?.location?.lat,
                }}
                apikey={process.env.GOOGLE_TOKEN}
                strokeWidth={3}
                strokeColor='orange'
             />}
            {current&&<Marker coordinate={{
                longitude:moveMarker?moveMarker.longitude:current?.location.lng,
                latitude:moveMarker?moveMarker.latitude:current?.location?.lat
            }} title='Current' identifier='current' description={current?.description} />}
            {destination&&<Marker coordinate={{
                longitude:destination?.location?.lng,
                latitude:destination?.location?.lat
            }} title='Destination' identifier='destination' />
            }
    </MapView>
  )
}

export default Map