import React,{useState,useEffect} from 'react'
import  {View,Text,StyleSheet, ActivityIndicator} from "react-native"
import styles from '../ChatRoomItem/styles';
import { Auth, DataStore } from "aws-amplify";
import {User }from '../../src/models';
const blue = "#3777f0";
const grey = "lightgrey";
const myID = 'u1';
const Message = ({message}) => {
    const [user,setUser] = useState<User|undefined>();
    const [isMe,setIsMe]= useState<boolean>(false);
  
    useEffect(() => {

        DataStore.query(User,message.userID).then(setUser);
       
    }, [])
    useEffect(() => {
        const checkIfMe = async () => {
           if(!user){
               return;
           }
            const  authUser = await Auth.currentAuthenticatedUser();
            setIsMe(user.id === authUser.attributes.sub);
        }
       checkIfMe();
    }, [user])

    if(!user){
        return<ActivityIndicator/>
    }
    return (
        <View style = {[style.container,isMe ? style.rightContainer : style.leftContainer ]}>
            <Text style = {{color:isMe ? 'black':"white"}}>
                {message.content}
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
    
      padding:10,
      margin:10,
      borderRadius:10,
      maxWidth:"75%",
      marginLeft:"auto"
      
      },
      leftContainer: {
        backgroundColor: blue,
        marginLeft: 10,
        marginRight: "auto",
      },
      rightContainer: {
        backgroundColor: grey,
        marginLeft: "auto",
        marginRight: 10,
        alignItems: "flex-end",
      },
    
      
      text:{
          color:"white"

      }
   

});

export default Message;
