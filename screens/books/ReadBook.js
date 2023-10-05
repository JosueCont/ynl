import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, RefreshControl} from 'react-native'
import React from 'react'
import PDFReader from 'rn-pdf-reader-js'



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
    const [currentBook, setCurrentBook] = useState(null)


    useEffect(() => {
        if (route?.params?.book) {
            console.log("========>",route?.params?.book)
            setCurrentBook(route?.params?.book)
        }
    }, [route.params])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View flex={1} mx={5} mt={5} style={{ flexDirection: 'column' }} minHeight={screenHeight}>
            <HStack justifyContent={'flex-end'} >
                <HStack space={2} >
                    <Image source={Search} width={8} height={8} opacity={currentBook?.locked ? 0.3 : 1} resizeMode="contain" />
                    <Image source={Mark} width={8 } height={8 } opacity={currentBook?.locked ? 0.3 : 1} resizeMode="contain" />
                </HStack>
            </HStack>
            {
                currentBook?.locked ?
                <View style={styles.pdfContent}> 
                    <Image width={'100%'} resizeMode='contain' flex={1} source={{ uri: getUrlImage(currentBook?.back_cover?.url) }} />
                </View> 
                :
                <View style={styles.pdfContent}>
                    <PDFReader
                        source={{
                            uri:  getUrlImage(currentBook?.full_pdf?.url),
                        }}
                    />
                </View>
            }
        </View>
    </SafeAreaView>
  )
}

export default ReadBook

const styles = StyleSheet.create({
    pdfContent:{
        marginTop:10, height: Dimensions.get("window").height-200
    }
})