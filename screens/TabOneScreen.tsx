import * as React from 'react';
import {Image, Text ,StyleSheet,View,FlatList} from 'react-native';
import ChatRoomItem from '../components/ChatRoomItem';

import ChatRoomsData from '../assets/dummy-data/ChatRooms';

const ChatRoom1 = ChatRoomsData[0];
const ChatRoom2 = ChatRoomsData[1];

export default function TabOneScreen() {
  return (
    <View style = {styles.page}>
     <FlatList data = {ChatRoomsData}
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



