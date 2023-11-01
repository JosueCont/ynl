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
import ImgYellow from '../assets/rectangulo.png'
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

  const [goalOne, setGoalOne] = useState({})
  const [goalTwo, setGoalTwo] = useState({})
  const [goalthree, setGoalthree] = useState({})
  

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
    getDateGoal(dateSelected.format("YYYY-MM-DD"), authDuck?.user?.id)
  }

  useEffect(() => {
    console.log('==========================>')
    console.log(authDuck.user)
  }, [authDuck])
  

  useEffect(() => {
    fillCategories()
    const today = moment()
    setDateToday(today)
    setDateSelected(today)
  }, [])

  useEffect(() => {
    let newList = []
    /* console.log('goalsDuck?.dailyGoals', goalsDuck?.dailyGoals) */
    goalsDuck?.dailyGoals?.map(item => {
      newList.push({
        id: item?.id,
        completed: item?.attributes?.completed,
        description: item?.attributes?.description,
        goal_category: item?.attributes?.goal_category?.data,
        target_date: dateSelected
      })
    })
    if(newList[0]){
      setGoalOne(newList[0])
    }else{
      setGoalOne({})
    }
    if(newList[1]){
      setGoalTwo(newList[1])
    }else{
      setGoalTwo({})
    }
    if(newList[2]){
      setGoalthree(newList[2])
    }else{
      setGoalthree({})
    }
    /* setDataSend(newList) */

  }, [goalsDuck?.dailyGoals])
  

  useEffect(() => {
    if(dateSelected){
      getData()
    }
  }, [dateSelected])

  const validateForm = () => {
    let error_exist = false
    if((goalOne.goal_category && !goalOne.description) || (goalOne.completed && !goalOne.description)){
      setGoalOne({...goalOne, error: "No puedes dejar vacía la descripción"})
      error_exist = true
    }else{
      setGoalOne({...goalOne, error: null})
    }
    if((!goalOne.goal_category && goalOne.description)){
      setGoalOne({...goalOne, error: "Debes elegir una categoria"})
      error_exist = true
    }else{
      setGoalOne({...goalOne, error: null})
    }

    if((goalTwo.goal_category && !goalTwo.description) || (goalTwo.completed && !goalTwo.description)){
      setGoalTwo({...goalTwo, error: "No puedes dejar vacía la descripción"})
      error_exist = true
    }else{
      setGoalTwo({...goalTwo, error: null})
    }
    if((!goalTwo.goal_category && goalTwo.description)){
      setGoalTwo({...goalTwo, error: "Debes elegir una categoria"})
      error_exist = true
    }else{
      setGoalTwo({...goalTwo, error: null})
    }

    if((goalthree.goal_category && !goalthree.description) || (goalthree.completed && !goalthree.description)){
      setGoalthree({...goalthree, error: "No puedes dejar vacía la descripción"})
      error_exist = true
    }else{
      setGoalthree({...goalthree, error: null})
    }
    if((!goalthree.goal_category && goalthree.description)){
      setGoalthree({...goalthree, error: "Debes elegir una categoria"})
      error_exist = true
    }else{
      setGoalthree({...goalthree, error: null})
    }
    if(!error_exist){
      saveGoals()
    }
  }

  const isActive = () => {
    return dateToday?.format("YYYY-MM-DD") === dateSelected?.format("YYYY-MM-DD") ? true : false
  }
  
  const saveGoals = async () => { 
    setSaving(true)
    try {
      const newData = [
        {
          "id": goalOne?.id,
          "goal_category": goalOne?.goal_category?.id,
          "description": goalOne?.description,
          "target_date": goalOne.target_date ? goalOne.target_date : dateSelected,
          "completed": goalOne.completed ? true : false,
          "user": authDuck.user,

        },
        {
          "id": goalTwo?.id,
          "goal_category": goalTwo?.goal_category?.id,
          "description": goalTwo?.description,
          "target_date": goalTwo.target_date ? goalTwo.target_date : dateSelected,
          "completed": goalTwo.completed ? true : false,
          "user": authDuck.user,
        },
        {
          "id": goalthree?.id,
          "goal_category": goalthree?.goal_category?.id,
          "description": goalthree?.description,
          "target_date": goalthree.target_date ? goalthree.target_date : dateSelected,
          "completed": goalthree.completed ? true : false,
          "user": authDuck.user,
        }
      ]

      console.log('newData===============================>>>>>>>>>>>>>>>>',newData)
      let resp = await saveDailyGoals(newData)
      if(resp['success']){
        toast.show({ title: 'Objetivos guardados' }) 
        getData()
      }else{
        toast.show({ title: resp?.data }) 
      }
    } catch (error) {
      console.log('error', error)
      setSaving(false)
    }finally{
      setSaving(false)
      
    }

  }

  const updateDataOne = (val, field) =>{
      let copy = {...goalOne} 
      copy[field] = val
      if(field === 'description'){
        copy['error'] = false
      }
      setGoalOne(copy)
  }

  const updateDataTwo = (val, field) =>{
    let copy = {...goalTwo} 
    copy[field] = val
    if(field === 'description'){
      copy['error'] = false
    }
    setGoalTwo(copy)
  }

  const updateDataThree = (val, field) =>{
    let copy = {...goalthree} 
    copy[field] = val
    if(field === 'description'){
      copy['error'] = false
    }
    setGoalthree(copy)
}

  const updData = (field, val, numGoal) => {
    if(numGoal === 1){
      /* Copia de los datos originales */
      
    }
  }

  

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView
          style={{ flex: 1, width: "100%" }}
          behavior={Platform.OS === "ios" ? "position" : null}
          keyboardVerticalOffset={-100}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={true}
        >
          <View flex={1} mx={4} style={{ flexDirection: 'column' }}>
            <HStack justifyContent={'center'} p={1} >
            <Image
                source={Logo}
                alt='question1'
                style={styles.logo}
                resizeMode='contain'/>
            </HStack>
            <HStack justifyContent={'center'} marginTop={5} space={5}>
              {
                loading ? <Skeleton width={10} />: 
                <TouchableOpacity  onPress={predDay} disabled={moment(authDuck?.user?.createdAt).format("YYYY-MM-DD") === dateSelected?.format("YYYY-MM-DD") ? true : false} >
                  <Icon opacity={moment(authDuck?.user?.createdAt).format("YYYY-MM-DD") === dateSelected?.format("YYYY-MM-DD") ? 0 : 1 } as={<AntDesign name="left"/>} size={7} marginY={'auto'} /> 
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
              <Image resizeMode='contain' height={20} width={'80%'} source={Phrase} alt='Phrase' marginY={5} />
            </HStack>
            <VStack space={5}>
              <FormItemGoal isActive={isActive} data={goalOne} updateData={updateDataOne}  disabled={saving} />
              <FormItemGoal isActive={isActive} data={goalTwo} updateData={updateDataTwo} disabled={saving}/>
              <FormItemGoal isActive={isActive} data={goalthree} updateData={updateDataThree} disabled={saving}/>
              <HStack justifyContent={'center'}>
                <VStack>
                {
                  dateToday?.format("YYYY-MM-DD") == dateSelected?.format("YYYY-MM-DD") && 
                  <TouchableOpacity 
                    disabled={
                      saving || loading || !isActive() || (!goalOne.description && !goalTwo.description && !goalthree.description)
                    } onPress={validateForm} style={{ width:150, height:40, backgroundColor: 'black', borderRadius:10, marginBottom:15, 
                    opacity: saving || loading || !isActive() || !goalOne.description && !goalTwo.description && !goalthree.description ? .5 : '1'
                  }}>
                    {
                      saving ? <VStack height={'100%'} justifyContent={'center'} ><Spinner /></VStack> :
                        <Text color={Colors.white} fontSize={'md'} textAlign={'center'} marginY={'auto'} >
                          Guardar
                        </Text>
                    }
                  </TouchableOpacity>
                }
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
              <HStack space={1} justifyContent={'space-around'} marginTop={0} marginBottom={2} >
                <TouchableOpacity onPress={() => navigation.navigate('GoalsTree')}>
                  <Image key={1} resizeMode='contain' width={12} height={12} source={Tree} />
                </TouchableOpacity>
              </HStack>
            </VStack>
            {/*<FooterLines />*/}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  </SafeAreaView>
  )
}


const styles = {
  logo:{
    height: 50
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