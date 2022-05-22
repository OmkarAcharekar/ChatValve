
import React, { useEffect, useState } from "react";
import { View, Image, Text, useWindowDimensions, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { ChatRoomUser, User } from "../src/models";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";



const ChatRoomHeader = ({ id, children }) => {
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>(undefined);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const isGroup = allUsers.length > 2;


  const getLastOnlineText = () => {
    if (!user?.lastOnlineAt) {
      return null;
    }

    // if lastOnlineAt is less than 5 minutes ago, show him as ONLINE
    const lastOnlineDiffMS = moment().diff(moment(user.lastOnlineAt));
    if (lastOnlineDiffMS < 5 * 60 * 1000) {
      // less than 5 minutes
      return "online";
    } else {
      return `Last seen online ${moment(user.lastOnlineAt).fromNow()}`;
    }
  };

  const { width } = useWindowDimensions();
  const fetchChatRoom = async () => {
    DataStore.query(ChatRoom, id).then(setChatRoom);
  };

  const getUsernames = () => {
    return allUsers.map((user) => user.name).join(", ");
  };
  const navigation = useNavigation();

  const openInfo = () => {
    // redirect to info page
    navigation.navigate("GroupScreen", { id });
  };
  const fetchUsers = async () => {
    const fetchedUsers = (await DataStore.query(ChatRoomUser))
      .filter((chatRoomUser) => chatRoomUser.chatroom.id === id)
      .map((chatRoomUser) => chatRoomUser.user);

    setAllUsers(fetchedUsers);

    const authUser = await Auth.currentAuthenticatedUser();

    setUser(
      fetchedUsers.find((user) => user.id !== authUser.attributes.sub) || null
    );
    // setIsLoading(false);
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }

    fetchUsers();
    fetchChatRoom();
  }, []);

  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: width - 55,
      marginLeft: "auto",
      padding: 10,
      alignItems: "center",
    }}>

      <Image
        source={{
          uri: chatRoom?.imageUri || user?.imageUri,
        }}
        style={{ width: 30, height: 30, borderRadius: 30 }}
      />
      <Pressable onPress={openInfo} style={{ flex: 1, marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>
          {chatRoom?.name || user?.name}
        </Text>
        <Text numberOfLines={1}>
          {isGroup ? getUsernames() : getLastOnlineText()}
        </Text>
      </Pressable>

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