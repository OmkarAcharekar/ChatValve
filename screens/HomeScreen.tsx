import React, { useState, useEffect } from 'react';
import {Image, Text ,StyleSheet,View,FlatList} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom,ChatRoomUser } from '../src/models';





export default function TabOneScreen() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  useEffect(() => {
    const fetchChatRooms = async () => {
      const userData = await Auth.currentAuthenticatedUser();
      const chatRooms = (await DataStore.query(ChatRoomUser)).filter(
        (chatRoomUser) => chatRoomUser.user.id === userData.attributes.sub
      ).map((chatRoomUser) => chatRoomUser.chatroom);
      console.log(chatRooms);
      setChatRooms(chatRooms);
    };
    fetchChatRooms();
  }, []);
  return (
    <View style = {styles.page}>
     <FlatList data = {chatRooms}
     renderItem ={({item}) => <ChatRoomItem chatRoom ={item} />}
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



