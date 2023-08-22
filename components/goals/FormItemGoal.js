import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormControl, HStack, Icon, Image, TextArea, VStack, View, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import {FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import {Colors} from '../../utils/Colors'
import ImgYellow from '../../assets/Rectángulo.png'
import {baseURL} from '../../utils/AxiosApi'
import CategoriesOptionsList from './CategoriesOptionsList'

const FormItemGoal = ({data=[], idx=null, upd, disabled = false}) => {

    const maxLength = 20

    const [currenInfo, setCurrenInfo] = useState({})
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [optionSelected, setOptionSelected] = useState(null)
  
    /* useEffect(() => {
      if(data){
        setCurrenInfo({
          completed: data?.attributes?.completed,
          description: data?.attributes?.description,
          goal_category: data?.attributes?.goal_category?.data,
        })
      }
    }, [data]) */

    const onConfirm = (cat) => {
      upd('goal_category', cat, idx)
    }

    

    const updDescription = (newVal) => {
      if(newVal.length <= 20){
        upd('description', newVal, idx)
      }
    }
  
    /* const selectCategory = (cat) => {
      
    } */
  
    /* const cancelSelect = () => {
      setCurrenInfo({...currenInfo, goal_category: null})
      setOptionsOpen(false)
    } */

  return (
    <>
    <HStack justifyContent={'center'} space={2} >
      <TouchableOpacity style={{ width: 25, height: 25, borderColor: Colors.yellow, borderWidth:2, borderRadius:9, justifyContent:'center'}}>
        {
          data[idx]?.completed && <Icon as={<FontAwesome name='check' color={'black'} style={{ textAlign:'center' }} />}/>  
        }
      </TouchableOpacity>
      <VStack width={'60%'}>
      <FormControl>
        <TextArea  onChangeText={(val) => updDescription(val) } value={data[idx]?.description} width={'100%'} borderColor={data[idx]?.error_description ? Colors.red : Colors.yellow} borderWidth={3} borderRadius={15} />
        <FormControl.HelperText style={{ alignSelf:'flex-end' }}  _text={{ fontSize: 'xs' }} >
          <Text>{data[idx]?.description ? data[idx]?.description?.length : 0}/{maxLength}</Text>
        </FormControl.HelperText>
      </FormControl>
      </VStack>
      <TouchableOpacity disabled={!data[idx]?.description} onPress={() => setOptionsOpen(true)}>
        <View style={{ height:30, width:50, borderRadius:10}}>
          <Image style={data[idx]?.error_category ?{ borderColor: Colors.red , borderWidth: 3 } : null} source={ImgYellow} width={50} height={30} borderRadius={10} position={'absolute'} opacity={data[idx]?.description ? 1 : 0.4} />
          <VStack justifyContent={'center'} height={'100%'}>
            <HStack justifyContent={'space-between'} paddingX={2}>
              <Icon color={"#fff"} as={<AntDesign name="caretdown" size={24} />} /> 
              {
                data[idx]?.goal_category &&
                <Image height={4} width={3} source={{ uri: baseURL+data[idx]?.goal_category?.attributes?.icon?.data?.attributes?.url }} />
              }
            </HStack>
          </VStack>
        </View>
      </TouchableOpacity>
    </HStack>
    <CategoriesOptionsList open={optionsOpen} setOpen={setOptionsOpen} confirm={onConfirm} />
  </>
  )
}

export default FormItemGoal