import React from "react";
import {Alert, Modal, TouchableOpacity} from "react-native";
import {styles} from "./ModalStyleSheet";
import {Button, Icon, Text, View} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {t} from 'i18n-js'
import { useNavigation } from '@react-navigation/native';

const ModalError = ({visible, setVisible, withGoback=false, text=null}) => {

    const navigation = useNavigation();


    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              px={30}
              pt={10}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Icon
                as={AntDesign}
                name={"checkcircleo"}
                color={"green.500"}
                size={"6xl"}
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 15 }}
                onPress={() => setVisible(false)}
              >
                <Icon
                  as={AntDesign}
                  name={"close"}
                  color={"gray"}
                  size={"md"}
                ></Icon>
              </TouchableOpacity>
            </View>
            <View px={30} pt={10} mb={2}>
              <Text
                textAlign={"center"}
                fontSize={20}
                style={{ fontWeight: "bold" }}
              >
                  {t('warning')}
              </Text>
              <Text fontSize={18} style={styles.modalText}>
                {" "}
                {text ? text : t('register_success')}
              </Text>
              <Button
                size={"xs"}
                colorScheme={"orange"}
                onPress={() => {
                  if (withGoback) {
                    navigation.goBack(0);
                  }
                  setVisible(false);
                }}
              >
                <Text size={"md"} color={"white"}>
                    {t('ok')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    );
};

export default ModalError;