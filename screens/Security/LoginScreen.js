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
    const [errorMessage, setModalErrorMessage] = useState('Algo ha salido mal, porfavor intenta nuevamente');


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

    const loginWithLinkedIn = async (accessToken) => {
        try {
            setLoading(true)
            const res = await loginLinkedIn(accessToken)
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
            if (res.status===200) {
                setHasLogged(true)
                navigation.navigate('IntroScreen')
            } else {
                setModalErrorMessage('Usuario o credenciales inválidas')
                setModalErrorVisible(true)
            }

        } catch (e) {
            console.log('error local',e)
                setModalErrorMessage('Usuario o credenciales inválidas')
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
                <ScrollView>
                    <FormLogin loading={loading} onLoginGoogle={loginWithGoogle} onLogin={login}
                               onGoRegister={goRegister} onLoginLinked={loginWithLinkedIn} />
                    <ModalError visible={modalErrorVisible} setVisible={setModalErrorVisible}
                                text={errorMessage}/>
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