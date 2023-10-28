import { StyleSheet, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import { Alert, Box, CloseIcon, HStack, Heading, IconButton, Image, VStack, View, Text, Skeleton, Button } from 'native-base'
import { getUrlImage } from '../../utils/functions'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Colors } from '../../utils/Colors'
import { FontAwesome5, AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'; 

const SearchResultsList = ({pages, pageSelected, results, searched = false, searching, cancelSearch}) => {
    

    const [idx, setIdx] = useState(0)
    const pressPage= (page) => {
        pageSelected(page)

    }


    
  return (
    <View width={'90%'} alignSelf={'center'} marginTop={5}>
        <VStack>
            <HStack space={5} justifyContent={'flex-start'} style={styles.gridContainer}>
                {
                    searching &&
                    <>
                        <View flex={1/3}>
                            <Skeleton height={160} />
                        </View>
                        <View flex={1/3}>
                            <Skeleton height={160} />
                        </View>
                        <View flex={1/3}>
                            <Skeleton height={160} />
                        </View>
                    </>
                }
                {
                    !searched && results?.length < 1 &&
                    <Alert shadow={2} w="100%" colorScheme="blueGray">
                        <VStack space={1}  w="100%">
                            <Box px={5} _text={{
                            
                        }}>
                            <Text size={'md'} >
                                Puedes realizar busquedas por nombre de capitulos
                            </Text>
                            </Box>
                        </VStack>
                        </Alert>
                }
                {
                    !searching && searched && results?.length < 1 &&
                    <VStack w={'100%'}>
                        <Alert shadow={2} h={100} width={'100%'} mt={10} colorScheme="orange" backgroundColor={Colors.yellow}>
                            <VStack space={1} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                                <HStack space={2} flexShrink={1} alignItems="center">
                                    <Alert.Icon />
                                    <Heading fontSize="lg" fontWeight="medium">
                                        No se encontraron resultados
                                    </Heading>
                                </HStack>
                                </HStack>
                                <Box pl="6">
                                    <Text>
                                        Intenta con un nombre diferente
                                    </Text>                                
                                </Box>
                            </VStack>
                        </Alert>
                        <Button size="sm" variant="ghost" onPress={() => cancelSearch()} >
                            <HStack>
                                <Text>
                            Volver al libro
                            </Text>
                            <FontAwesome5 name="book-reader" size={20} color="black" />
                            </HStack>
                        </Button>
                    </VStack>
                }
                {
                    !searching && results.map((item) => {
                        return <View width={'29%'}>
                            <TouchableOpacity onPress={() => pressPage(parseInt(item?.page)-1)}>
                                <View textAlign={'center'} justifyContent={'center'} >
                                    <HStack justifyContent={'center'} >
                                        <Text textAlign='center' > Capitulo {item.Capitulo}</Text>
                                    </HStack>
                                    <Image height={160} width={'100%'} resizeMode='contain'  source={{ uri: pages[item.page-1]?.url }}  />
                                    <HStack justifyContent={'center'}>
                                        <Text textAlign='center'>{item?.titulo}</Text>
                                    </HStack>
                                </View>
                            </TouchableOpacity>
                        </View>
                    })
                }
            </HStack>
        </VStack>
    </View>
  )
}

export default SearchResultsList

const styles = StyleSheet.create({
    gridContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item:{
        width: '33.33%'
    }
})