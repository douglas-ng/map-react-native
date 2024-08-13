import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './style';

const Items = ({ title, households, records, images, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{households} đồng hồ</Text>
    <Text style={styles.subtitle2}>{records} bản ghi và {images} ảnh cần đồng bộ</Text>
  </TouchableOpacity>
);

export default Items;