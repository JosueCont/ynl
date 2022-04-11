import React, {useEffect, useState} from "react";
import {Box, Text} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../../redux/ducks/productsDuck";
import {Alert, ScrollView} from 'react-native'
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth'
import {createSession} from "../../redux/ducks/authDuck";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import FormLogin from "../../components/security/FormLogin";

const LoginScreen = ({productsDuck,navigation}) => {

    const [loading, setLoading] = useState(false)
    const [hasLogged, setHasLogged] = useState(false)


    useEffect(() => {
        const auth = getAuth();
        setLoading(true)
        onAuthStateChanged(auth,(user)=>{
            console.log('user',user)
            createSession(user);
            setLoading(false)
            setHasLogged(true)
        })
    }, [])

    useEffect(()=>{
        if(hasLogged){
            navigation.navigate('Home')
        }
    },[hasLogged])

    const login=async (values)=>{

        try{
            setLoading(true)
            const auth = getAuth();
            const res = await signInWithEmailAndPassword(auth, values.email, values.password)
            console.log('login success=====',res.user)
            setHasLogged(true)
            navigation.navigate('Home')
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

                <ScrollView><FormLogin loading={loading} onLogin={login} onGoRegister={goRegister}/></ScrollView>


        </>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState,{createSession})(LoginScreen);