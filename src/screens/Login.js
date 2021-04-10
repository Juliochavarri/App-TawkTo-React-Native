import React, {useState } from "react";
import {
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View
} from "react-native"
import {TextInput, Button} from 'react-native-paper'
import {useFormik} from 'formik'
import logo from '../../assets/logo.png'
import {formStyle, layoutStyle} from '../styles'
import { loginApi } from "../api/services"
import { setTokenApi } from "../api/token";

export const  Login = ({ navigation }) => {
  
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
      initialValues: initialValues(),
      onSubmit: async (formData) => {
        try {
          setLoading(true)
          const response = await loginApi(formData)
          setLoading(false)
          if (response.currentStatus == "ACTIVE") {
            const id = response.id
            setTokenApi(id)
            navigation.navigate('Tawkto', {
              screen: 'Chat',
              params: { userId: id },
            })
          }
        } catch (error) {
          setLoading(false);
        }
      },
    })

  
    return (
      <View style={layoutStyle.container}>
        <KeyboardAvoidingView behavior={Platform === 'ios' ? 'padding' : 'height'}>
            <Image style={styles.logo} source={logo} />
            <TextInput label="Email" style={formStyle.input} onChangeText={(text)=>formik.setFieldValue('username', text)} />
            <TextInput label="Password" style={formStyle.input} secureTextEntry onChangeText={(text)=>formik.setFieldValue('password', text)} />
            <Button
              mode='contained'
              style={formStyle.btnSucces}
              loading={loading}
              onPress={formik.handleSubmit}
            >
                Login
            </Button>
          </KeyboardAvoidingView>
        </View>
    );
  }

  function initialValues () {
    return {
        username: '',
        password: ''
    }
}

const styles = StyleSheet.create({
  logo: {
      width: '100%',
      height: 100,
      resizeMode: 'contain',
      marginBottom: 32,
  },
})