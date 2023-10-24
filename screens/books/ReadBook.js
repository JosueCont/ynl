import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton, Menu, Modal, Button, FormControl, Input, KeyboardAvoidingView, useToast, Spinner, Heading, IconButton, Icon, Spacer, FlatList } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, RefreshControl, Pressable, Platform, TouchableHighlight} from 'react-native'
import React from 'react'
import PDFReader from 'rn-pdf-reader-js'
import { getMarkers, getPagesBook, addMarker, updLastPageRead } from '../../redux/ducks/booksDuck'
import {useIsFocused} from "@react-navigation/native";
import ImageSlider from 'react-native-image-slider';
import Slideshow from 'react-native-image-slider-show';
import { SliderBox } from "react-native-image-slider-box";
import ModalMarkers from '../../components/books/ModalMarkers'
import { FontAwesome5, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import SearchResultsList from '../../components/books/SearchResults'
import { BackHandler } from 'react-native';








/* Assets */
import Logo from '../../assets/new_logo.png'
import Search from '../../assets/search.png'
import Mark from '../../assets/mark_new.png'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUrlImage } from '../../utils/functions'
import { Colors } from '../../utils/Colors'



const ReadBook = ({route, navigation, ...props}) => {
    
    const toast = useToast();
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const screenHeight = Dimensions.get("window").height;
    const [currentBook, setCurrentBook] = useState(null)
    const [pages, setPages] = useState([])
    const [totalProgress, setTotalProgress] = useState(0)
    const [loadingMarks, setLoadingMarks] = useState(false)
    const [saving, setSaving] = useState(false)
    const [markers, setMarkers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showModalAdd, setShowModalAdd] = useState(false)
    const [markName, setMarkName] = useState(null)
    const [savingProgress, setSavingProgress] = useState(false)
    /* const [searchActive, setSearchActive] = useState(false) */
    const [textForSearch, setTextForSearch] = useState('')
    const [searchResults, setSearchResults] = useState(null)
    const [searched, setSearched] = useState(false)
    const [searching, setSearching] = useState(false)
    const [isLocked, setLocked] = useState(false)



    const user_id = useSelector(state => state?.authDuck?.user.id)
    const loading = useSelector(state => state?.booksDuck?.loading)
    const searchActive = useSelector(state => state?.booksDuck?.searchActive)


    const getBook = async (book_code) => {
        let bookPages = await dispatch(getPagesBook(book_code))
        console.log('libro',bookPages)
        if(bookPages.length > 0){
            let imgs = []
            for (let i = 0; i < bookPages.length; i++) { 
                imgs.push( getUrlImage(bookPages[i]['attributes']['file']['data']['attributes']['url']))
            }
            setPages(imgs)
        }
    }

    const updateLastPageRead = async () => {
        setSavingProgress(true)
        const data = {
            "user_id": user_id,
            "book_code": currentBook.code,
            "page": currentPage
        }
        let save = await dispatch(updLastPageRead({data}))
        if(save){
            setSavingProgress(false)
            toast.show({ title: 'Avance de lectura actualizado' }) 
        }
    }

    const getMarkersBook = async() => {
        let marks = await dispatch(getMarkers(user_id, currentBook?.code))
        if (marks){
            setMarkers(marks)
        }
    } 

    const closeModal = () => {
        setShowModal(false)
    }

    const closeModalAdd = () => {
        setMarkName(null)
        setShowModalAdd(false)
    }

    const moveToPage = (page) => {
        setCurrentPage(page)
        closeModal()
        dispatch({type: "SEARCH_ACTIVE", payload: false })
        /* setSearchActive(false) */
    }

    useEffect(() => {
      if(!searchActive){
        setTextForSearch(null)
        setSearchResults([])
        setSearched(false)
      }
    }, [searchActive])
    

    const addNewMarker = async () => {
        setSaving(true)
        const data = {
            "page": currentPage,
            "book": currentBook.id,
            "users_permissions_user": user_id,
            "name":  markName
        }
        let addmark = await dispatch(addMarker({data}))
        setSaving(false)
        if(addMarker){
            getMarkersBook()
            toast.show({ title: 'Marcador agregado correctamente' }) 
            closeModalAdd()
        }
    }

    
    

    useEffect(() => {
        if(isFocused){
            console.log('isLocked',route.params)
            if (route?.params?.book) {
                setCurrentBook(route?.params?.book)
                setLocked(route.params.isLocked)
            }/* else if(route?.params?.book_code){
                getBook(route?.params?.book_code)
                getMarkersBook()
            } */
        }else{
            dispatch({type: "SEARCH_ACTIVE", payload: false })
            /* setSearchActive(false) */
            setSearchResults(null)
            setPages([])
            setCurrentPage(0)
            setCurrentBook(null)
        }
    }, [isFocused, route])


    useEffect(() => {
        if(currentBook){
            console.log('==>',currentBook)
        }
      if(currentBook && currentBook.locked == false){
        getBook(currentBook.code)
        getMarkersBook()
      }
    }, [currentBook])
    
    const SearchInBook = async () => {
        setSearchResults([])
        setSearching(true)
        const filters = await currentBook?.meta?.filter(item => item.titulo.toLowerCase().includes(textForSearch.toLowerCase().trim()))
        setTextForSearch('')
        setSearched(true);
        setSearchResults(filters)
        setTimeout(() => {
            setSearching(false)
          }, 1000);
        
    }

    const backAction = () => {
        let flag;
        if(searchActive){
            setSearchResults(null)
            dispatch({type: "SEARCH_ACTIVE", payload: false })
            flag = true
        }else{
            flag = false
        }
        return flag
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backAction);
        }  
    }, [])
    

    /* useEffect(() => {
        if (route?.params?.last_page_read) {
            setCurrentPage(route?.params?.last_page_read)
        }
    }, [isFocused]) */

    
    

    
    

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <View flex={1} mt={5} style={{ flexDirection: 'column' }} minHeight={screenHeight}>
            <HStack mx={5} justifyContent={isLocked || searchActive ? 'flex-end' : 'space-between'} >
                {
                    !isLocked && !searchActive &&
                        <TouchableOpacity onPress={() => setCurrentPage(currentBook.last_page_read)}>
                            <Text fontSize={18} paddingBottom={0}>
                                Continuar donde lo deje{"  "}
                                <FontAwesome5 name="book-reader" size={20} color="black" />
                            </Text>
                        </TouchableOpacity>
                }
                <View>
                    <HStack space={3}>
                        {
                            searchActive ?
                            <Spacer>
                                <Input onSubmitEditing={SearchInBook} value={textForSearch} onChangeText={(val) => setTextForSearch(val)} placeholder="Buscar capitulo" paddingLeft={5} width={200} borderRadius="25" py="3" px="1" fontSize="14" InputRightElement={<Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search" />} />}  />
                                
                            </Spacer>
                            :
                            <IconButton onPress={() => dispatch({type: "SEARCH_ACTIVE", payload: true })} opacity={isLocked ? 0.3 : 1} colorScheme="black" key={'ghost'} variant={'ghost'} _icon={{
                                as: AntDesign,
                                name: "search1"
                              }} />
                        }
                        
                        <Menu shadow={2} right={8} trigger={triggerProps => {
                            return <IconButton disabled={isLocked} /* onPress={() => setSearchActive(true)} */ opacity={isLocked ? 0.3 : 1}  colorScheme="black" key={'ghost'} variant={'ghost'} _icon={{
                                        as: Ionicons,
                                        name: "bookmark-sharp"
                                    }} 
                              {...triggerProps}
                              />
                            }}
                        >
                            <Menu.Item onPress={() => updateLastPageRead() } >
                                <Text fontSize={'lg'}>
                                    Guardar mi progreso
                                </Text>
                            </Menu.Item>
                            <Menu.Item onPress={() => setShowModalAdd(true) } >
                                <Text fontSize={'lg'}>
                                    Añadir marcador
                                </Text>
                            </Menu.Item>
                            <Menu.Item onPress={() => setShowModal(true) } >
                                <Text fontSize={'lg'}>
                                    Ver marcadores
                                </Text>
                            </Menu.Item>
                        </Menu>
                    </HStack>
                </View>
            </HStack>
            <Skeleton height={500} isLoaded={!loading} marginTop={10} >
            {
                isLocked === true ?
                <View alignSelf={'center'} width={'90%'} h={Dimensions.get("window").height-(Dimensions.get("window").height*.25)}> 
                    <Image width={'100%'} resizeMode='contain' flex={1} source={{ uri: getUrlImage(currentBook?.back_cover?.url) }} />
                </View> 
                :
                <View >
                    {
                        searchActive && searchResults ?
                            <>
                                <SearchResultsList searching={searching} results={searchResults} pages={pages}  pageSelected={moveToPage} searched={searched} />
                            </>
                        :
                        <>
                            <SliderBox     
                                images={pages}
                                firstItem={currentPage}
                                sliderBoxHeight={Dimensions.get("window").height-(Dimensions.get("window").height*.25)}
                                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                                currentImageEmitter={index => setCurrentPage(index)}
                                resizeMode={'contain'}
                                ImageComponentStyle={{width: '90%'}}
                                dotStyle={{
                                    display: 'none'
                                }}
                            />
                            <View mx={5} >
                                <VStack width={'100%'} textAlign={'center'} alignSelf={'center'} >
                                    <Progress value={ (100/pages.length)*(currentPage+1) } />
                                    <Text textAlign={'center'} >{currentPage+1} de {pages.length}</Text>
                                </VStack>
                            </View>
                        </>
                    }
                </View>
            }
            </Skeleton>
            <ModalMarkers showModal={showModal} closeModal={closeModal} markers={markers} markSelected={moveToPage} />
            <KeyboardAvoidingView
                style={{ flex: 1, width: "100%" }}
                behavior={Platform.OS === "ios" ? "position" : null}
                keyboardVerticalOffset={-100}
            >
            <Modal isOpen={showModalAdd} onClose={() => closeModalAdd() } size={'xl'} closeOnOverlayClick={false} >
                <Modal.Content>
                    
                    { !saving && <Modal.CloseButton /> }
                    <Modal.Header>Agregar marcador nuevo</Modal.Header>
                    <Modal.Body>
                    {
                        saving ?
                        <HStack justifyContent={'center'}>
                            <Spinner accessibilityLabel="Loading posts" />
                            <Heading color={Colors.yellow} fontSize="md">
                                Agregando marcador
                            </Heading>
                        </HStack>
                        :
                        <FormControl>
                            <FormControl.Label>Nombre</FormControl.Label>
                            <Input value={markName} onChangeText={(val) => setMarkName(val) } />
                        </FormControl>

                    }
                    </Modal.Body>
                    {
                        !saving &&
                        <Modal.Footer>
                            <HStack width={'100%'} justifyContent={'space-between'}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                    setShowModalAdd(false);
                                }}>
                                Cancelar
                                </Button>
                                <Button backgroundColor={Colors.yellow} onPress={() => {
                                    addNewMarker();
                                }}>
                                    Agregar
                                </Button>
                            </HStack>
                        </Modal.Footer>
                    }
                </Modal.Content>
            </Modal>
            </KeyboardAvoidingView>
            <Modal isOpen={savingProgress}>
                <Spinner/>
            </Modal>
        </View>
    </SafeAreaView>
  )
}

export default ReadBook

const styles = StyleSheet.create({
})