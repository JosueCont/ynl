import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity} from 'react-native'
import {createSession, loginKhor} from "../../redux/ducks/authDuck";
import {Colors} from "../../utils/Colors";
import FormLoginKhor from "./Components/FormLoginKhor";
import ApiApp from "../../utils/ApiApp";
import ModalError from "../Modals/ModalError";
import { View, Text, Heading, Center, FlatList, Box } from "native-base";

const SiteListKhor = ({navigation, loginKhor, ...props}) => {

    const [loading, setLoading] = useState(false)
    const [modalErrorVisible, setModalErrorVisible] = useState(null);
    const [modalErrorText, setModalErrorText] = useState(null);
    const [sites, setSites] = useState(null)
    const [stepLogin, setStepLogin] =useState(1)
    const [siteSelected, setSiteSelected] = useState(null)
    const [currentEmail, setCurrentEmail] = useState("")


    useEffect(() => {
    }, [])

    const goStepTwo = () => {
      setSiteSelected(null);
      setStepLogin(2);
    };

    const getSites = async (values) => {
        console.log(values)
        try {
            setLoading(true);
            const response = await ApiApp.getSitesKhor(values)
            console.log(response.data?.sites)
            console.log("response.data.sites", response.data.sites);
            if (response.data.sites.length === 1){
                setSiteSelected(response.data.sites[0]);
                setStepLogin(3);
            } else{
                setStepLogin(2);
            }
            setSites(response.data?.sites);
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <ScrollView style={{ backgroundColor: Colors.white }}>
          <FormLoginKhor
            step={stepLogin}
            loading={loading}
            onRegister={stepLogin === 1 ? getSites : onLoginKhor}
            siteSelected={siteSelected}
            sitesLength={sites?.length}
            goStepTwo={goStepTwo}
            setEmail={setCurrentEmail}
            email={currentEmail}
          />
          <ModalError
            text={modalErrorText}
            visible={modalErrorVisible}
            setVisible={setModalErrorVisible}
          ></ModalError>

          {sites?.length > 1 && stepLogin === 2 && (
            <View flex={1} alignItems="center">
              <Text fontSize="xl" bold underline textAlign={"center"} mb={10}>
                Selecciona un sitio Khor
              </Text>
              <FlatList
                width={"85%"}
                data={sites}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSiteSelected(item);
                      setStepLogin(3);
                    }}
                  >
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: "muted.50",
                      }}
                      pl={["0", "4"]}
                      pr={["0", "5"]}
                      py="4"
                    >
                      <Text fontSize="md">Nombre: {item.khor_name}</Text>
                    </Box>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
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