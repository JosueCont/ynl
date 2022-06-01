import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Platform, Alert} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import FormRegister from "../../components/security/FormRegister";
import {KeyboardAvoidingView, ScrollView} from "native-base";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";
import {Colors} from "../../utils/Colors";

const RegisterScreen = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);

    useEffect(() => {
    }, [])

    const register = async (values) => {


        setLoading(true)

       try{
           const res = await ApiApp.getUserByEmail(values.email)
           console.log(res.data)
           if(res.data.length){
               setModalErrorVisible(true)
               // existe un usuario con ese email
               setLoading(false)
           }else{
               setAttribute('registerData', values).then(() => {
                   navigation.navigate('PhoneScreen')
               })
           }

       }catch (e){
           console.log(e)
       }finally {
           setLoading(false)
       }



    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{backgroundColor: Colors.white}}>
            <FormRegister loading={loading} onRegister={register}/>
        </ScrollView>
            <ModalError text={'Ya existe un usuario con este correo'} setVisible={setModalErrorVisible}
                        visible={modalErrorVisible}></ModalError>
        </KeyboardAvoidingView>
    )
}

const mapState = (state) => {
    return {

    }
}

export default connect(mapState, {createSession, registerAction, setAttribute})(RegisterScreen);