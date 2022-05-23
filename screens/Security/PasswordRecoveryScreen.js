import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {ScrollView} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";
import FormPasswordRecovery from "./Components/FormPasswordRecovery";

const PasswordRecoveryScreen = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
    }, [])

    const register = async (values) => {

    }

    return (
        <ScrollView style={{backgroundColor: Colors.white}}>
            <FormPasswordRecovery loading={loading} onRegister={register}/>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {}
}

export default connect(mapState, {createSession, registerAction, setAttribute})(PasswordRecoveryScreen);