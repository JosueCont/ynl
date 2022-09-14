import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {KeyboardAvoidingView, Platform, ScrollView, FlatList, Text, TouchableOpacity} from 'react-native'
import {createSession, loginKhor} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";
import {View} from 'native-base'
import FormLoginKhor from "./Components/FormLoginKhor";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";

const SiteListKhor = ({navigation, loginKhor, ...props}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalErrorText, setModalErrorText] = useState(null);
    const [sites, setSites] = useState(null)
    const [stepLogin, setStepLogin] =useState(1)
    const [siteSelected, setSiteSelected] = useState(null)


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
    const onLoginKhor = async (values)=>{
        setLoading(true)
        try{
            let res = await loginKhor(values.identifier, values.password, siteSelected)
            console.log('loginKhor', res)
            if(res.status===200){
                navigation.navigate('HomeScreen')
            }else{
                setModalErrorText('Credenciales incorrectas porfavor verifique nuevamente')
                setModalErrorVisible(true)
            }

        }catch (e) {
            console.log('error loginKhor',e)
            setModalErrorText('Credenciales incorrectas porfavor verifique nuevamente')
            setModalErrorVisible(true)
        }finally {
            setLoading(false)
        }

    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                              style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView style={{backgroundColor: Colors.white}}>
                <FormLoginKhor step={stepLogin} loading={loading} onRegister={stepLogin===1?getSites:onLoginKhor}/>
                <ModalError text={modalErrorText} visible={modalErrorVisible}
                            setVisible={setModalErrorVisible}></ModalError>


                <FlatList
                    data={sites}
                    renderItem={({item}) =>
                        <TouchableOpacity onPress={ () =>{
                            setSiteSelected(item)
                            setStepLogin(2)
                                }
                        }>

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

export default connect(mapState, {createSession, loginKhor})(SiteListKhor);