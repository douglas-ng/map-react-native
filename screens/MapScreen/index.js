import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { FontAwesome5 } from '@expo/vector-icons';
import { updateLatLongLocation } from '../../services/Queries';
import styles from './style';

const MapScreen = ({ route, navigation }) => {
  const { customerId, initialRegion: initialRegionFromParams } = route.params;

  const [initialRegion, setInitialRegion] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {    
    const getLocation =  async () => {
      let location;
      if (initialRegionFromParams.latitude === 0 && initialRegionFromParams.longitude === 0) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }
        location = await Location.getCurrentPositionAsync({});
      } else {
        location = {
          coords: {
            latitude: initialRegionFromParams.latitude,
            longitude: initialRegionFromParams.longitude,
          }
        };
      }

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      setMarkerPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getLocation();
  }, [initialRegionFromParams]);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({
      latitude,
      longitude,
    });
  };

  const handleSave = async() => {
    await updateLatLongLocation({
      lat: markerPosition.latitude,
      long: markerPosition.longitude,
      id_customer: customerId
    });
    setModalVisible(true);
    setIsSaved(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    if (isSaved) {
      setIsSaved(false);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onPress={handleMapPress}
        >
          <Marker coordinate={markerPosition} />
        </MapView>
      )}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <FontAwesome5 name="save" size={24} color="white" />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        {markerPosition && (
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={{fontSize:15, color:'red'}}>Successful location update</Text>
              <Text>Latitude: {markerPosition.latitude}</Text>
              <Text>Longitude: {markerPosition.longitude}</Text>
              <Button title="Đóng" onPress={handleCloseModal} />
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
};

export default MapScreen;