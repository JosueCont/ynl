import {  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { HStack, TextArea, VStack, Image } from 'native-base'

/* assetss */
import GoalIcon from '../../assets/goal.png'
import CheckYellow from '../../assets/check_yellow.png'
import CirclePlus from '../../assets/plus.png'
import { Colors } from '../../utils/Colors'
import { useSelector } from 'react-redux'

const SectionItem = ({data, title, name, active, setActive, changeTextForm, completed = false, ...props}) => {


    const saving = useSelector(state => state?.projectsDuck?.saving)

    useEffect(() => {
        console.log('completed', completed)
    }, [completed])
    
    
  return (
    <VStack>
        <TouchableOpacity onPress={() => setActive(name)}>
            <View style={{ marginTop:10, height:40, backgroundColor:'#4F4C4C', paddingHorizontal:10, borderRadius:12 }} >
                <HStack justifyContent={'space-between'} paddingLeft={4} height={'100%'}>
                    <View flexDirection={'row'} >
                        <VStack justifyContent={'center'}>
                            <Image
                                alt='goal' 
                                source={GoalIcon} height={5} resizeMode='contain'
                            />
                        </VStack>
                        <VStack justifyContent={'center'}>
                            <Text fontSize={18} fontWeight={'bold'} style={{ color:'#DCD7D7'}}>
                                {title}
                            </Text>
                        </VStack>
                    </View>
                    <VStack justifyContent={'center'} >
                        {
                            !saving &&
                            <Image 
                                alt='check'
                                source={ completed ? CheckYellow : CirclePlus }
                                resizeMode='contain'
                                height={6}
                                width={6}
                            />
                        }
                    </VStack>
                </HStack>
            </View>
        </TouchableOpacity>
        {
            active &&
            <View style={{ borderColor: Colors.yellow, borderWidth: 2, borderStyle:'solid', borderRadius:7 }} >
                <TextArea backgroundColor={'transparent'} onChangeText={(text) => changeTextForm(name, text) } value={ data ? data[name] : null} />
            </View>
        }
        
    </VStack>
  )
}

export default SectionItem

const styles = StyleSheet.create({})