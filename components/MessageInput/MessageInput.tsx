import React,{useState} from 'react'
import {Platform,KeyboardAvoidingView,Pressable, View, Text,StyleSheet, TextInput } from 'react-native'
import {  SimpleLineIcons ,AntDesign,Ionicons, Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import { Auth, DataStore } from "aws-amplify";
import {Message }from '../../src/models';
import { ChatRoom } from '../../src/models';
const MessageInput = ({chatRoom}) => {
    const [message,setMessage] = useState('');
    const sendMessage = async() =>{
        const user = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new Message({
           content:message,
           userID:user.attributes.sub,
           chatroomID:chatRoom.id,
       }))
        setMessage('');
        updateLastMessage(newMessage);

    }
    const updateLastMessage = async(newMessage) =>{
      
        DataStore.save(ChatRoom.copyOf(chatRoom,updatedChatRoom =>{
            updatedChatRoom.LastMessage = newMessage;

        }))
    }
    const  OnPlusClicked = () =>{
        console.warn("on plus");
        
    }
    const onPress = () =>{
       if(message){
           sendMessage();

       }else{
           OnPlusClicked();

       }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={100}   style = {styles.root}>
             <View style = {styles.inputContainer}>
                 <SimpleLineIcons name="emotsmile" size={24} color="#595959" style = {styles.icon} />
                 <TextInput style = {styles.input} value = {message} onChangeText={setMessage}   placeholder = "Signal Message..."/>
                 <Feather name="camera" size={24} color="#595959" style = {styles.icon} />
                 <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" style = {styles.icon}/>
        </View>
        <Pressable onPress = {onPress} style = {styles.buttonContainer}>
        {message ? <Ionicons name="send" size={18} color="white" />:<AntDesign name="plus" size={24} color="white" />}

        </Pressable>
           
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        padding:10
      },
      icon:{
          marginHorizontal:5

      },
      
      inputContainer: {
        backgroundColor: "#f2f2f2",
        flex: 1,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#dedede",
        alignItems:"center",
        flexDirection:"row"
        ,padding :5
      },
      input:{
          flex:1,
          marginHorizontal:5
      },
    
      buttonContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#3777f0",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
      },
      

})

export default MessageInput
