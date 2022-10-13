import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Platform} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import FormRegister from "../../components/security/FormRegister";
import {KeyboardAvoidingView, ScrollView} from "native-base";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [textException, setTextException] = useState(null);

    useEffect(() => {
    }, [])

    const register = async (values) => {
       try{
        const with_twilio = false;
        setLoading(true)
           const res = await ApiApp.getUserByEmail(values.email)
           // console.log(res.data)
           if(res.data.length){
               setModalErrorVisible(true)
               // existe un usuario con ese email
               setLoading(false)
           }else{

                if (with_twilio) {
                    //twilio flow phone validation (user)
                    setAttribute('registerData', values).then(() => {
                        navigation.navigate('PhoneScreen')
                    }).catch(e =>{
                    console.log('register setAttribute error => ',e.toString())
                    })
                }
                else{
                    try {
                        const {email, password} = values;
                        console.log("🚀 ~ file: RegisterScreen.js ~ line 41 ~ register ~ values", values)
                        await registerAction({
                            username: email,
                            email: email,
                            password: password,
                            shareMyData:true
                        })

                        navigation.navigate('SuccessScreen')
                    } catch (e) {
                        //console.log(typeof ex)
                        console.log('verify error =>',e.toString())
                        if (typeof e === 'object') {
                            setTextException(e.response.data.error.message)
                        } else {
                            setTextException(e.toString())
                        }
                        setModalErrorVisible(true)
                    }
                    
                }
 
           }

       } catch (e) { 
        console.log('RegisterScreen register error =>',e.toString())
       } finally {
           setLoading(false)
       }

    }

    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}
        >
        <KeyboardAvoidingView style={{ flex: 1, width: "100%" }}
          behavior={Platform.OS === "ios" ? "position" : ""}
          keyboardVerticalOffset={150}>
            <FormRegister loading={loading} onRegister={register}/>
            <ModalError text={'Ya existe un usuario con este correo'} setVisible={setModalErrorVisible}
                        visible={modalErrorVisible}></ModalError>
        </KeyboardAvoidingView>
        </ScrollView>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {

    }
}

export default connect(mapState, {createSession, registerAction, setAttribute})(RegisterScreen);