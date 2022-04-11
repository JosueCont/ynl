import React, {useEffect, useState} from "react";
import {Box} from "native-base";
import {connect} from "react-redux";
import productsDuck from "../../redux/ducks/productsDuck";
import {ScrollView, Alert} from 'react-native'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {createSession} from "../../redux/ducks/authDuck";
import LoadingComponent from "../../components/Shared/LoadingComponent";
import FormRegister from "../../components/security/FormRegister";


const RegisterScreen = ({productsDuck,navigation}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [])

    const register=async (values)=>{
        try {
            setLoading(true)
            const auth = getAuth();
            const res = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            )
            console.log(res)
            navigation.navigate('Home')
        }catch (e){
            console.log(e)
            Alert.alert(
                "Ups!",
                "Algo ha salido mal, porfavor intenta nuevamente"
            );
        }finally {
            setLoading(false)
        }
        console.log(values, 'values from formregister')
        //navigation.navigate('Home')
    }

    return (
        <>
                 <ScrollView><FormRegister loading={loading} onRegister={register}/></ScrollView>
        </>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState,{createSession})(RegisterScreen);