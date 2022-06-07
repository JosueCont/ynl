import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    Icon,
    Image,
    Input,
    Skeleton,
    Stack,
    Text,
    useToast,
    View
} from "native-base";
import {Entypo} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {useIsFocused} from "@react-navigation/native";
import ModalPasswordUpdate from "./Modals/ModalPasswordUpdate";
import {getShadowCircleStyle} from "../utils/functions";
import bg1 from "../assets/bg1.png";
import * as ImagePicker from 'expo-image-picker';
import mime from 'react-native-mime-types'


const ProfileScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(null);
    const [modalPasswordUpdateVisible, setModalPasswordUpdateVisible] = useState(null);
    const toast = useToast();
    const [loadingImage, setLoadingImage] = useState(null);

    const [image, setImage] = useState(null);
    const [shareMyInfo, setShareMyInfo] = useState(null);


    useEffect(() => {
        if (isFocused) {
            getProfileFunction()
        }
    }, [isFocused])

    const getProfileFunction = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getProfile(authDuck.user.id)
            console.log(response.data)
            setValues(response)
            setLoading(false)
        } catch (ex) {
            console.log(ex)
        } finally {

        }
    }

    const updateProfileFunction = async () => {
        try {
            setLoading(true)
            let data = {
                firstName: name,
                lastName: lastName,
                email: email,
                gender: gender,
                shareMyData: shareMyInfo
            }
            const response = await ApiApp.updateProfile(authDuck.user.id, data)

            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="emerald.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>Actualizado correctamente.</Text>
                    </Box>;
                }
            });
            setValues(response)
        } catch (ex) {
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="red.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{ex.response.data.error.message}</Text>
                    </Box>;
                }
            });
        } finally {
            setLoading(false)
        }
    }

    const setValues = async (response) => {
        setName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setGender(response.data.gender)
        setImage(response.data.avatar.formats.small.url)
        setShareMyInfo(response.data.shareMyData === true ? 1 : 0)
    }

    const updatePasswordFunction = async (currentPassword, newPassword, confirmNewPassword) => {
        try {
            setLoading(true)
            let data = {
                currentPassword: currentPassword,
                newPassword: newPassword,
                confirmNewPassword: confirmNewPassword
            }

            const response = await ApiApp.updatePassword(data)
            setModalPasswordUpdateVisible(false)
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="emerald.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>Actualizado correctamente.</Text>
                    </Box>;
                }
            });
        } catch (ex) {
            setModalPasswordUpdateVisible(false)
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="red.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{ex.response.data.error.message}</Text>
                    </Box>;
                }
            });
        } finally {
            setLoading(false)
        }
    }


    const pickImage = async () => {
        setLoadingImage(true)

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        console.log(result);

        if (result.cancelled) {
            setLoadingImage(false)

        } else {

            updatePhotoFunction(result).then((response) => {
                setLoadingImage(false)
            }).catch((error) => {
                setLoadingImage(false)
                console.log(error)
            })
        }


    };

    const updatePhotoFunction = async (imagePickerResult) => {
        try {

            var photo = {
                uri: imagePickerResult.uri,
                name: imagePickerResult.uri.split('/').pop(),
                type: mime.lookup(imagePickerResult.uri),
            };


            const formData = new FormData();

            formData.append('files', photo);
            formData.append('ref', 'plugin::users-permissions.user')
            formData.append('refId', authDuck.user.id)
            formData.append('field', 'avatar')

            const response = await ApiApp.updatePhoto(formData)

            let data = {
                avatar: response.data[0].id
            }

            //   const responseSub = await ApiApp.updateProfile(authDuck.user.id, data)

            await getProfileFunction()

        } catch (ex) {
            console.log(ex)
        }

    }


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    style={{backgroundColor: 'white'}}
                    tintColor={Colors.red}
                    refreshing={loading}
                    onRefresh={() => getProfileFunction()}
                />
            }
            contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}>

            <View justifyContent={'center'} alignItems={'center'}>
                <TouchableOpacity onPress={() => pickImage()}>

                    {
                        loadingImage === true ?
                            <View style={getShadowCircleStyle(10, 10)}>
                                <Skeleton endColor="warmGray.50" size="220" rounded="full" mt={5} mb={10}/>
                            </View> :
                            image ?
                                <View style={getShadowCircleStyle(10, 10)}>
                                    <Image mt={5} mb={10} w={220} h={220} source={{uri: image}}
                                           style={[
                                               {resizeMode: 'cover'}]}
                                           borderRadius={110} borderWidth={2} borderColor={'white'} alt="img"/>
                                </View> :
                                <View style={[{
                                    width: 220,
                                    height: 220,
                                    alignSelf: 'center',
                                    alignItems: 'center'
                                }, getShadowCircleStyle(10, 10)]} mt={5} mb={10}>
                                    <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'}
                                          justifyContent={'center'}
                                          borderRadius={110} borderWidth={0.5}
                                          borderColor={"red.200"}>
                                        <Icon as={Entypo} name="camera" size={20} color={'gray.200'}/>
                                        <Text fontSize={12} color={Colors.red}>Sube tu foto aquí</Text>
                                    </View>
                                </View>

                    }
                </TouchableOpacity>

                <View style={getShadowCircleStyle(10, 10)}>

                </View>
                <Image source={bg1} style={{
                    position: 'absolute',
                    resizeMode: 'contain',
                    zIndex: -1,
                    width: '150%',
                    height: 100
                }} alt="img"></Image>
            </View>


            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <FormControl isInvalid w="100%">
                        <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                            <Input size={'2xl'} h={50} placeholder={'Nombre(s)'} borderRadius={25}
                                   value={name}
                                   onChangeText={val => setName(val)}
                                   backgroundColor={Colors.white}
                                   color={Colors.red}
                                   fontSize={18}
                            />
                        </View>
                        <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                            <Input size={'2xl'} height={50} placeholder={'Apellidos'}
                                   borderRadius={20}
                                   value={lastName}
                                   onChangeText={val => setLastName(val)}
                                   backgroundColor={Colors.white}
                                   color={Colors.red}
                                   fontSize={18}
                            />
                        </View>
                        <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                            <Input size={'2xl'} height={50} placeholder={'Correo electrónico'}
                                   borderRadius={20}
                                   value={email}
                                   onChangeText={val => setEmail(val)}
                                   backgroundColor={Colors.white}
                                   color={Colors.red}
                                   fontSize={18}
                            />
                        </View>
                        {/*<Input size={'2xl'} height={50} mb={4} placeholder={'Contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.red} textAlign={'center'}/>*/}
                        {/*<Input size={'2xl'} height={50} mb={6} placeholder={'Confirmar contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.red} textAlign={'center'}/>*/}
                        <View mb={8}>
                            <Text textAlign={'center'} fontSize={20} color={'gray.600'} mb={4}>Género</Text>
                            <View flexDir={'row'} justifyContent={'space-between'} px={20}>
                                <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                          value="danger" colorScheme="orange" isChecked={gender === 0 ? true : false}
                                          onChange={(v) => {
                                              if (v) {
                                                  setGender(0)
                                              }

                                          }}>
                                    <Text color={Colors.red} fontSize={12}>Femenino</Text>
                                </Checkbox>
                                <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                          value="info" colorScheme="orange" isChecked={gender === 1 ? true : false}
                                          onChange={(v) => {
                                              if (v) {
                                                  setGender(1)
                                              }
                                          }}>
                                    <Text color={Colors.red} fontSize={12}>Masculino</Text>
                                </Checkbox>
                            </View>

                        </View>

                        <View mb={8}>
                            <Text textAlign={'center'} fontSize={20} color={'gray.600'} mb={4}>Compartir mi
                                información</Text>
                            <View flexDir={'row'} justifyContent={'space-between'} px={20} mx={10}>
                                <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                          value="danger" colorScheme="orange"
                                          isChecked={shareMyInfo === 1 ? true : false}
                                          onChange={(v) => {
                                              if (v) {
                                                  setShareMyInfo(1)
                                              }

                                          }}>
                                    <Text color={Colors.red} fontSize={12}>Sí</Text>
                                </Checkbox>
                                <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                          value="info" colorScheme="orange" isChecked={shareMyInfo === 0 ? true : false}
                                          onChange={(v) => {
                                              if (v) {
                                                  setShareMyInfo(0)
                                              }
                                          }}>
                                    <Text color={Colors.red} fontSize={12}>No</Text>
                                </Checkbox>
                            </View>

                        </View>

                        <TouchableOpacity style={{marginVertical: 20}}
                                          onPress={() => setModalPasswordUpdateVisible(true)}>
                            <Text textAlign={'center'} size={'md'} color={Colors.red} textDecorationLine={'underline'}>Actualizar
                                contraseña</Text>
                        </TouchableOpacity>
                        <Button isLoading={loading} colorScheme={'orange'} onPress={() => updateProfileFunction()}
                                mb={4}>Actualizar</Button>

                        <ModalPasswordUpdate action={updatePasswordFunction} visible={modalPasswordUpdateVisible}
                                             setVisible={setModalPasswordUpdateVisible}></ModalPasswordUpdate>
                    </FormControl>

                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(ProfileScreen);