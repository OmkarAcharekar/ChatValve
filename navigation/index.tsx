import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Pressable, Text, View, useWindowDimensions, StyleSheet } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/AllChatsScreen';
import SettingsScreen from "../screens/AllChatsScreenSettings";
import SecondTab from '../screens/SecondTab';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import IndividualChatScreen from '../screens/IndividualChatScreen';
import HomeScreen from '../screens/AllChatsScreen';
import UsersScreen from '../screens/AllCurrentUsersScreen';
import ChatRoomHeader from './IndividualChatHeader';
import GroupScreen from '../screens/GroupScreen';
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: HomeHeader }} />
      <Stack.Screen name="ChatRoom" component={IndividualChatScreen}
        options={({ route }) => ({ headerTitle: () => <ChatRoomHeader id={route.params?.id || null} />, headerBackTitleVisible: false })} />
      <Stack.Screen name="UsersScreen" component={UsersScreen}
        options={{ title: "Users" }} />
      <Stack.Screen name="GroupScreen" component={GroupScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />


      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />


    </Stack.Navigator>
  );
}

const HomeHeader = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const str = 'ChatValve';
  const highlight = 'Valve';

  let startIndex = str.indexOf(highlight);
  let endIndex = str.indexOf(highlight) + highlight.length;



  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width,
      padding: 10,
      marginBottom: 7,
      alignItems: "center",
    }}>

      <Image
        source={{
          uri: "https://raw.githubusercontent.com/OmkarAcharekar/ChatValve/master/assets/images/bubble-chat.png",
        }}
        style={{ width: 35, height: 35, borderRadius: 30 }}
      />
      { }
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          {str.substring(0, startIndex)}
          <Text style={styles.highlight}>
            {str.substring(startIndex, endIndex)}
          </Text>
          {str.substring(endIndex, str.length)}
        </Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Settings")}>
        <Feather
          name="settings"
          size={24}
          color="black"
          style={{ marginLeft: 80 }}
        />
      </Pressable>
      <Pressable onPress={() => navigation.navigate("UsersScreen")}>
        <MaterialIcons
          name="chat"
          size={24}
          color="black"
          style={{ marginHorizontal: 10 }}
        />
      </Pressable>

    </View>
  )

};

const styles = StyleSheet.create({
  container: {


  },
  paragraph: {

    fontSize: 25,
    fontWeight: "bold",

    color: "#ffd633",

    flex: 1,
    textAlign: "center",
    marginLeft: 100,


  },
  highlight: {
    color: "#0099ff",
  },
});

