import React, { useState, useEffect } from "react";
import {Alert, Modal, Text} from "react-native";
import {styles} from "./GroupModalCreateStyleSheet";
import {t} from 'i18n-js';
import {Button, Input, View, Checkbox} from "native-base";
import {useIsFocused} from "@react-navigation/native";

const GroupsModalCreate = ({ visible, setVisible, action, isUpd = false, name=null, loading = false, privateGroup=false }) => {
  const isFocused = useIsFocused();
  const [value, setValue] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [privateGroupValue, setPrivateGroupValue] = useState(false);

  useEffect(() => {
      if(name){
          setValue(name)
      }

      if(privateGroup){
          console.log('entra')
          setPrivateGroupValue(privateGroup)
      }else{
          setPrivateGroupValue(false)
      }

  }, [name,privateGroup])

  useEffect(() => {
    setValue("")
    setDisabledButton(true)
}, [isFocused])


  const closeModal = () =>{
      setVisible(false);
  }
  

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
          <Text style={styles.modalText}>
            {isUpd ? t('groups_edit_group') : t('groups_create_group')}{" "}
          </Text>

          <Input
            fontSize={12}

            maxLength={50}
            onChangeText={(v) => {
                if (v !== "" && v.trim() !== "") {
                    setDisabledButton(false);
                } else {
                    setDisabledButton(true);
                }
                setValue(v);
            }}
            value={value}
            />
            <View style={{marginTop:30}}></View>
            <Checkbox onChange={(val)=> {
                setDisabledButton(false);
                setPrivateGroupValue(val)
            }} checked={privateGroupValue}
                      defaultIsChecked={privateGroup}
                      value={privateGroupValue}>
                {t('private_group')}
            </Checkbox>
          <View flexDir={"row"} mt={4}>
            <View flex={1} mr={1}>
              <Button
                size={"sm"}
                colorScheme={"orange"}
                onPress={() => {
                  closeModal();
                  setDisabledButton(true);
                }}
                isDisabled={loading}
              >
                  {t('cancel')}
              </Button>
            </View>
            <View flex={1} ml={1}>
              <Button
                isLoading={loading}
                isLoadingText={t('saving')}
                size={"sm"}
                colorScheme={disabledButton ? "gray" : "orange"}
                disabled={disabledButton}
                onPress={() => {
                    action(value,privateGroupValue);
                    setDisabledButton(true)
                }}
              >
                {isUpd ? t('update') : t('create')}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GroupsModalCreate;