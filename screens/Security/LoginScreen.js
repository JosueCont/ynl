import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Alert, Platform} from 'react-native'
import {loginEmail, loginGoogle} from "../../redux/ducks/authDuck";
import FormLogin from "../../components/security/FormLogin";
import {KeyboardAvoidingView, ScrollView} from "native-base";
import ModalError from "../Modals/ModalError";

const LoginScreen = ({productsDuck, navigation, loginEmail, loginGoogle, authDuck}) => {

    const [loading, setLoading] = useState(false);
    const [hasLogged, setHasLogged] = useState(false);
    const [modalErrorVisible, setModalErrorVisible] = useState(null);


    useEffect(() => {
        if (authDuck.isLogged) {
            setHasLogged(true)
        }
    }, [authDuck])

    useEffect(() => {
        if (hasLogged) {
            navigation.navigate('HomeScreen')
        }
    }, [hasLogged])

    const loginWithGoogle = async (accessToken) => {
        try {
            setLoading(true)
            const res = await loginGoogle(accessToken)
            if (res) {
                console.log('login success=====', res)
                setHasLogged(true)
                navigation.navigate('HomeScreen')
            }

        } catch (e) {
            Alert.alert(
                "Ups!",
                "Algo ha salido mal, porfavor intenta nuevamente"
            );
            setHasLogged(false)
        } finally {
            setLoading(false)
        }
    }

    const login = async (values) => {

        try {
            setLoading(true)
            const res = await loginEmail(values.email, values.password)
            if (res) {
                setHasLogged(true)
                navigation.navigate('IntroScreen')
            } else {
                setModalErrorVisible(true)
            }

        } catch (e) {
            console.log(e)
            setModalErrorVisible(true)
            setHasLogged(false)
        } finally {
            setLoading(false)
        }

    }

    const goRegister = () => {
        navigation.navigate('Register')
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView bounces={false}>
                <FormLogin loading={loading} onLoginGoogle={loginWithGoogle} onLogin={login}
                           onGoRegister={goRegister}/>
                <ModalError visible={modalErrorVisible} setVisible={setModalErrorVisible}
                            text={'Algo ha salido mal, porfavor intenta nuevamente'}/>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState, {loginEmail, loginGoogle})(LoginScreen);