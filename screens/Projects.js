import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Skeleton } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getProjects } from '../redux/ducks/projectsDuck'
import {useIsFocused} from "@react-navigation/native";


import FooterLines from '../components/FooterLines'
import ProjectItem from '../components/projects/ProjectItem'
import ModalNewProject from '../components/projects/ModalNewProject'

/* Assets */
import Logo from '../assets/new_logo.png'
import IconPlus from '../assets/icon_plus.png'
import SixPack from '../assets/six_pack.png'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RefreshControl } from 'react-native-gesture-handler';

const Projects = ({route, navigation, ...props}) => {

    const user_id = useSelector(state => state?.authDuck?.user?.id)
    const user = useSelector(state => state?.authDuck?.user)
    const dispatch = useDispatch()
    const isFocused = useIsFocused();

    const [refreshing, setRefreshing] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    
    const projectsList = useSelector(state => state?.projectsDuck?.projects) 
    const loading = useSelector(state => state?.projectsDuck?.loading) 
    const screenHeight = Dimensions.get("window").height;
    

    /* useEffect(() => {
        console.log('=============')
        
    }, []) */

    useEffect(() => {
        if (isFocused) {
            if(user_id)dispatch(getProjects(user_id))
            if (route?.params?.new_project == true) {
                setOpenModal(true)
            }
        }
    }, [isFocused])
    
    const refreshProjects = async () =>{
        setRefreshing(true)
        await dispatch(getProjects(user_id))
        setRefreshing(false)
    }
    

    const closeModal = () => {
        setOpenModal(false)
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView showsVerticalScrollIndicator={false} position={'relative'}
        refreshControl={<RefreshControl refreshing={refreshing}  onRefresh={refreshProjects} />}
      >
        <View flex={1} mx={4} style={{ flexDirection: 'column' }} minHeight={screenHeight}>
            <>
                <HStack justifyContent={'center'} p={1} marginTop={20}>
                <Image
                    source={Logo}
                    alt='question1'
                    style={styles.logo}
                    resizeMode='contain'
                />
                </HStack>
                <HStack justifyContent={'center'} mt={5} pb={130}>
                    <VStack width={'80%'} space={3}>
                        {
                            loading ?
                            <>
                                <Skeleton height={20} borderRadius={12} />
                                <Skeleton height={20} borderRadius={12} />
                            </>:
                            projectsList.map(item => (
                                <ProjectItem project={item} refreshProjects={refreshProjects} />
                            ))
                        }
                        <TouchableOpacity style={styles.addProjectBtn}
                            onPress={() => setOpenModal(true) }
                        >
                            <Image 
                                marginX={'auto'}
                                paddingY={7}
                                width={35}
                                height={35}
                                source={IconPlus}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                        <Center>
                            <Image 
                                source={SixPack}
                                width={100}
                                height={70}
                                resizeMode='contain'
                            />
                        </Center>
                    </VStack>
                </HStack>
            </>
        </View>
        <ModalNewProject isOpen={openModal} closeModal={closeModal} />
        <FooterLines />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Projects

const styles = StyleSheet.create({
    logo:{
        height: 50
    },
    cardProject:{
        width:'100%',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'gray',
        //background: 'transparent linear-gradient(180deg, #5E5C5C 0%, #131212 100%) 0% 0% no-repeat padding-box',
        borderRadius: 12
    },
    imageProject:{
        borderRadius:12,
        width: '50%',
        height: 100
    },
    titleProject:{
        paddingVertical:10,
        letterSpacing: 0,
        color: '#FFFFFF',
        opacity: 1,
        fontSize:20,
        resizeMode: 'cover',
        fontWeight:'bold'
    },
    addProjectBtn:{
        borderWidth: 2,
        borderStyle:'solid',
        borderColor: '#F5AC00',
        borderRadius:12,
        display:'flex',
        marginTop:20
    }
})