import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ImagePopup from '../ImagePopup';
import { loadImages } from '../../services/Queries';
import styles from './style';

const CustomerItem = ({ item, navigation }) => {
  const [images, setImages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const loadedImages = await loadImages(item.id_customer);
        setImages(loadedImages);
      } catch (error) {
        console.error('Error loading images: ', error);
      }
    };

    fetchImages();
  }, [modalVisible]);

  const handleCam = () => {
    setModalVisible(true);
  };
  
  return (
    <View style={styles.customerItem}>
      <View style={styles.customerContainer}>
        <View style={styles.customerInfoContainer}>
          <Text style={styles.customerName}>{item.name}</Text>
          <Text style={styles.customerDetails}>Latitude: {item.lat}</Text>
          <Text style={styles.customerDetails}>Longitude: {item.long}</Text>
        </View>
  
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCam}>
            <MaterialCommunityIcons style={styles.iconCam} name="camera-plus" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate('Map', {
                customerId: item.id_customer,
                initialRegion: {
                  latitude: item.lat || 0,
                  longitude: item.long || 0,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },
              })
            }
          >
            <FontAwesome5 style={styles.iconLocation} name="map-marker-alt" size={20} />
          </TouchableOpacity>
        </View>
      </View>
  
      <FlatList
        data={images}
        keyExtractor={(imageItem) => imageItem.id_image.toString()}
        horizontal={true}
        renderItem={({ item: imageItem }) => (
          <Image source={{ uri: imageItem.uri }} style={styles.imagePreview} />
        )}
        style={styles.imageList}
      />
  
      <ImagePopup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        customerId={item.id_customer}
      />
    </View>
  );  
};

export default CustomerItem;