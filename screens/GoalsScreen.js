import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { createRef, useEffect, useRef } from 'react'
import { Button, Checkbox, HStack, Icon, Image, Select, Text, TextArea, Actionsheet, VStack, FormControl, KeyboardAvoidingView, ScrollView, useToast, Spinner, Skeleton } from 'native-base'
import {FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { baseURL } from '../utils/AxiosApi'
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";
import FormItemGoal from '../components/goals/FormItemGoal'
import { Colors } from '../utils/Colors'
import { useState } from 'react';
import { connect } from 'react-redux';
import OverlaySpinner from '../components/OverlaySpinner'
import { Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {t} from 'i18n-js';

import FooterLines from '../components/FooterLines'

/* Assets */
import Logo from '../assets/new_logo.png'
import Tree from '../assets/tree.png'
import Phrase from '../assets/phrase_goals.png'
import ImgYellow from '../assets/Rectángulo.png'
import Lines from '../assets/lines.png'



import { getGoalCategories, getDateGoal, saveDailyGoals } from '../redux/ducks/goalsDuck'
import {loadingOverlay} from '../redux/ducks/authDuck'
import moment from 'moment';


const GoalsScreen = ({goalsDuck, getGoalCategories, getDateGoal, saveDailyGoals, authDuck, ...props}) => {

  
  const toast = useToast();
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const { loading } = goalsDuck

  const [dateSelected, setDateSelected] = useState(null)
  const [dateToday, setDateToday] = useState(null)
  const [dataSend, setDataSend] = useState([])
  const [saving, setSaving] = useState(false)

  const fillCategories = async () => {
    await getGoalCategories()
  }

  const predDay = () => {
    const nextDate = moment(dateSelected).subtract(1, "days");
    setDateSelected(nextDate);
  }

  const nextDay = () => {
    const nextDate = moment(dateSelected).add(1, "days");
    setDateSelected(nextDate);
  }

  const getData = () => {
    getDateGoal(dateSelected.format("YYYY-MM-DD"))
  }

  useEffect(() => {
    fillCategories()
    const today = moment()
    setDateToday(today)
    setDateSelected(today)
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
      getData()
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

  const isActive = () => {
    return dateToday?.format("YYYY-MM-DD") === dateSelected?.format("YYYY-MM-DD") ? true : false
  }
  
  const saveGoals = async () => { 
    setSaving(true)
    try {
      const newData = dataSend.map(item => {
        let newItem = {
          "goal_category": item?.goal_category?.id,
          "description": item?.description,
          "target_date": item.target_date ? item.target_date : dateSelected,
          "completed": item.completed ? true : false,
          "user": authDuck.user,
        }
        if(item.id){
          newItem['id'] = item.id
        }
        return newItem
      })


      let resp = await saveDailyGoals(newData)
      if(resp['success']){
        toast.show({ title: 'Objetivos guardados' }) 
        
      }else{
        toast.show({ title: resp?.data }) 
      }
    } catch (error) {
      console.log('error', error)
      setSaving(false)
    }finally{
      setSaving(false)
      getDateGoal(dateSelected)
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
  

  useEffect(() => {
    if(loading === true)
      console.log("true")
  }, [loading])
  

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
            <HStack justifyContent={'center'} p={1} marginTop={20}>
              <Image
                source={Logo}
                alt='question1'
                style={styles.logo}
              />
            </HStack>
            <HStack justifyContent={'center'} marginTop={5} space={5}>
              {
                loading ? <Skeleton width={10} />: 
                <TouchableOpacity onPress={predDay}>
                  <Icon as={<AntDesign name="left"/>} size={7} marginY={'auto'} /> 
                </TouchableOpacity>
              }
              
              <View>
                <Text fontSize={'sm'} textAlign={'center'}>
                  { dateToday?.format("YYYY-MM-DD") == dateSelected?.format("YYYY-MM-DD") && "Hoy"}
                </Text>
                <Text fontSize={'md'}>
                  {moment(dateSelected).format("LL")}
                </Text>
              </View>
              {
                loading ? <Skeleton width={10} /> :
                <TouchableOpacity onPress={nextDay} disabled={dateToday?.format("YYYY-MM-DD") == dateSelected?.format("YYYY-MM-DD") } >
                  <Icon opacity={dateToday?.format("YYYY-MM-DD") == dateSelected?.format("YYYY-MM-DD") ? 0 : 1} as={<AntDesign name="right" />} size={7} marginY={'auto'} /> 
                </TouchableOpacity>
              }
            </HStack>
            <HStack justifyContent={'center'}>
              <Image resizeMode='center' height={20} width={'80%'} source={Phrase} alt='Phrase' marginY={5} />
            </HStack>
            <VStack space={5}>
              <FormItemGoal isActive={isActive} data={dataSend} idx={0} upd={updData} disabled={saving} />
              <FormItemGoal isActive={isActive} data={dataSend} idx={1} upd={updData} disabled={saving}/>
              <FormItemGoal isActive={isActive} data={dataSend} idx={2} upd={updData} disabled={saving}/>
              <HStack justifyContent={'center'}>
                {/* <View style={styles.orangeLeft} /> */}
                <VStack>
                  <TouchableOpacity disabled={saving || loading || !isActive()} onPress={validateForm} style={{ width:150, height:40, backgroundColor: 'black', borderRadius:10, marginBottom:15, 
                  opacity: isActive() || !loading ? '1' : .5 
                  }}>
                    {
                      saving ? <VStack height={'100%'} justifyContent={'center'} ><Spinner /></VStack> :
                        <Text color={Colors.white} fontSize={'md'} textAlign={'center'} marginY={'auto'} >
                          Guardar
                        </Text>
                    }
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigation.navigate('GoalsReport')}>
                    <Text textAlign={'center'} style={{ textDecorationLine: 'underline'}} fontSize={15}>
                      Mi avance
                    </Text>
                  </TouchableOpacity>
                </VStack>
                {/* <View style={styles.orangeRight} /> */}
              </HStack>
              {/* <HStack justifyContent={'center'}>
                <View style={styles.orangeCenter} />
              </HStack> */}
              <HStack space={1} justifyContent={'space-around'} marginTop={55} marginBottom={2} >
                <TouchableOpacity onPress={() => navigation.navigate('GoalsTree')}>
                  <Image key={1} resizeMode='center' width={12} height={12} source={Tree} />
                </TouchableOpacity>
              </HStack>
            </VStack>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <FooterLines />
    </ScrollView>
  </SafeAreaView>
  )
}


const styles = {
  logo:{
    height: 66
  },
  orangeLeft:{
    flex: 0.4,
    height: 24,
    backgroundColor: Colors.orange,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 'auto'
  },
  orangeLeftPadding:{
    flex: 0.2,
    height: 13,
    backgroundColor: Colors.orange,
    borderRadius:20,
    marginBottom: 'auto'
  },
  orangeRight:{
    flex: 0.4,
    height: 24,
    backgroundColor: Colors.orange,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginTop: 'auto'
  },
  orangeRightPadding:{
    flex: 0.2,
    height: 13,
    backgroundColor: Colors.orange,
    borderRadius:20,
    marginBottom: 'auto'
  },
  orangeCenter:{
    flex: .75,
    height: 24,
    backgroundColor: Colors.orange,
    borderRadius: 20
  }
}

const mapState = (state) => {
  return {
      goalsDuck: state.goalsDuck,
      authDuck: state.authDuck,
  }
}


export default connect(mapState, { getGoalCategories, getDateGoal, saveDailyGoals })(GoalsScreen);