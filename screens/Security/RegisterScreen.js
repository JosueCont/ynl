import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ScrollView} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import FormRegister from "../../components/security/FormRegister";

const RegisterScreen = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [])

    const register = async (values) => {

        setAttribute('registerData', values).then(() => {
            navigation.navigate('PhoneScreen')
        })
    }

    return (
        <ScrollView>
            <FormRegister loading={loading} onRegister={register}/>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {

    }
}

export default connect(mapState, {createSession, registerAction, setAttribute})(RegisterScreen);