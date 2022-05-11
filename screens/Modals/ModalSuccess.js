import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Icon, Text, View} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

const ModalError = ({visible, setVisible}) => {
    return (
        <Modal
            animationType={'slide'}
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setVisible(!visible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <View width={'100%'} borderTopRadius={20} h={100} bgColor={'green.600'} alignItems={'center'}
                          justifyContent={'center'}>
                        <Icon as={MaterialIcons} name={'check-circle-outline'} color={'white'} size={'6xl'}/>
                        <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                                          onPress={() => setVisible(false)}>
                            <Icon as={MaterialIcons} name={'close'} color={'gray'} size={'xl'}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View p={30}>
                        <Text textAlign={'center'} fontSize={22}>Aviso</Text>
                        <Text fontSize={18} style={styles.modalText}>Registro exitoso</Text>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalError;