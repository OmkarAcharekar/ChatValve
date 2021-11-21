
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoom, ChatRoomUser, User } from "../src/models";



const ChatRoomHeader = ({id,children}) => {
   
    const{width} = useWindowDimensions();

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if(!id){
            return;
        }
        const fetchUsers = async () => {
          const fetchedUsers = (await DataStore.query(ChatRoomUser))
            .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
            .map((chatRoomUser) => chatRoomUser.user);
    
          // setUsers(fetchedUsers);
          
          const authUser = await Auth.currentAuthenticatedUser();
          
          setUser(
            fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
          );
          // setIsLoading(false);
        };
        fetchUsers();
      }, []);
    
    return (
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width:width - 55,
        marginLeft:"auto",
        padding: 10,
        alignItems: "center",
      }}>
  
  <Image
          source={{
            uri: user?.imageUri
          }}
          style={{ width: 30, height: 30, borderRadius: 30 }}
        />
     <Text
          style={{
            flex: 1,
           
            marginLeft: 10,
            fontSize:20,
            fontWeight: "bold",
          }}
        >
          {user?.name}
        </Text>
        <Pressable onPress={() => navigation.navigate("Settings")}>
          <Feather
            name="camera"
            size={24}
            color="black"
            style={{ marginHorizontal: 10 }}
          />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("UsersScreen")}>
          <Feather
            name="edit-2"
            size={24}
            color="black"
            style={{ marginHorizontal: 10 }}
          />
        </Pressable>
  
    </View>
    )
    
  }

  export default ChatRoomHeader;