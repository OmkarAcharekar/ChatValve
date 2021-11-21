import { useNavigation } from '@react-navigation/native';
import  React from 'react';
import {Image, Text,Pressable ,StyleSheet,View} from 'react-native';


import styles from './styles';

export default function  UserItem({user}) {
 
  const navigation = useNavigation();
  const onPress = () =>{

   
   

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





