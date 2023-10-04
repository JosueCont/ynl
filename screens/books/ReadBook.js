import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, RefreshControl} from 'react-native'
import React from 'react'



/* Assets */
import Logo from '../../assets/new_logo.png'
import Search from '../../assets/search.png'
import Mark from '../../assets/mark.png'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUrlImage } from '../../utils/functions'
import { Colors } from '../../utils/Colors'



const ReadBook = ({route, ...props}) => {
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const screenHeight = Dimensions.get("window").height;

    const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };


    useEffect(() => {
        if (route?.params?.book_id) {
            console.log('===================>', route?.params?.book_id)
        }
    }, [route.params])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView showsVerticalScrollIndicator={false} position={'relative'} backgroundColor={Colors.white}
            refreshControl={<RefreshControl refreshing={refreshing}  /* onRefresh={refreshBooks} */ />}
        >
            <View flex={1} mx={5} mt={5} style={{ flexDirection: 'column' }} minHeight={screenHeight}>
                <HStack justifyContent={'flex-end'} >
                    <HStack space={2} >
                        <Image source={Mark} width={8 } height={8 } resizeMode="contain" />
                        <Image source={Search} width={8} height={8} resizeMode="contain" />
                    </HStack>
                </HStack>
                <View>
                    
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ReadBook

const styles = StyleSheet.create({})