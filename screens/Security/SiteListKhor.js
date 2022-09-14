import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {KeyboardAvoidingView, Platform, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native'
import {createSession, registerAction, setAttribute} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";
import {View} from 'native-base'
import FormLoginKhor from "./Components/FormLoginKhor";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";

const SiteListKhor = ({productsDuck, navigation, registerAction, setAttribute}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalErrorText, setModalErrorText] = useState(null);
    const [sites, setSites] = useState(null)


    useEffect(() => {
    }, [])

    const getSites = async (values) => {
        console.log(values)
        try {
            setLoading(true);
            const response = await ApiApp.getSitesKhor(values)
            console.log(response.data?.sites)
            setSites(response.data?.sites)
            //navigation.navigate('PasswordRecoverySuccessScreen')
        } catch (e) {
            console.log('register error =>', e.toString())
            setModalErrorText('Email no relacionado a un usuario, verifica nuevamente')
            setModalErrorVisible(true)
            setSites(null)
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{backgroundColor: Colors.white}}>
                <FormLoginKhor loading={loading} onRegister={getSites}/>
                <ModalError text={modalErrorText} visible={modalErrorVisible}
                            setVisible={setModalErrorVisible}></ModalError>


                <FlatList
                    data={sites}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={ () => console.log(item)}>

                            <View style={{padding: 30}}>
                                <Text>Nombre: {item.khor_name}</Text>
                            </View>
                        </TouchableOpacity>

                }
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = {
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
};


const mapState = (state) => {
    return {}
}

export default connect(mapState, {createSession, registerAction, setAttribute})(SiteListKhor);