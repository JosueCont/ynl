import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";
import FormPasswordRecovery from "./Components/FormPasswordRecovery";
import ApiApp from "../../utils/ApiApp";
import {t} from 'i18n-js'
import ModalError from "../Modals/ModalError";

const PasswordRecoveryScreen = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalErrorText, setModalErrorText] = useState(null);


    useEffect(() => {
    }, [])

    const register = async (values) => {
        try {
            setLoading(true);
            const response = await ApiApp.forgotPassword(values)
            // console.log(response.data)
            navigation.navigate('PasswordRecoverySuccessScreen')

        } catch (e) {

            console.log('register error =>', e.toString())
            setModalErrorText(t('error_email_not_related_user'))
            setModalErrorVisible(true)
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{backgroundColor: Colors.white}}>
                <FormPasswordRecovery loading={loading} onRegister={register}/>
                <ModalError text={modalErrorText} visible={modalErrorVisible}
                            setVisible={setModalErrorVisible}></ModalError>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapState = (state) => {
    return {}
}

export default connect(mapState, {createSession, registerAction, setAttribute})(PasswordRecoveryScreen);