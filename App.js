import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";

let user = "";
let pwd = "";

function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.imagen} source={require("./assets/logo2.png")} />
      <Input
        label="Username or email"
        labelStyle={{ fontSize: 18, color: "grey" }}
        containerStyle={styles.nombre}
        placeholder="user@gmail.com"
        rightIcon={<Icon name="user" size={24} color="grey" />}
        onChangeText={function (text) {
          user = text;
        }}
      />
      <Input
        secureTextEntry={true}
        label="Password"
        labelStyle={{ fontSize: 18, color: "grey" }}
        containerStyle={styles.correo}
        placeholder="password"
        rightIcon={<Icon name="eye" size={24} color="grey" />}
        onChangeText={function (text) {
          pwd = text;
        }}
      />
      <Button
        containerStyle={styles.boton}
        buttonStyle={{
          width: 350,
          height: "100%",
        }}
        titleStyle={{
          fontSize: 20,
        }}
        title="Sign In"
        onPress={async function () {
          const response = await fetch(
            "http://devapi.doktuz.com:8080/goambu/api/v2/auth/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: user,
                password: pwd,
              }),
            }
          );
          response.json().then((data) => {
            console.log(data);
            if (data.currentStatus == "ACTIVE") {
              navigation.navigate("Tawkto");
            }
          });
        }}
      />
    </View>
  );
}

function Tawkto({ navigation }) {
  const injectJS = `
  var Tawk_API=Tawk_API||{};
  Tawk_API.visitor = {
  name : 'visitor name',
  email : 'visitor@email.com'
  };
  
  var Tawk_LoadStart=new Date();
  
    
    `;

  return (
    <>
      <Button
        title="Log Out"
        buttonStyle={{ backgroundColor: "red" }}
        onPress={async function () {
          const response = await fetch(
            "http://devapi.doktuz.com:8080/goambu/api/v2/auth/logout"
          );
          console.log(response.text());
          navigation.navigate("Login");
        }}
      />
      <WebView
        source={{
          uri:
            "https://tawk.to/chat/5f6acdfff0e7167d0012e24c/default?currentuser=Johan12345",
        }}
        injectedJavaScriptBeforeContentLoaded={injectJS}
      />
    </>
  );
}

const Stack = createStackNavigator();

function App() {
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
            headerLeft: null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
<View>
      <Text>Tawkto</Text>
      
      <Button
        title="Log Out"
        onPress={async function () {
          const response = await fetch(
            "http://devapi.doktuz.com:8080/goambu/api/v2/auth/logout"
          );
          console.log(response.text());
          navigation.goBack();
        }}
      />
    </View>






<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/5f6acdfff0e7167d0012e24c/default';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imagen: {
    flex: 3,
    resizeMode: "contain",
    width: 280,
  },
  nombre: {
    flex: 1,
  },
  correo: {
    flex: 1,
  },
  boton: {
    height: 50,
    marginBottom: 15,
  },
});

export default App;
