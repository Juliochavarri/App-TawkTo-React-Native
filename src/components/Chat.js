import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview"
import { getUserApi } from "../api/services";
import { getTokenApi } from "../api/token";
import { TAWK_URL } from "../utils/constants";

export const Chat = ({ navigation, route }) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      getTokenApi()
      const data = await getUserApi(route.params.userId)
      setFirstName(data.firstName)
      setLastName(data.lastName)
    }
    fetchUser()
  }, [])

      return (
        <SafeAreaView
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              height: 60,
              alignItems: "center",
            }}
          >
            <Text 
              style={{
                fontSize: 
                20, flex: 10, 
                textAlign: "center" }}>
                  Welcome {firstName} {lastName}
            </Text>
            <Icon
              name="bars"
              size={24}
              style={{ flex: 1 }}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          </View>
  
          <WebView
            source={{
              uri: TAWK_URL,
            }}
          />
        </SafeAreaView>
      )
  }