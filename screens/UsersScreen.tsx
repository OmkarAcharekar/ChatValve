import React, { useState, useEffect } from 'react';
import {StyleSheet,View,FlatList} from 'react-native';
import UserItem from '../components/UserItem';

// import Users from '../assets/dummy-data/Users';

import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, User, ChatRoomUser } from "../src/models";
export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);
  // useEffect(() => {
  //  const fetchUsers = async() =>{
  //    const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //  };
  //  fetchUsers();
  // }, []);

  return (
    <View style = {styles.page}>
     <FlatList data = {users}
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



