import React, { useEffect, useState } from 'react'
import { Actionsheet, View, Text, VStack, HStack, Image } from 'native-base'
import { connect } from 'react-redux'
import {Colors} from '../../utils/Colors'
import {baseURL} from '../../utils/AxiosApi'
import { TouchableOpacity } from 'react-native'

const CategoriesOptionsList = ({open, setOpen, goalsDuck, confirm, ...props }) => {

    const [optionSelected, setOptionSelected] = useState(null)

    const confirmSelect = () => {
        confirm(optionSelected)
        setOpen(false)
    }
    

  return (
    <>
        <Actionsheet isOpen={open} hideDragIndicator>
            <Actionsheet.Content >
            <View style={{ minWidth:'100%' }} borderBottomColor={Colors.yellow} borderBottomWidth={1}>
                <HStack justifyContent={'space-between'} paddingX={5} paddingY={2}>
                    <TouchableOpacity onPress={() => setOpen(false) }>
                        <Text fontSize={'md'}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!optionSelected} onPress={() => confirmSelect()}>
                        <Text fontSize={'md'}>
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </HStack>
                </View>
                {
                goalsDuck?.categories?.map(item => (
                    <Actionsheet.Item style={{ height:50}} padding={0}  onPress={() => setOptionSelected(item)} backgroundColor={ optionSelected?.id === item.id ? 'gray.300' : 'white' } >
                    <VStack justifyContent={'center'} height={'100%'} >
                        <HStack display={'flex'} space={1} margin={0} minWidth={'100%'} justifyContent={'center'}>
                            <View  width={'7'} height={'100%'} marginY={'auto'}>
                                <Image resizeMode='contain' aspectRatio={1}  source={{ uri: baseURL+item?.attributes?.icon?.data?.attributes?.url }} />
                            </View>
                            <View marginY={'auto'} >
                                <Text fontSize={'xl'} >{item?.attributes?.name}</Text>
                            </View>
                        </HStack>
                    </VStack>
                    </Actionsheet.Item>   
                ))
                }
            </Actionsheet.Content>
        </Actionsheet>
    </>
  )
}

const mapState = (state) => {
    return {
        goalsDuck: state.goalsDuck,
    }
}

export default connect(mapState)(CategoriesOptionsList)