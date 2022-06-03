import React, {useState} from "react";
import {Alert, Modal, Text} from "react-native";
import {styles} from "./GroupModalCreateStyleSheet";
import {Button, Input, View} from "native-base";

const GroupsModalCreate = ({visible, setVisible, action}) => {

    const [value, setValue] = useState('');
    const [disabledButton, setDisabledButton] = useState(true)

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
                    <Input fontSize={12} onChangeText={(v) => {
                        if (v !== ''){
                            setDisabledButton(false)
                        }else{
                            setDisabledButton(true)
                        }
                        setValue(v)
                        }}></Input>
                    <View flexDir={'row'} mt={4}>
                        <View flex={1} mr={1}>
                            <Button size={'sm'} colorScheme={'orange'}  onPress={() => {
                                setVisible(false)
                            }}>Cancelar</Button>
                        </View>
                        <View flex={1} ml={1}>
                            <Button size={'sm'} colorScheme={disabledButton?'gray':'orange'} disabled={disabledButton} onPress={() => action(value)}>Crear</Button>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>

    );
};

export default GroupsModalCreate;