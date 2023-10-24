import React, {useState} from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, FormControl, Icon, Input, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../../utils/Colors";
import {useFormik} from "formik";
import * as Yup from "yup";
import {t} from 'i18n-js';
import {AntDesign} from "@expo/vector-icons";
import ApiApp from "../../utils/ApiApp";
import { logOutAction } from "../../redux/ducks/authDuck";
import { connect } from "react-redux";

const ModalDeleteAccount = ({visible, setVisible, userId, site, logOutAction}) => {




    const deleteAccount = async () => {
            //alert(userId)
        try { 
            const response = await ApiApp.deleteAccount(userId) 
             
            if (response.data.data.message === "Ok") { 
  
                await logOutAction(); 
            }
            else{
                 
            }
        } catch (e) {
            // setTextException(e.response.data.error.message)
            // setModalErrorVisible(true)
            console.log('DeleteAccountAction error =>',e.toString())
          
        }

    }



  return (
    <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View px={30} pt={10} width={'100%'} alignItems={'center'} justifyContent={'center'}>
                        <Icon as={AntDesign} name={'exclamationcircleo'} color={'red.500'} size={'6xl'}/>
                        <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                                          onPress={() => setVisible(false)}>
                            <Icon as={AntDesign} name={'close'} color={'gray'} size={'md'}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View px={30} pt={10} mb={2}>
                        <Text textAlign={'center'} fontSize={20} style={{fontWeight: 'bold'}}>{t('atention')}</Text>
                        <Text fontSize={18} style={styles.modalText}>{t('delete_account')}</Text>
                        <Text fontSize={18} style={styles.modalText}>{t('delete_account2')}</Text>
                        <Button size={'xs'} colorScheme={'red'} onPress={() => deleteAccount()}><Text size={'md'}
                                                                                                           color={'white'}>{t('delete')}</Text></Button>
                    </View>
                </View>
            </View>
        </Modal>
  )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}


export default connect(mapState, {logOutAction})(ModalDeleteAccount);