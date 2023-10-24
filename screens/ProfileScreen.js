import React, {useEffect, useState} from "react";
import {RefreshControl, ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Box, Button, Checkbox, FormControl, Icon, Image, Input, Skeleton, Stack, Text, useToast, View} from "native-base";
import {Entypo} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {useIsFocused} from "@react-navigation/native";
import ModalPasswordUpdate from "./Modals/ModalPasswordUpdate";
import ModalDeleteAccount from "./Modals/ModalDeleteAccount";
import {getShadowCircleStyle} from "../utils/functions";
import bg1 from "../assets/bg1.png";
import Lineas from '../assets/lineas.png'
import {t} from 'i18n-js';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import mime from 'react-native-mime-types'
import ModalError from "./Modals/ModalError";


const ProfileScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [loading, setLoading] = useState(null);
    const [modalPasswordUpdateVisible, setModalPasswordUpdateVisible] = useState(null);
    const [modalDeleteAccountVisible, setModalDeleteAccountVisible] = useState(null);
    const toast = useToast();
    const [loadingImage, setLoadingImage] = useState(null);

    const [image, setImage] = useState(null);
    const [shareMyInfo, setShareMyInfo] = useState(null);
    const [modalErrorVisible, setModalErrorVisible] = useState(null)
    const [modalErrorText, setModalErrorText] = useState('')


    useEffect(() => {
        if (isFocused) {
            getProfileFunction()
        }
    }, [isFocused])

    const getProfileFunction = async (isUpdatePhoto = false) => {
        try {
            setLoading(true)
            const response = await ApiApp.getProfile(authDuck.user.id)
            if (isUpdatePhoto){
                if(response.data.avatar.url){
                    setImage(response.data.avatar.url)
                    setLoading(false)
                }else{
                    setModalErrorText('No se pudo cargar tu imagen de perfil, por favor intenta nuevamente o bien intenta con otra imagen')
                    setModalErrorVisible(true)
                }
            }else{
                setValues(response)
                setShareMyInfo(response.data.shareMyData?1:0);
                setLoading(false)
            }
        } catch (e) {
            console.log('getProfileFunction error =>', e.toString())
        } finally {
            //
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
                        <Text color={"white"} fontSize={16} p={3}>{t('profile_success_update')}</Text>
                    </Box>;
                }
            });
            setValues(response)
        } catch (e) {
            console.log('updateProfileFunction error =>', e.toString())
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="red.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{e.response.data.error.message}</Text>
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
        setImage(response.data.avatar.url)
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

            console.log(data)

            const response = await ApiApp.updatePassword(data)
            setModalPasswordUpdateVisible(false)
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="emerald.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{t('profile_success_update')}</Text>
                    </Box>;
                }
            });
        } catch (e) {
            console.log(e.response.data)
            console.log('updatePasswordFunction error =>', e.toString());

            let messageText = "";

            if (e.response.data.error.message === "Old password does not match.") {
                messageText = t('error_password_isnot_equal')
            } else {
                messageText = e.response.data.error.message;
            }

            setModalPasswordUpdateVisible(false)
            toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="red.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{messageText}</Text>
                    </Box>;
                }
            });
        } finally {
            setLoading(false)
        }
    }

    const getFileInfo = async (fileURI) => {
        const fileInfo = await FileSystem.getInfoAsync(fileURI)
        return fileInfo
    }

    const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
        const isOk = (fileSize / 1024 / 1024) < smallerThanSizeMB
        console.log("peso", fileSize / 1024 / 1024);
        return isOk
    }

    const pickImage = async () => {
        try {
            setLoadingImage(true)

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.5,
            });

            if (result.cancelled) {
                setLoadingImage(false)
            } else {

                const { uri, type } = result;
                const fileInfo = await getFileInfo(result.uri);
                
                if(!fileInfo?.size) {
                    setLoadingImage(false)
                    return
                }

                const isLt1_5MB = isLessThanTheMB(fileInfo.size, 0.9);

                console.log("fileInfo  =====>", fileInfo);
                console.log("El booleano...: ", isLt1_5MB)

                if (!isLt1_5MB){
                    setLoadingImage(false);
                    setModalErrorText(t('error_image_less_15'))
                    setModalErrorVisible(true)
                    // alert(t('error_image_less_15'))
                    return;
                }
                  updatePhotoFunction(result)
                    .then((response) => {
                      setLoadingImage(false);
                    })
                    .catch((e) => {
                      setLoadingImage(false);
                      console.log(
                        "pickImage updatePhotoFunction error => ",
                        e.toString()
                      );
                    });
            }
        } catch (e) {
            console.log('pickImage error =>', e.toString());
        }

    };

    const updatePhotoFunction = async (imagePickerResult) => {
        console.log("imagePickerResult ===>", imagePickerResult);
        try {

            var photo = {
                uri: imagePickerResult.uri,
                name: imagePickerResult.uri.split('/').pop(),
                type: mime.lookup(imagePickerResult.uri),
            };
            console.log(photo)


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

            await getProfileFunction(true)

        } catch (e) {
            console.log('updatePhotoFunction error => ', e.toString())
        }

    }


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    style={{backgroundColor: 'white'}}
                    tintColor={Colors.yellowd}
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
                                    alignSelf                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       : 'center',
                                    alignItems: 'center'
                                }, getShadowCircleStyle(10, 10)]} mt={5} mb={10}>
                                    <View width={'100%'} height={'100%'} bgColor={'white'} alignItems={'center'}
                                          justifyContent={'center'}
                                          borderRadius={110} borderWidth={0.5}
                                          borderColor={"red.200"}>
                                        <Icon as={Entypo} name="camera" size={20} color={'gray.200'}/>
                                        <Text fontSize={12} color={Colors.yellow}>Sube tu foto aquí</Text>
                                    </View>
                                </View>

                    }
                </TouchableOpacity>

                <View style={getShadowCircleStyle(10, 10)}>

                </View>
                <Image source={Lineas} style={{
                    position: 'absolute',
                    resizeMode: 'stretch',
                    zIndex: -1,
                    width: '100%',
                    height: 150,
                }} alt="img"></Image>
            </View>


            {
                authDuck?.userSiteConfig &&
                <View flex={1} alignItems={'center'}>
                    <Text size={'md'} style={{color:'#FF5E00'}}>
                        {name} {lastName}
                    </Text>
                    <Text size={'sm'} mb={4}>
                        {email}
                    </Text>
                    <Text size={'sm'}>
                       Sitio khor: {authDuck?.userSiteConfig.khor_name}
                    </Text>
                    {
                        authDuck?.userSiteConfig?.department_name ? <Text size={'sm'}> Departamento: { authDuck?.userSiteConfig.department_name} </Text>: <></>
                    }

                    {
                        authDuck?.userSiteConfig?.employment_name ? <Text size={'sm'}> Puesto: { authDuck?.userSiteConfig.employment_name} </Text>: <></>
                    }

                </View>
            }


            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <FormControl  isInvalid w="100%">
                        {
                            !authDuck?.userSiteConfig && <>

                                <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                                    <Input
                                        size={'2xl'}
                                        h={50}
                                        isReadOnly={authDuck?.userSiteConfig}
                                        placeholder={'Nombre(s)'}
                                        borderRadius={25}
                                        value={name}
                                        onChangeText={val => setName(val)}
                                        backgroundColor={Colors.white}
                                        color={Colors.yellow}
                                        fontSize={18}
                                    />
                                </View>
                                <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                                    <Input
                                        size={'2xl'}
                                        height={50}
                                        isReadOnly={authDuck?.userSiteConfig}
                                        placeholder={'Apellidos'}
                                        borderRadius={20}
                                        value={lastName}
                                        onChangeText={val => setLastName(val)}
                                        backgroundColor={Colors.white}
                                        color={Colors.yellow}
                                        fontSize={18}
                                    />
                                </View>
                                <View flex={1} mb={4} style={getShadowCircleStyle(10, 10)}>
                                    <Input
                                        size={'2xl'}
                                        height={50}
                                        placeholder={'Correo electrónico'}
                                        borderRadius={20}
                                        value={email}
                                        isReadOnly={true}
                                        onChangeText={val => setEmail(val)}
                                        backgroundColor={Colors.white}
                                        color={Colors.yellow}
                                        fontSize={18}
                                    />
                                </View>
                            </>
                        }

                        {/*<Input size={'2xl'} height={50} mb={4} placeholder={'Contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.yellow} textAlign={'center'}/>*/}
                        {/*<Input size={'2xl'} height={50} mb={6} placeholder={'Confirmar contraseña'} borderRadius={20}*/}
                        {/*       placeholderTextColor={Colors.yellow} textAlign={'center'}/>*/}

                        {
                            !authDuck?.userSiteConfig && <View mb={8}>
                                <Text textAlign={'center'} fontSize={20} color={'gray.600'} mb={4}>{t('gender')}</Text>
                                <View flexDir={'row'} justifyContent={'space-between'} px={20}>
                                    <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                              value="danger" colorScheme="orange" isChecked={gender === 0 ? true : false}
                                              onChange={(v) => {
                                                  if (v) {
                                                      setGender(0)
                                                  }

                                              }}>
                                        <Text color={Colors.yellow} fontSize={12}>{t('fem')}</Text>
                                    </Checkbox>
                                    <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                              value="info" colorScheme="orange" isChecked={gender === 1 ? true : false}
                                              onChange={(v) => {
                                                  if (v) {
                                                      setGender(1)
                                                  }
                                              }}>
                                        <Text color={Colors.yellow} fontSize={12}>{t('male')}</Text>
                                    </Checkbox>
                                </View>

                            </View>
                        }


                        {
                            !authDuck?.userSiteConfig && <View mb={8}>
                                <Text textAlign={'center'} fontSize={20} color={'gray.600'} mb={4}>{t('profile_share_data')}</Text>
                                <View flexDir={'row'} justifyContent={'space-between'} px={20} mx={10}>
                                    <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                              value="danger" colorScheme="orange"
                                              isChecked={shareMyInfo === 1 ? true : false}
                                              onChange={(v) => {
                                                  if (v) {
                                                      setShareMyInfo(1)
                                                  }

                                              }}>
                                        <Text color={Colors.yellow} fontSize={12}>{t('yes')}</Text>
                                    </Checkbox>
                                    <Checkbox style={getShadowCircleStyle(5, 2)} borderRadius={10} borderWidth={0.5}
                                              value="info" colorScheme="orange" isChecked={shareMyInfo === 0 ? true : false}
                                              onChange={(v) => {
                                                  if (v) {
                                                      setShareMyInfo(0)
                                                  }
                                              }}>
                                        <Text color={Colors.yellow} fontSize={12}>{t('no')}</Text>
                                    </Checkbox>
                                </View>

                            </View>
                        }


                        {
                            !authDuck?.userSiteConfig && <>
                                <TouchableOpacity style={{marginVertical: 20}}
                                                  onPress={() => setModalPasswordUpdateVisible(true)}>
                                    <Text textAlign={'center'} size={'md'} color={Colors.yellow} textDecorationLine={'underline'}>{t('profile_upd_pass')}
                                    </Text>
                                </TouchableOpacity>
                                <Button isLoading={loading} colorScheme={Colors.yellow} onPress={() => updateProfileFunction()}
                                        mb={4}>{t('update')}</Button>
                            </>
                        }

                        <>  
                            <TouchableOpacity style={{marginVertical: 20}}
                                                  onPress={() => setModalDeleteAccountVisible(true)}>
                                    <Text textAlign={'center'} size={'md'} style={{color:'red'}} textDecorationLine={'underline'}>{t('profile_delete_account')}
                                    </Text>
                            </TouchableOpacity>
                        </>


                        <ModalPasswordUpdate action={updatePasswordFunction} visible={modalPasswordUpdateVisible}
                                             setVisible={setModalPasswordUpdateVisible}></ModalPasswordUpdate>

                        <ModalDeleteAccount visible={modalDeleteAccountVisible} withGoback={true} userId={authDuck.user.id}
                                             site={authDuck.userSiteConfig} setVisible={setModalDeleteAccountVisible}></ModalDeleteAccount>

                    </FormControl>

                </Stack>
            </View>
            <ModalError visible={modalErrorVisible} setVisible={setModalErrorVisible} text={modalErrorText}></ModalError>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(ProfileScreen);