import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import CustomerItem from '../../components/CustomerItem';
import { getCustomers } from '../../services/Queries';
import styles from './style';

const DetailScreen = ({ route, navigation }) => {
  const [listCustomers, setListCustomers] = useState([]);
  const { id } = route.params;

  async function fetchCustomers() {
    const allCustomers = await getCustomers(id);
    setListCustomers(allCustomers);
  }

  useEffect(() => {
    async function initialize() {
      await fetchCustomers();
    }
    initialize();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCustomers();
    }, [id])
  );

  const renderCustomer = ({ item }) => (
    <CustomerItem
      item={item}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={listCustomers}
        renderItem={renderCustomer}
        keyExtractor={item => item.id_customer.toString()}
      />
    </View>
  );
};

export default DetailScreen;