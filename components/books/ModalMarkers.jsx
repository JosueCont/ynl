import {  StyleSheet,  TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, FlatList, HStack, Icon, Image, Modal, Spacer, VStack, Text, Alert } from 'native-base'
import Mark from '../../assets/mark_new.png'
import moment from 'moment'
import { AntDesign } from '@expo/vector-icons'; 
import { Colors } from '../../utils/Colors'


const ModalMarkers = ({showModal=false, closeModal, markers = [], markSelected}) => {
  return (
    <Modal isOpen={showModal} onClose={() => closeModal() } size={'xl'} >
        <Modal.Content>
            <Modal.CloseButton />
            <Modal.Header>Lista de marcadores</Modal.Header>
            <Modal.Body>
            <FlatList data={markers} renderItem={({item}) => 
                <TouchableOpacity  onPress={() => markSelected(item?.attributes?.page)}>
                <Box borderBottomWidth="1" _dark={{borderColor: "muted.50" }} borderColor="muted.800" pl={["0", "4"]} pr={["0", "5"]} py="2">
                    <HStack space={[2, 3]} justifyContent="space-between">
                    <Image source={Mark} width={10} height={10} resizeMode='contain' />

                        <VStack>
                            <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold>
                                {item?.attributes?.name}
                            </Text>
                            <Text color="coolGray.600" _dark={{color: "warmGray.200"}}>
                                Pagina {item?.attributes?.page+1}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" _dark={{color: "warmGray.50"}} color="coolGray.800" alignSelf="flex-start">
                            {
                                moment (new Date(item?.attributes?.createdAt)).format("DD / MMM /YYYY")
                                 
                            }
                        </Text>
                    </HStack>
                </Box>
                </TouchableOpacity>
                } 
                keyExtractor={item => item.id} 
                ListEmptyComponent={
                    <Alert w="100%" status={"info"}>
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize="md" color="coolGray.800">
                                    Aun no tienes marcadores
                                </Text>
                                </HStack>
                            </HStack>
                            </VStack>
                    </Alert>}
                />
            </Modal.Body>
        </Modal.Content>
    </Modal>
  )
}

export default ModalMarkers

const styles = StyleSheet.create({})