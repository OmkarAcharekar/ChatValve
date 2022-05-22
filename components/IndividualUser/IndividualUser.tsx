import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, Pressable, StyleSheet, View } from 'react-native';
import { Feather } from "@expo/vector-icons";

import styles from './styles';
import { User, ChatRoomUser } from '../../src/models';

export default function IndividualUser({ user,
  onPress,
  onLongPress,

  isSelected,
  isAdmin = false, }) {



  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.container}>
      <Image source={{
        uri: user.imageUri
      }}

        style={styles.image} />

      <View style={styles.rightContainer}>

        <Text style={styles.name}>{user.name} </Text>
        {isAdmin && <Text>admin</Text>}



      </View>
      {isSelected !== undefined && (
        <Feather
          name={isSelected ? "check-circle" : "circle"}
          size={20}
          color="#4f4f4f"
        />
      )}

    </Pressable>
  );
}





