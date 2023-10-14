import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { NativeWindStyleSheet } from "nativewind";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/HomeScreen';
import MapScreen from './app/MapScreen';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-native-gesture-handler'

const Stack = createNativeStackNavigator()
export default function App() {
  return <SafeAreaView className="flex-1 h-full w-full mt-6">
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator  screenOptions={{headerShown:false}}>
          <Stack.Screen name='HomeScreen' component={HomeScreen}/>
          <Stack.Screen name='MapScreen' component={MapScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  </SafeAreaView>
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
