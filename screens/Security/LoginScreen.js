import React, {useEffect, useState} from "react";
import {Box, Text} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../../redux/ducks/productsDuck";
import {Alert, ScrollView} from 'react-native'
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {loginEmail, loginGoogle} from "../../redux/ducks/authDuck";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import FormLogin from "../../components/security/FormLogin";

const LoginScreen = ({productsDuck,navigation, loginEmail,loginGoogle, authDuck}) => {

    const [loading, setLoading] = useState(false)
    const [hasLogged, setHasLogged] = useState(false)


    useEffect(() => {
        if(authDuck.isLogged){
            setHasLogged(true)
        }
    }, [authDuck])

    useEffect(()=>{
        if(hasLogged){
            navigation.navigate('Home')
        }
    },[hasLogged])

    const loginWithGoogle =async (accessToken)=>{
        try{
            setLoading(true)
            const res = await loginGoogle(accessToken)
            if(res){
                console.log('login success=====',res)
                setHasLogged(true)
                navigation.navigate('Home')
            }

        }catch (e){
            Alert.alert(
                "Ups!",
                "Algo ha salido mal, porfavor intenta nuevamente"
            );
            setHasLogged(false)
        }finally {
            setLoading(false)
        }
    }

    const login=async (values)=>{

        try{
            setLoading(true)
            const res = await loginEmail(values.email, values.password)
            if(res){
                console.log('login success=====',res)
                setHasLogged(true)
                navigation.navigate('Home')
            }

        }catch (e){
            Alert.alert(
                "Ups!",
                "Algo ha salido mal, porfavor intenta nuevamente"
            );
            setHasLogged(false)
        }finally {
            setLoading(false)
        }

    }

    const goRegister=()=>{
        navigation.navigate('Register')
    }

    return (
        <>

                <ScrollView><Text>{authDuck.jwt?JSON.stringify(authDuck.jwt):'sin jwt'}</Text><FormLogin loading={loading} onLoginGoogle={loginWithGoogle} onLogin={login} onGoRegister={goRegister}/></ScrollView>


        </>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState,{loginEmail, loginGoogle})(LoginScreen);