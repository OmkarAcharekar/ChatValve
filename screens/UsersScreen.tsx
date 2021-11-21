import * as React from 'react';
import {StyleSheet,View,FlatList} from 'react-native';
import UserItem from '../components/UserItem';

import Users from '../assets/dummy-data/Users';


export default function UsersScreen() {
  return (
    <View style = {styles.page}>
     <FlatList data = {Users}
     renderItem ={({item}) => <UserItem user ={item} />}
     showsVerticalScrollIndicator ={false}
     />
      

      
    </View>
  );
}
const styles = StyleSheet.create({

  page:{
    flexDirection:"column",
    padding:10,
  }
  
});



