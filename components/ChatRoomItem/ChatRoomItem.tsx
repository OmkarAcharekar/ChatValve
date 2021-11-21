import { useNavigation } from '@react-navigation/native';
import  React ,{ useState, useEffect } from 'react';
import {Image, Text,Pressable ,StyleSheet,View, ActivityIndicator} from 'react-native';
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUser,User,Message } from '../../src/models';


import styles from './styles';

export default function ChatRoomItem({chatRoom}) {
  // const [users, setUsers] = useState<User[]>([]); // the display user
  const [user, setUser] = useState<User|null>(null); // the display user
  const [lastMessage, setLastMessage] = useState<Message|undefined>(); // the display user
  
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = (await DataStore.query(ChatRoomUser))
        .filter((chatRoomUser) => chatRoomUser.chatroom.id === chatRoom.id)
        .map((chatRoomUser) => chatRoomUser.user);

      // setUsers(fetchedUsers);
      
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(
        fetchedUsers
      );
      setUser(
        fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
      );
      // setIsLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!chatRoom.chatRoomLastMessageId) {
      return;
    }
    DataStore.query(Message, chatRoom.chatRoomLastMessageId).then(
      setLastMessage
    );
  }, []);

  const onPress = () =>{

    navigation.navigate("ChatRoom",{id:chatRoom.id});
   

  }
  if(!user){
    
    return <ActivityIndicator/>
  }
  
  return (
    <Pressable onPress={onPress} style = {styles.container}>
    <Image source ={{
      uri:user.imageUri}}

   style={styles.image}/>
   {!!chatRoom.newMessages && <View style = {styles.badgeContainer}>
     <Text style = {styles.badgeText}>{chatRoom.newMessages}</Text>

   </View>}
    <View style={styles.rightContainer}>
      <View style = {styles.row}>
        <Text style = {styles.name}>{user.name} </Text>
        <Text style = {styles.text}>{lastMessage?.createdAt}</Text>
      </View>
      <Text  numberOfLines={1} style = {styles.text}>{lastMessage?.content}</Text>
    </View>

  </Pressable>
  );
}





