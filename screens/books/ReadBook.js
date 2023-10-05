import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, RefreshControl} from 'react-native'
import React from 'react'
import PDFReader from 'rn-pdf-reader-js'
import { getOneBook } from '../../redux/ducks/booksDuck'
import {useIsFocused} from "@react-navigation/native";



/* Assets */
import Logo from '../../assets/new_logo.png'
import Search from '../../assets/search.png'
import Mark from '../../assets/mark.png'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUrlImage } from '../../utils/functions'
import { Colors } from '../../utils/Colors'



const ReadBook = ({route, ...props}) => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const screenHeight = Dimensions.get("window").height;
    const [currentBook, setCurrentBook] = useState(null)
    const loading = useSelector(state => state?.booksDuck?.loading)

    const getBook = async (book_code) => {
        let book = await dispatch(getOneBook(book_code))
        if(book.length > 0){
            const oneBook = book[0]
            setCurrentBook({
                "id": oneBook?.id,
                "name": oneBook?.attributes?.name,
                "author": oneBook?.attributes?.author,
                "front_page": {
                    "id": oneBook?.attributes?.front_page?.data?.id,
                    "name": oneBook?.attributes?.front_page?.data?.attributes?.name,
                    "url": oneBook?.attributes?.front_page?.data?.attributes?.url
                },
                "back_cover": {
                    "id": oneBook?.attributes?.back_cover?.data?.id,
                    "name": oneBook?.attributes?.back_cover?.data?.attributes?.name,
                    "url": oneBook?.attributes?.back_cover?.data?.attributes?.url
                },
                "full_pdf":{
                    "id": oneBook?.attributes?.full_pdf?.data?.id,
                    "name": oneBook?.attributes?.full_pdf?.data?.attributes?.name,
                    "url": oneBook?.attributes?.full_pdf?.data?.attributes?.url
                },
                "locked": false
            })
        }
        
    }

    useEffect(() => {
        if(isFocused){
            if (route?.params?.book) {
                setCurrentBook(route?.params?.book)
            }else if(route?.params?.book_code){
                    getBook(route?.params?.book_code)
                    
            }
        }
    }, [isFocused, route])

    useEffect(() => {
      console.log('currentBook==>', currentBook)
    }, [currentBook])
    

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
                loading ? <Skeleton height={500} />  :
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