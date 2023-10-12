import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormControl, HStack, Icon, Image, TextArea, VStack, View, Text, Skeleton } from 'native-base'
import { TouchableOpacity } from 'react-native'
import {FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import {Colors} from '../../utils/Colors'
import ImgYellow from '../../assets/Rectángulo.png'
import {baseURL} from '../../utils/AxiosApi'
import CategoriesOptionsList from './CategoriesOptionsList'
import { useSelector } from 'react-redux';
import { getUrlImage } from '../../utils/functions';

const FormItemGoal = ({data=[], idx=null, upd, disabled = false, isActive= true}) => {

    const maxLength = 200
    const [currenInfo, setCurrenInfo] = useState({})
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [optionSelected, setOptionSelected] = useState(null)

    const loading = useSelector(state => state.goalsDuck?.loading);


    const onConfirm = (cat) => {
      upd('goal_category', cat, idx)
    }

    

    const updDescription = (newVal) => {
      if(newVal.length <= maxLength){
        upd('description', newVal, idx)
      }
    }


    const updCompleted = (newVal) => {
        upd('completed', newVal, idx)
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
      {
        loading ? <Skeleton  width={25} height={25} /> : 
            isActive() ? 
              <TouchableOpacity onPress={(val) => updCompleted(!data[idx]?.completed)} disabled={!data[idx]?.description} style={{ width: 25, height: 25, borderWidth:2, borderRadius:9, justifyContent:'center'}}>
                {
                  data[idx]?.completed && <Icon as={<FontAwesome name='check' color={'black'} style={{ textAlign:'center' }} />}/>  
                }
            </TouchableOpacity> :
            <View style={{ width: 25, height: 25, borderColor: Colors.black, borderWidth:2, borderRadius:9, justifyContent:'center'}}>
            {
              data[idx]?.completed && <Icon as={<FontAwesome name='check' color={'black'} style={{ textAlign:'center' }} />}/>  
            }
          </View>
          
      }
      <VStack width={'60%'}>
        {
          loading ? <Skeleton width={'100%'} height={'20'} />  : <FormControl>
            {
              isActive() ? 
              <TextArea isDisabled={disabled} onChangeText={(val) => updDescription(val) } value={data[idx]?.description} width={'100%'} borderColor={data[idx]?.error_description ? Colors.red : Colors.black} borderWidth={3} borderRadius={15} /> :
              <View paddingX={2} paddingY={1} width={'100%'} height={20} borderColor={Colors.black} borderWidth={3} borderRadius={15}>
                <Text>
                  {data[idx]?.description}
                </Text>
              </View>
            }
          
          <FormControl.HelperText style={{ alignSelf:'flex-end' }}  _text={{ fontSize: 'xs' }} >
            <Text>{data[idx]?.description ? data[idx]?.description?.length : 0}/{maxLength}</Text>
          </FormControl.HelperText>
        </FormControl>
        }
      </VStack>
      {
        loading ? <Skeleton height={8} width={35} /> : 
        isActive() ? 
        <TouchableOpacity disabled={!data[idx]?.description} onPress={() => setOptionsOpen(true)}>
          <View style={{ height:30, width:50, borderRadius:10}}>
            <Image style={data[idx]?.error_category ?{ borderColor: Colors.red , borderWidth: 3 } : null} source={ImgYellow} width={50} height={30} borderRadius={10} position={'absolute'} opacity={data[idx]?.description ? 1 : 0.4} />
            <VStack justifyContent={'center'} height={'100%'}>
              <HStack justifyContent={'space-between'} paddingX={2} >
                <Icon marginY={'auto'} color={"#fff"} as={<AntDesign name="caretdown" size={24} />} /> 
                {
                  data[idx]?.goal_category &&
                  <Image height={5}  resizeMode='contain' aspectRatio={1}  source={{  uri: getUrlImage(data[idx]?.goal_category?.attributes?.icon_white?.data?.attributes?.url) }} />
                }
              </HStack>
            </VStack>
          </View>
      </TouchableOpacity> :
      <View style={{ height:30, width:50, borderRadius:10}}>
        <Image style={data[idx]?.error_category ?{ borderColor: Colors.red , borderWidth: 3 } : null} source={ImgYellow} width={50} height={30} borderRadius={10} position={'absolute'} opacity={data[idx]?.description ? 1 : 0.4} />
          <VStack justifyContent={'center'} height={'100%'}>
            <HStack justifyContent={'space-between'} paddingX={2} >
              <Icon marginY={'auto'} color={"#fff"} as={<AntDesign name="caretdown" size={24} />} /> 
              {
                data[idx]?.goal_category &&
                <Image height={5}  resizeMode='contain' aspectRatio={1}  source={{ uri: baseURL+ data[idx]?.goal_category?.attributes?.icon_white?.data?.attributes?.url }} />
              }
            </HStack>
          </VStack>
      </View>
      }
    </HStack>
    <CategoriesOptionsList open={optionsOpen} setOpen={setOptionsOpen} confirm={onConfirm} />
  </>
  )
}

export default FormItemGoal