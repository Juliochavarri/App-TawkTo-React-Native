import React, { createRef, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StatusBar,
  View,
  Text,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { WebView } from "react-native-webview";
import { Snackbar } from "react-native-paper";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

let user = "";
let pwd = "";
let id = "";
const Drawer = createDrawerNavigator();
const inputUser = createRef();
const inputPwd = createRef();
const btnSign = createRef();
const nav = createRef();

function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [hidePwd, sethidePwd] = useState(true);
  const [errorAuth, setErrorAuth] = useState("");
  const [focus, setFocus] = useState(false);
  const [focusPwd, setFocusPwd] = useState(false);

  const styleInputName = {
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    width: "90%",
    borderColor: focus == true ? "white" : "grey",
  };
  const styleInputPwd = {
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    width: "90%",
    borderColor: focusPwd == true ? "white" : "grey",
  };

  return (
    <ImageBackground
      source={{
        uri: "https://www.xtrafondos.com/wallpapers/cubos-3d-neon-3313.jpg",
      }}
      style={styles.bg}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Image style={styles.imagen} source={require("./assets/logo2.png")} />
          <Input
            ref={inputUser}
            containerStyle={styles.nombre}
            inputContainerStyle={styleInputName}
            inputStyle={{ color: "white" }}
            placeholder="user@gmail.com"
            leftIcon={
              <Icon
                name="user"
                size={24}
                color={focus == true ? "white" : "grey"}
                style={{ marginRight: 5 }}
              />
            }
            onChangeText={function (text) {
              user = text;
            }}
            onFocus={() => {
              setFocus(true);
            }}
            onBlur={() => {
              setFocus(false);
            }}
          />
          <Input
            ref={inputPwd}
            secureTextEntry={hidePwd}
            inputStyle={{ color: "white" }}
            containerStyle={styles.correo}
            inputContainerStyle={styleInputPwd}
            placeholder="Password"
            onFocus={() => {
              setFocusPwd(true);
            }}
            onBlur={() => {
              setFocusPwd(false);
            }}
            leftIcon={
              <Icon
                name={hidePwd == true ? "lock" : "unlock"}
                size={24}
                color={focusPwd == true ? "white" : "grey"}
                style={{ marginRight: 5 }}
                onPress={() => {
                  sethidePwd(!hidePwd);
                }}
              />
            }
            onChangeText={function (text) {
              pwd = text;
            }}
          />
          <Button
            containerStyle={styles.boton}
            ref={btnSign}
            buttonStyle={{
              width: 350,
              height: "100%",
            }}
            titleStyle={{
              fontSize: 20,
            }}
            loading={loading}
            loadingProps={{ size: "large" }}
            title="Sign In"
            onPress={async function () {
              setLoading(true);
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
                setLoading(false);
                console.log(data);
                if (data.currentStatus == "ACTIVE") {
                  inputUser.current.clear();
                  inputPwd.current.clear();
                  id = data.id;
                  navigation.navigate("Tawkto", { userID: id });
                } else {
                  inputUser.current.clear();
                  inputPwd.current.clear();
                  setShowSnack(true);
                  setLoading(false);
                  setErrorAuth(data.message);
                }
              });
            }}
          />
          <Snackbar
            visible={showSnack}
            onDismiss={() => setShowSnack(false)}
            duration={4000}
            action={{
              label: "Ok",
              onPress: () => {
                // Do something
              },
            }}
          >
            {errorAuth}
          </Snackbar>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
function CustomDrawerContent(props) {
  const navigation = props.navigation;
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Log Out"
        onPress={async () => {
          console.log(nav);
          const response = await fetch(
            "http://devapi.doktuz.com:8080/goambu/api/v2/auth/logout"
          );
          console.log(response.text());
          navigation.navigate("Login");
        }}
      />
    </DrawerContentScrollView>
  );
}

function Tawkto() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Chat"
        component={Chat}
        /* options={{
          drawerIcon: () => <Image source={require("./assets/icon.png")} />,
        }} */
      />
    </Drawer.Navigator>
  );
}
const html = `
<!DOCTYPE html>
<html>
     <body style="background-color:grey;">
     <p>Hola mundo</p>
     <script type="text/javascript">
     alert(document.querySelector("p").innerText);
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
     </body>
</html>`;

const codigo = `var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
     (function(){
     var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
     s1.async=true;
     s1.src='https://embed.tawk.to/5f6acdfff0e7167d0012e24c/default';
     s1.charset='UTF-8';
     s1.setAttribute('crossorigin','*');
     s0.parentNode.insertBefore(s1,s0);
     })();`;

class Chat extends React.Component {
  async componentDidMount() {
    this.setState({
      ID: await this.props.navigation
        .dangerouslyGetParent()
        .dangerouslyGetState().routes[1].params.userID,
    });
    const ID = this.state.ID;
    console.log("ID: " + ID);
    const url = `http://devapi.doktuz.com:8080/goambu/api/v2/clients?user_id=${ID}`;
    console.log("Url: " + url);
    const res = await fetch(url);
    const data = await res.json();
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    });
    console.log(this.state);
  }
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  }
  render() {
    const { navigation } = this.props;
    const injectJS = `
    var Tawk_API=Tawk_API||{};
    Tawk_API.visitor = {
    name : ${this.state.firstName},
    email : ${this.state.email},
    };
    var Tawk_LoadStart=new Date();
      `;

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
          <Text style={{ fontSize: 20, flex: 10, textAlign: "center" }}>
            Welcome {this.state.firstName}
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
            uri: "https://tawk.to/chat/5f6acdfff0e7167d0012e24c/default",
          }}
        />
      </SafeAreaView>
    );
  }
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
