import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Alert, ScrollView} from 'react-native'
import {createSession, registerAction} from "../../redux/ducks/authDuck";
import FormRegister from "../../components/security/FormRegister";


const RegisterScreen = ({productsDuck, navigation, registerAction}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [])

    const register = async (values) => {
        try {
            setLoading(true)
            const res = await registerAction({
                username: values.email.replace(/@.*$/, ""),
                email: values.email,
                password: values.password
            })
            //navigation.navigate('HomeScreen')
        } catch (ex) {
            Alert.alert(
                "Aviso",
                ex
            );
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView>
            <FormRegister loading={loading} onRegister={register}/>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState, {createSession, registerAction})(RegisterScreen);