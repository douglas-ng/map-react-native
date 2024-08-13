import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetalScreen';
import MapScreen from './screens/MapScreen';
import { createTable, insertIntoTable } from './services/Queries';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const isInitialized = await AsyncStorage.getItem('isDatabaseInitialized');
        if (!isInitialized) {
          await createTable();
          await insertIntoTable();
          await AsyncStorage.setItem('isDatabaseInitialized', 'true');
        }
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    initializeDatabase();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Danh sách sổ ghi' }}/>
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Danh sách khách hàng' }} />
        <Stack.Screen name="Map" component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;