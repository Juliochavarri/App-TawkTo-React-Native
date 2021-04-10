import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { logoutApi } from "../api/services";

export const Menu = (props) => {

    const navigation = props.navigation

    const logout = async () => {
      logoutApi()
      navigation.navigate("Login")
    }

    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          onPress={logout}
        />
      </DrawerContentScrollView>
    );
  }