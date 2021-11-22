import React,{useState,useEffect} from 'react'
import {Platform,KeyboardAvoidingView,Pressable, View, Text,StyleSheet,Image, TextInput } from 'react-native'
import {  SimpleLineIcons ,AntDesign,Ionicons, Feather,MaterialCommunityIcons} from '@expo/vector-icons';
import { Auth, DataStore ,Storage} from "aws-amplify";
import {Message }from '../../src/models';
import { ChatRoom } from '../../src/models';
import EmojiSelector from 'react-native-emoji-selector'
import * as ImagePicker from "expo-image-picker";
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import uuid from 'uuid-random';


const MessageInput = ({chatRoom}) => {
    const [message,setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [soundURI, setSoundURI] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
          if (Platform.OS !== "web") {
            const libraryResponse =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
           
            if (
              libraryResponse.status !== "granted" ||
              photoResponse.status !== "granted"
            ) {
              alert("Sorry, we need camera roll permissions to make this work!");
            }
          }
        })();
      }, []);
    
    const sendMessage = async() =>{
        const user = await Auth.currentAuthenticatedUser();
        const newMessage = await DataStore.save(new Message({
           content:message,
           userID:user.attributes.sub,
           chatroomID:chatRoom.id,
       }))
       resetFields();
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
        if(image){
            sendImage();
        }
       else if(message){
           sendMessage();

       }else{
           OnPlusClicked();

       }
    }








    
    ///Image

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

      const takePhoto = async () => {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 3],
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };
      const progressCallback = (progress) => {
        setProgress(progress.loaded / progress.total);
      };
      const sendImage = async () => {
        if(!image){
            return;
        }
          const blob = await getImageBlob();
          const {key} =  await Storage.put(`${uuid()}.png`, blob,
          {progressCallback});

           const user = await Auth.currentAuthenticatedUser();
           const newMessage = await DataStore.save(new Message({
              content:message,
              image:key,
              userID:user.attributes.sub,
              chatroomID:chatRoom.id,
          }))
          
           updateLastMessage(newMessage);
           resetFields();
   
      };
      const resetFields = () => {
        setMessage("");
        setIsEmojiPickerOpen(false);
        setImage(null);
        setProgress(0);
        
       
      };

      const getImageBlob = async () => {
          if(!image){
              return null;
          }
          const response =  await fetch(image);
          const blob = await response.blob();
          return blob;
      };









    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} 
        keyboardVerticalOffset={100}  
         style = {[styles.root,{height:isEmojiPickerOpen?"50%":"auto"}]}>
        
        {image && (
        <View style={styles.sendImageContainer}>
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, borderRadius: 10 }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignSelf: "flex-end",
            }}

            
          >

<View
              style={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#3777f0",
                width: `${progress * 100}%`,
              }}
            />
          </View>

        
        


          <Pressable onPress={() => setImage(null)}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={{ margin: 5 }}
            />
          </Pressable>
      </View>
        )}




            <View style = {styles.row}>
            <View style = {styles.inputContainer}>
            <Pressable
            onPress={() =>
              setIsEmojiPickerOpen((currentValue) => !currentValue)
            }
          >
                 <SimpleLineIcons name="emotsmile" size={24} color="#595959" style = {styles.icon} /></Pressable>
                 <TextInput style = {styles.input} value = {message} onChangeText={setMessage}  
                  placeholder = "Signal Message..."/>
                <Pressable  onPress={pickImage}>
                <Feather name="image" size={24} 
                 color="#595959" style = {styles.icon} />
                 </Pressable>


                 <Pressable onPress={takePhoto}>
            <Feather
              name="camera"
              size={24}
              color="#595959"
              style={styles.icon}
            />
          </Pressable>


                 <MaterialCommunityIcons name="microphone-outline" size={24} color="#595959" style = {styles.icon}/>
        </View>

        <Pressable onPress = {onPress} style = {styles.buttonContainer}>
        {message || image ? <Ionicons name="send" size={18} color="white" />:<AntDesign name="plus" size={24} color="white" />}

        </Pressable>
            </View>
             
            {isEmojiPickerOpen && (
        <EmojiSelector
          onEmojiSelected={(emoji) =>
            setMessage((currentMessage) => currentMessage + emoji)
          }
          columns={8}
        />
      )}
           
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    root: {
        
        padding:10
       
      },
      row: {
        flexDirection: "row",
       
      },sendImageContainer: {
        flexDirection: "row",
        marginVertical: 10,
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 10,
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
