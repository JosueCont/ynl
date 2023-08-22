import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FormControl, HStack, Icon, Image, TextArea, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import {FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";

const FormItemGoal = ({data=null, ...props}) => {
  
    const [currenInfo, setCurrenInfo] = useState(null)
    
    const [optionsOpen, setOptionsOpen] = useState(false)
    const [optionSelected, setOptionSelected] = useState(null)
  
    useEffect(() => {
      if(data){
        setCurrenInfo({
          completed: data?.attributes?.completed,
          description: data?.attributes?.description,
          goal_category: data?.attributes?.goal_category?.data,
        })
      }
    }, [data])
  
    /* const selectCategory = (cat) => {
      setCurrenInfo({...currenInfo, goal_category: cat})
    } */
  
    /* const cancelSelect = () => {
      setCurrenInfo({...currenInfo, goal_category: null})
      setOptionsOpen(false)
    } */
    
    return (<HStack justifyContent={'center'} space={2} >
              <TouchableOpacity style={{ width: 25, height: 25, borderColor: Colors.yellow, borderWidth:2, borderRadius:9, justifyContent:'center'}}>
                {
                  currenInfo?.completed && <Icon as={<FontAwesome name='check' color={'black'} style={{ textAlign:'center' }} />}/>  
                }
              </TouchableOpacity>
              <VStack width={'60%'}>
              <FormControl>
                
                <TextArea value={currenInfo?.description} width={'100%'} borderColor={Colors.yellow} borderWidth={3} borderRadius={15} />
                <FormControl.HelperText style={{ alignSelf:'flex-end' }}  _text={{ fontSize: 'xs' }} >
                  10/20
                </FormControl.HelperText>
              </FormControl>
              </VStack>
              <TouchableOpacity onPress={() => setOptionsOpen(true)}>
                <View style={{ height:30, width:50, borderRadius:10}}>
                  <Image source={ImgYellow} width={50} height={30} borderRadius={10} position={'absolute'} />
                  <VStack justifyContent={'center'} height={'100%'}>
                    <HStack justifyContent={'space-between'} paddingX={2}>
                      <Icon color={"#000"} as={<AntDesign name="caretdown" size={24} />} /> 
                      {
                        currenInfo?.goal_category &&
                        <Image height={4} width={3} source={{ uri: baseURL+currenInfo?.goal_category?.attributes?.icon?.data?.attributes?.url }} />
                      }
                    </HStack>
                  </VStack>
                </View>
              </TouchableOpacity>
          </HStack>
    )
  }

export default FormItemGoal