import React from 'react'
import  {View,Text,StyleSheet} from "react-native"
import styles from '../ChatRoomItem/styles';

const blue = "#3777f0";
const grey = "lightgrey";
const myID = 'u1';
const Message = ({message}) => {
    const isMe = message.user.id === myID;

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
