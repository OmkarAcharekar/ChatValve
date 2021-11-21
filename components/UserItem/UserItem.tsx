import { useNavigation } from '@react-navigation/native';
import  React from 'react';
import {Image, Text,Pressable ,StyleSheet,View} from 'react-native';
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom } from '../../src/models';

import styles from './styles';
import { User,ChatRoomUser } from '../../src/models';

export default function  UserItem({user}) {
 
  const navigation = useNavigation();
  const onPress = async() => {

    const newChatRoom = await DataStore.save(new ChatRoom({newMessages : 0}));

    const authUser  = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User,authUser.attributes.sub);
    console.log(dbUser);
    await DataStore.save(new ChatRoomUser({
      user:dbUser,
      chatroom:newChatRoom
    }))
   
    await DataStore.save(new ChatRoomUser({
      user,
      chatroom:newChatRoom
    }))

    navigation.navigate('ChatRoom',{ id: newChatRoom.id});

   
   

  }
  
  return (
    <Pressable onPress={onPress} style = {styles.container}>
    <Image source ={{
      uri:user.imageUri}}

   style={styles.image}/>
   
    <View style={styles.rightContainer}>
      <View style = {styles.row}>
        <Text style = {styles.name}>{user.name} </Text>
      
      </View>
     
    </View>

  </Pressable>
  );
}





