import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ScrollView} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import FormRegister from "../../components/security/FormRegister";
import {Colors} from "../../utils/Colors";

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
        <ScrollView style={{backgroundColor: Colors.white}}>
            <FormRegister loading={loading} onRegister={register}/>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {

    }
}

export default connect(mapState, {createSession, registerAction, setAttribute})(RegisterScreen);