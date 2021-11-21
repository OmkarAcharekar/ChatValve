
import  {View,Text,StyleSheet,FlatList,SafeAreaView, ActivityIndicator} from "react-native"
import React, { useState, useEffect } from 'react';

import Message from "../components/Message";
import { ChatRoom, Message as MessageModel } from "../src/models";

import { Auth, DataStore, SortDirection } from "aws-amplify";
import MessageInput from "../components/MessageInput";
import { useRoute,useNavigation} from '@react-navigation/native';

export default function ChatRoomScreen() {
    const [messages, setMessages] = useState<MessageModel[]>([]);
//   const [messageReplyTo, setMessageReplyTo] = useState<MessageModel | null>(
//     null
//   );
 const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
    const route = useRoute();
    const navigation = useNavigation();
    useEffect(() => {
       
        fetchChatRooms();
      }, []);

      useEffect(() => {
       
         fetchMessages();
 
        
      }, [chatRoom]);


      useEffect(() => {
        const subscription = DataStore.observe(MessageModel).subscribe((msg) => {
          // console.log(msg.model, msg.opType, msg.element);
          if (msg.model === MessageModel && msg.opType === "INSERT") {
            setMessages((existingMessage) => [msg.element, ...existingMessage]);
          }
        });
    
        return () => subscription.unsubscribe();
      }, []);
















      const fetchChatRooms = async() => {
        if(!route.params?.id){
            console.warn("No chat id");
            return;
        }
        const chatRoom = await DataStore.query(ChatRoom,route.params.id);
        // const fetchMessages = await DataStore.query(MessageModel);
       if(!chatRoom){
           console.error("could not")
       }else{
           setChatRoom(chatRoom);

       }
    };

    const fetchMessages = async () => {
        if (!chatRoom) {
          return;
        }
        
        const fetchedMessages = await DataStore.query(
          MessageModel,
          message => message.chatroomID("eq", chatRoom?.id),
          {
            sort: (message) => message.createdAt(SortDirection.DESCENDING)
          }
         );
          setMessages(fetchedMessages);
        
      };
     
  

    console.warn("Displaying" ,route.params?.id)
    navigation.setOptions({title:"Elon Musk"})
    if(!chatRoom){
      return<ActivityIndicator/>
    }
    return (
    <SafeAreaView style ={styles.page}>
    <FlatList data = {messages}
    renderItem ={({item}) => <Message message = {item}/>}
    inverted
    
   
    />
    <MessageInput chatRoom = {chatRoom} />
    
    </SafeAreaView>
        
  )
};

const styles = StyleSheet.create({
    page:{
        backgroundColor:"white",
        flex:1,
    }

})