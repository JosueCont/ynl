import React from "react";
import {Alert, Modal, Text} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, Input, View} from "native-base";

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
                    <Text style={styles.modalText}>Crear grupo</Text>
                    <Input fontSize={12}></Input>
                    <View flexDir={'row'} mt={4}>
                        <View flex={1} mr={1}>
                            <Button size={'sm'} colorScheme={'red'} onPress={() => {
                                setVisible(false)
                            }}>Cancelar</Button>
                        </View>
                        <View flex={1} ml={1}>
                            <Button size={'sm'} colorScheme={'red'} onPress={() => {
                            }}>Crear</Button>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>

    );
};

export default ModalError;