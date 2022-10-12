import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, Icon, Text, View} from "native-base";
import {t} from 'i18n-js';
import {AntDesign} from "@expo/vector-icons";

const ModalInfo = ({visible, setVisible}) => {
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
                        <Icon as={AntDesign} name={'infocirlceo'} color={'blue.500'} size={'6xl'}/>
                        <TouchableOpacity style={{position: 'absolute', right: 10, top: 15}}
                                          onPress={() => setVisible(false)}>
                            <Icon as={AntDesign} name={'close'} color={'gray'} size={'md'}></Icon>
                        </TouchableOpacity>
                    </View>
                    <View px={30} pt={10} mb={2}>
                        <Text textAlign={'center'} fontSize={20} style={{fontWeight: 'bold'}}>{t('warning')}</Text>
                        <Text fontSize={18} style={styles.modalText}>{t('register_success')}</Text>
                        <Button size={'xs'} colorScheme={'orange'}><Text size={'md'}
                                                                         color={'white'}>{t('ok')}</Text></Button>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalInfo;