import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, SafeAreaView } from 'react-native';
import IndividualUser from '../components/IndividualUser';
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


  const createChatRoom = async (users) => {

    const authUser = await Auth.currentAuthenticatedUser();
    const dbUser = await DataStore.query(User, authUser.attributes.sub);
    if (!dbUser) {
      Alert.alert("There was an error creating the group");
      return;
    }
    // Create a chat room
    const newChatRoomData = {
      newMessages: 0,
      Admin: dbUser,
    };
    if (users.length > 1) {
      newChatRoomData.name = "New group";
      newChatRoomData.imageUri =
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/group.jpeg";
    }
    const newChatRoom = await DataStore.save(new ChatRoom(newChatRoomData));

    if (dbUser) {
      await addUserToChatRoom(dbUser, newChatRoom);
    }

    // connect users user with the chat room
    await Promise.all(
      users.map((user) => addUserToChatRoom(user, newChatRoom))
    );

    navigation.navigate("ChatRoom", { id: newChatRoom.id });
  };



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
    <SafeAreaView style={styles.page}>
      <FlatList data={users}
        renderItem={({ item }) => <IndividualUser user={item}
          onPress={() => onUserPress(item)}
          isSelected={isNewGroup ? isUserSelected(item) : undefined} />}
        showsVerticalScrollIndicator={false}
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

  page: {
    flexDirection: "column",
    padding: 10,
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



