import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { createRef, useEffect, useRef } from 'react'
import { Button, Checkbox, HStack, Icon, Image, Select, Text, TextArea, Actionsheet, VStack, FormControl, KeyboardAvoidingView, ScrollView, useToast, Spinner } from 'native-base'
import {FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { baseURL } from '../utils/AxiosApi'
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";
import FormItemGoal from '../components/goals/FormItemGoal'
import Logo from '../assets/new_logo.png'
import Phrase from '../assets/preguntas-08.png'
import ImgYellow from '../assets/Rectángulo.png'
import { Colors } from '../utils/Colors'
import { useState } from 'react';
import { connect } from 'react-redux';

import { getGoalCategories, getDateGoal, saveDailyGoals } from '../redux/ducks/goalsDuck'
import moment from 'moment';

const GoalsScreen = ({goalsDuck, getGoalCategories, getDateGoal, saveDailyGoals, ...props}) => {

  const toast = useToast();

  const [dateSelected, setDateSelected] = useState(null)
  const [dataSend, setDataSend] = useState([])
  const [saving, setSaving] = useState(false)

  const fillCategories = async () => {
    await getGoalCategories()
  }

  useEffect(() => {
    fillCategories()
    setDateSelected(moment().format("YYYY-MM-DD"))
  }, [])

  useEffect(() => {
    let newList = []

    goalsDuck?.dailyGoals?.map(item => {
      newList.push({
        id: item?.id,
        completed: item?.attributes?.completed,
        description: item?.attributes?.description,
        goal_category: item?.attributes?.goal_category?.data,
        target_date: dateSelected
      })
    })
    setDataSend(newList)

  }, [goalsDuck?.dailyGoals])
  

  useEffect(() => {
    if(dateSelected){
      getDateGoal(dateSelected)
    }
  }, [dateSelected])

  const validateForm = () => {
    let error_exist = false
    let validData = dataSend.map(item => {
      if(!item.goal_category && item.description){
        /* Si axiste descripción si categoria, agregamos el error en la categoria */
        error_exist = true
        item['error_category'] = true
      }else if(item.goal_category && !item.description){
        error_exist = true
        /* Si existe categoria sin descripción, agregamos el error en descripción */
        item['error_description'] = true
      }
      return item
    })

    if(error_exist){
      setDataSend(validData)
    }else{
      saveGoals()
    }
  }

  
  const saveGoals = async () => {
    setSaving(true)
    const newData = dataSend.map(item => {
      let newItem = {
        "goal_category": item?.goal_category?.id,
        "description": item?.description,
        "target_date": item.target_date ? item.target_date : dateSelected
      }
      if(item.id){
        newItem['id'] = item.id
      }
      return newItem
    })

    try {
      let resp = await saveDailyGoals(newData)
      console.log(resp)
      if(resp['success']){
        toast.show({ title: 'Objetivos guardados' }) 
      }else{
        toast.show({ title: resp?.data }) 
      }
    } catch (error) {
      console.log('error', error)
    }finally{
      setSaving(false)
    }

  }

  const updData = (field, val, idx) => {
     /* Copia de los datos originales */
    let copy = [...dataSend]
    /* Obtenemos el elemento de la posición */
    let item;
    if(dataSend[idx]){
      item = dataSend[idx]
      item[field] = val
    }else{
      item = {[field]:val}
    }
    delete item.error_description
    delete item.error_category
    copy[idx] = item
    setDataSend(copy)
  }
  

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
          style={{ flex: 1, width: "100%" }}
          behavior={Platform.OS === "ios" ? "position" : ""}
          keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={true}
        >
          <View flex={1} mx={4} style={{ flexDirection: 'column' }}>
            <HStack justifyContent={'center'} p={1} mt={10} marginTop={20}>
              <Image
                source={Logo}
                alt='question1'
              />
            </HStack>
            <HStack justifyContent={'center'} marginTop={5}>
              <Text fontSize={'sm'}>
                Hoy
              </Text>
            </HStack>
            <HStack justifyContent={'center'}>
              <Text fontSize={'md'}>
                {moment().format("LL")}
              </Text>
            </HStack>
            <HStack justifyContent={'center'}>
              <Image h={100} source={Phrase} alt='Phrase' />
            </HStack>
            <VStack space={5}>
              <FormItemGoal data={dataSend} idx={0} upd={updData} disabled={saving} />
              <FormItemGoal data={dataSend} idx={1} upd={updData} disabled={saving}/>
              <FormItemGoal data={dataSend} idx={2} upd={updData} disabled={saving}/>
              <HStack justifyContent={'center'}>
                <TouchableOpacity disabled={saving} onPress={validateForm} style={{ width:150, height:40, backgroundColor: 'black', borderRadius:10 }}>
                  {
                    saving ? <VStack height={'100%'} justifyContent={'center'} ><Spinner /></VStack> :
                      <Text color={Colors.white} fontSize={'md'} textAlign={'center'} marginY={'auto'} >
                        Guardar
                      </Text>
                  }
                  
                </TouchableOpacity>
              </HStack>
            </VStack>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>

  )
}

const mapState = (state) => {
  return {
      goalsDuck: state.goalsDuck,
  }
}


export default connect(mapState, { getGoalCategories, getDateGoal, saveDailyGoals })(GoalsScreen);