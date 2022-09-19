import React, { useState, useEffect } from "react";
import {Alert, Modal, Text} from "react-native";
import {styles} from "./GroupModalCreateStyleSheet";
import {Button, Input, View} from "native-base";

const GroupsModalCreate = ({ visible, setVisible, action, isUpd = false, name=null, loading = false }) => {
  const [value, setValue] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
      if(name){
          setValue(name)
      }
  }, [name])


  const closeModal = () =>{
      setVisible(false);
  }
  

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            {isUpd ? "Editar grupo" : "Crear grupo"}{" "}
          </Text>
          <Input
            fontSize={12}
            maxLength={50}
            onChangeText={(v) => {
              if (v !== "") {
                setDisabledButton(false);
              } else {
                setDisabledButton(true);
              }
              setValue(v);
            }}
            value={value}
          ></Input>
          <View flexDir={"row"} mt={4}>
            <View flex={1} mr={1}>
              <Button
                size={"sm"}
                colorScheme={"orange"}
                onPress={() => {
                  closeModal();
                }}
                isDisabled={loading}
              >
                Cancelar
              </Button>
            </View>
            <View flex={1} ml={1}>
              <Button
                isLoading={loading}
                isLoadingText={"Guardando"}
                size={"sm"}
                colorScheme={disabledButton ? "gray" : "orange"}
                disabled={disabledButton}
                onPress={() => action(value)}
              >
                {isUpd ? "Actualizar" : "Crear"}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GroupsModalCreate;