import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { saveImage} from '../../services/Queries';
import styles from './style'

const ImagePopup = ({ modalVisible, setModalVisible, customerId }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const pickImage = async() => {
    let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        const { fileName, uri } = result.assets[0];
        setSelectedImages([...selectedImages, { filename: fileName, uri: uri }]);
      }
    } else {
      alert('Permission to access media library denied');
      return;
    }
  }

  const takePhoto = async () => {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.canceled) {
        const { fileName, uri } = result.assets[0];
        setSelectedImages([...selectedImages, { filename: fileName, uri: uri }]);
      }
    } else {
      alert('Permission to access camera denied');
      return;
    }
  };

  const handleSave = async () => {
    try {
      await saveImage(selectedImages, customerId);
      setSelectedImages([]);
      setModalVisible(false);
      alert('Images saved successfully');
    } catch (error) {
      console.error('Error saving images: ', error);
      alert('Error saving images');
    }
  };

  const handleDeleteImage = (uriToDelete) => {
    setSelectedImages(selectedImages.filter(image => image.uri !== uriToDelete));
  };

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Ionicons style={styles.buttonIcon} name="albums-outline" size={50} />
              <Text style={styles.buttonText}>Thư viện ảnh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Ionicons style={styles.buttonIcon} name="camera-outline" size={50} />
              <Text style={styles.buttonText}>Chụp ảnh</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={selectedImages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item.uri }} style={styles.imagePreview} />
                <TouchableOpacity 
                  style={styles.deleteButton} 
                  onPress={() => handleDeleteImage(item.uri)}
                >
                  <Feather style={styles.deleteButtonText} name="x" size={12} color="black" />
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
          />

          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.btnText}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePopup;