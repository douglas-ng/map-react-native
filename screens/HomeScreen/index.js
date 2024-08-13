import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Items from '../../components/Items';
import { getRecords } from '../../services/Queries';
import styles from './style';

const HomeScreen = ({ navigation }) => {
  const [userRecords, setUserRecords] = useState([]);

  async function showRecords() {
    const allRecords = await getRecords();
    setUserRecords(allRecords);
  }

  useEffect(() => {
    async function initialize() {
      await showRecords();
    }
    initialize();
  }, []);

  const renderItem = ({ item }) => (
    <Items
      title={item.title}
      households={item.households}
      records={item.records}
      images={item.images}
      onPress={() => navigation.navigate('Detail', { id: item.id_soghi })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userRecords}
        renderItem={renderItem}
        keyExtractor={item => item.id_soghi.toString()}
      />
    </View>
  );
};

export default HomeScreen;  