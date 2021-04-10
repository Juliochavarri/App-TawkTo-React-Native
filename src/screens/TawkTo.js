import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react"
import {Chat} from "../components/Chat";
import { Menu } from "../components/Menu";

export const Tawkto = () => {

  const Drawer = createDrawerNavigator()

    return (
      <Drawer.Navigator
        drawerContent={(props) => <Menu {...props} />}
      >
        <Drawer.Screen
          name="Chat"
          component={Chat}
        />
      </Drawer.Navigator>
    );
  }