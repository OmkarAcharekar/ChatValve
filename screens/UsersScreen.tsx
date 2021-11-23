import React, { useState, useEffect } from 'react';
import {StyleSheet,View,FlatList,Text,Pressable,SafeAreaView} from 'react-native';
import UserItem from '../components/UserItem';

// import Users from '../assets/dummy-data/Users';
import { Auth, DataStore } from "aws-amplify";
import NewGroupButton from '../components/NewGroupButton';
import { ChatRoom, User, ChatRoomUser } from "../src/models";
import { useNavigation } from '@react-navigation/native';
export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation();
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  useEffect(() => {
    DataStore.query(User).then(setUsers);
  }, []);


  const addUserToChatRoom = async (user, chatroom) => {
    DataStore.save(new ChatRoomUser({ user, chatroom }));
  };
  const isUserSelected = (user) => {
    return selectedUsers.some((selectedUser) => selectedUser.id === user.id);
  };
  const onUserPress = async (user) => {
    if (isNewGroup) {
      if (isUserSelected(user)) {
        // remove it from selected
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    } else {
      await createChatRoom([user]);
    }
  };


  const createChatRoom = async(users) => {

    const newChatRoom = await DataStore.save(new ChatRoom({newMessages : 0}));

    const authUser  = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User,authUser.attributes.sub);
    if(dbUser){
      await addUserToChatRoom(dbUser,newChatRoom)
      
    }
    
   
   await Promise.all(users.map((user) => addUserToChatRoom(user,newChatRoom)
   
  ));
   

    navigation.navigate('ChatRoom',{ id: newChatRoom.id});





  }

  const saveGroup = async () => {
    await createChatRoom(selectedUsers);
  };




  // useEffect(() => {
  //  const fetchUsers = async() =>{
  //    const fetchedUsers = await DataStore.query(User);
  //     setUsers(fetchedUsers);
  //  };
  //  fetchUsers();
  // }, []);

  return (
    <SafeAreaView style = {styles.page}>
     <FlatList data = {users}
     renderItem ={({item}) => <UserItem user={item}
     onPress={() => onUserPress(item)}
     isSelected={isNewGroup ? isUserSelected(item) : undefined}/>}
     showsVerticalScrollIndicator ={false}
     ListHeaderComponent={() => (
      <NewGroupButton onPress={() => setIsNewGroup(!isNewGroup)} />
    )}
     />


        {isNewGroup && <Pressable style={styles.button} onPress={saveGroup}>
          <Text style={styles.buttonText}>
            Save group ({selectedUsers.length})
          </Text>
        </Pressable>}
    
      

      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  page:{
    flexDirection:"column",
    padding:10,
  },
  button: {
    backgroundColor: "#3777f0",
    marginHorizontal: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  
});



