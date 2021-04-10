import React from "react";
import {
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {Login} from './src/screens/Login'
import {Tawkto} from './src/screens/TawkTo'
import { createStackNavigator } from "@react-navigation/stack";


function App() {

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Tawkto"
          component={Tawkto}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  imagen: {
    height: 250,
    resizeMode: "contain",
    width: 280,
    marginBottom: 50,
  },
  nombre: {
    padding: 10,
    alignItems: "center",
  },
  correo: {
    padding: 10,
    alignItems: "center",
  },
  boton: {
    height: 50,
  },
  bg: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default App;
