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
        <Actionsheet isOpen={open} hideDragIndicator disableOverlay>
            <Actionsheet.Content >
            <View style={{ minWidth:'100%' }} borderBottomColor={Colors.yellow} borderBottomWidth={1}>
                <HStack justifyContent={'space-between'} paddingX={5} paddingBottom={2}>
                    <TouchableOpacity onPress={() => setOpen(false) }>
                        <Text>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={!optionSelected} onPress={() => confirmSelect()}>
                        <Text>
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </HStack>
                </View>
                {
                goalsDuck?.categories?.map(item => (
                    <Actionsheet.Item style={{ height:50}} padding={0}  onPress={() => setOptionSelected(item)} backgroundColor={ optionSelected?.id === item.id ? Colors.yellow : 'white' } >
                    <VStack justifyContent={'center'} height={'100%'} >
                        <HStack space={1} margin={0} minWidth={'100%'} justifyContent={'center'} >
                            <Image height={6} width={5} source={{ uri: baseURL+item?.attributes?.icon?.data?.attributes?.url }} />
                            <Text fontSize={'xl'} >{item?.attributes?.name}</Text>
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