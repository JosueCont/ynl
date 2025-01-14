import React, {useEffect,useState} from 'react'
import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, RefreshControl} from 'react-native'
import { getBooks } from '../../redux/ducks/booksDuck'
import {useIsFocused} from "@react-navigation/native";

/* Assets */
import Logo from '../../assets/new_logo.png'
import Lineas from '../../assets/lineas.png'
import Locked from '../../assets/candado.png'
import { useDispatch, useSelector } from 'react-redux'

import { getUrlImage } from '../../utils/functions'
import { Colors } from '../../utils/Colors'




const BookList = ({navigation, route, ...props}) => {

    const screenHeight = Dimensions.get("window").height;
    const user_id = useSelector(state => state?.authDuck?.user?.id)
    const loading = useSelector(state => state?.booksDuck?.loading)
    const books = useSelector(state => state?.booksDuck?.books)
    const modules = useSelector(state => state?.modulesDuck.progress)
    const modulesData = useSelector(state => state?.modulesDuck.modules)

    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false)

    const dispatch = useDispatch()
    
    const refreshBooks = async () => {
        setRefreshing(true)
        await dispatch(getBooks(user_id))  
        setRefreshing(false)
    }

    useEffect(() => { 
        if(isFocused && user_id){
            dispatch(getBooks(user_id))  
        }        
    }, [isFocused, route])

    

    const getPermissionsBooks = (book,moduleIndex) => {   
        
        const code = book.code;
        switch (code) {
          case "ek":
            if (modulesData.indexOf("EMOTIONS") !== -1) {
              return false;
            }
            return true;
          case "file":
            if (modulesData.indexOf("GOALS") !== -1) {
              return false;
            }
            return true;
          case "six":
            if (modulesData.indexOf("SIXPACK") !== -1) {
              return false;
            }
            return true;

          default:
            return true;
        }
        
        //return !modules[moduleIndex] || modules[moduleIndex].percentToNext < 100;
    }    

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false} position={'relative'}
            refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={refreshBooks} />}
        >
            <View flex={1} style={{ flexDirection: 'column' }} minHeight={screenHeight}>
                <>
                    <HStack justifyContent={'center'} p={1} marginTop={20}>
                        <Image
                            source={Logo}
                            alt='Ynl'
                            style={styles.logo}
                            resizeMode='contain'
                        />
                    </HStack>
                </>
                <VStack space={5} >
                
                {
                    books?.map((book,index) => (
                        <>
                        <VStack width={'100%'} justifyContent={'center'}  key={book.id}>
                            <Image source={Lineas} style={{
                                    height:105,
                                    position: 'absolute',
                                    zIndex: -1,
                                    width: '100%',
                                    resizeMode:'stretch'
                                    }}
                                    alt="DiseñoLineas"
                            />
                            <TouchableOpacity onPress={() => navigation.navigate("ReadBook",{book: book, isLocked:getPermissionsBooks(book,index)}) } >
                                <HStack justifyContent={'center'}>
                                    <VStack  justifyContent={'center'}>
                                        <Skeleton isLoaded={!loading} h={230} w={230} borderRadius={16} >
                                            {
                                                getPermissionsBooks(book,index) && (<Image backgroundColor={Colors.white} borderRadius={50} source={Locked} position={'absolute'} width={12} height={12} zIndex={2} right={-10} top={-10} />)
                                            }
                                            <Image width={230} height={230} borderRadius={16} source={{ uri: getUrlImage(book?.front_page?.url) }} />
                                        </Skeleton>
                                    </VStack>
                                </HStack>
                                <HStack justifyContent={'center'}>
                                    <VStack width={230}>
                                        <Text style={styles.author}>
                                            {
                                                book?.author
                                            }
                                        </Text>
                                        <Text style={styles.bookName}>
                                            {
                                                book?.name
                                            }
                                        </Text>
                                    </VStack>
                                </HStack>
                            </TouchableOpacity> 
                        </VStack>
                        <HStack>

                        </HStack>
                        </>
                    ))
                }
                </VStack>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BookList

const styles = StyleSheet.create({
    logo:{
        height: 50,
        marginBottom:30
    },
    author:{
        color: "#9F9D9D",
        paddingLeft:25,
        marginTop:10,
        fontSize:13,
        height:15,
    },
    bookName:{
        paddingTop:5,
        marginTop:5,
        fontSize:21,
        height:24,
        paddingLeft:25,
    }
})