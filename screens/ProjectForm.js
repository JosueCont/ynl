import {ScrollView , Text, View, HStack, Image, VStack, Progress, Center, Input, Spacer, TextArea, Skeleton, useToast, Box, Icon, KeyboardAvoidingView, Spinner } from 'native-base'
import { SafeAreaView, TouchableOpacity , StyleSheet, Dimensions, ActivityIndicator, Image as Img} from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { getProjectId, updProject, updProjectName } from '../redux/ducks/projectsDuck'
import { getProgressProject } from '../utils/functions'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons, AntDesign, MaterialIcons} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import {Keyboard, Platform, TouchableWithoutFeedback} from "react-native";
import FooterLines from '../components/FooterLines'
import ProjectItem from '../components/projects/ProjectItem'
import { SharePdfProject, printProject } from '../utils/functions'


import Accordion from 'react-native-collapsible/Accordion';

/* assetss */
import GoalIcon from '../assets/goal.png'
import CheckYellow from '../assets/check_yellow.png'
import CirclePlus from '../assets/plus.png'
import ObjetivoIcon from '../assets/objetivo_icon.png'
import PorQueIcon from '../assets/por_que_icon.png'
import ComoIcon from '../assets/como_icon.png'
import CuandoIcon from '../assets/cuando_icon.png'
import DondeIcon from '../assets/donde_icon.png'
import CuantoIcon from '../assets/cuanto_icon.png'



/* Assets */
import Logo from '../assets/new_logo.png'
import IconPlus from '../assets/icon_plus.png'
import SixPack from '../assets/six_pack.png'
import { Colors } from '../utils/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { html } from '../utils/Constants'

const ProjectForm = ({route, ...props}) => {

    const screenHeight = Dimensions.get("window").height;
    const dispatch = useDispatch()
    const loading = useSelector(state => state?.projectsDuck?.loading)
    const saving = useSelector(state => state?.projectsDuck?.saving)
    const books = useSelector(state => state?.booksDuck?.books)

    const [activeSections, setActiveSections] = useState([]);
    const [project, setProject] = useState(null)
    const [form, setForm] = useState({})
    const [updinfo, setUpdinfo] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    const navigation = useNavigation();
    const toast = useToast();

    const newProject = () => {
        navigation.navigate("ProjectsList", {new_project: true})
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const updFunction = async () => {
        const respUpd = await dispatch(updProject(route?.params?.project_id, {data:form}))
        setDataToForm(respUpd)
        setProject(respUpd)
        setUpdinfo(false)
    }

    useEffect(() => {
        if(updinfo){
            const delayInputTimeoutId = setTimeout(() => {
                    updFunction()
            }, 600);
            return () => clearTimeout(delayInputTimeoutId);
        }
      }, [form, 600]);

    const getCurrentProject = async () => {
        setUpdinfo(false)        
        const currentProject =  await dispatch(getProjectId(route?.params?.project_id))        
        setProject(currentProject)
        setDataToForm(currentProject)
        
    }


    const setDataToForm = (data) => {
        setForm({
            name: data?.attributes?.name,
            goal: data?.attributes?.goal,
            how: data?.attributes?.how,
            how_much: data?.attributes?.how_much,
            reason: data?.attributes?.reason,
            when: data?.attributes?.when,
            where: data?.attributes?.where
        })
    }

    useEffect(() => {
        setProject(null)
        setActiveSections([])
        setForm({})
        setUpdinfo(false)
        if (route?.params?.project_id) {
            getCurrentProject()
        }
    }, [route.params])
    

    const setSections = (sections) => {
        setActiveSections(sections.includes(undefined) ? [] : sections);
    };


  const renderHeader = (section, _, isActive) => {

    const validateIcon = (sec) => {
        if(form?.[sec.name]){    
          console.log('true')
            return true
        }else{
          console.log('no')
            return false
        }
         
    }

    //Accordion Header view
    return (
        <LinearGradient
        // Button Linear Gradient  131212
        colors={['#5E5C5C', '#5E5C5C']}
        style={{ marginTop:10, height:40, backgroundColor:'#4F4C4C', paddingHorizontal:10, borderRadius:12 }}
      > 
      <HStack justifyContent={'space-between'} paddingLeft={4} height={'100%'}>
        <View flexDirection={'row'} >
            <VStack justifyContent={'center'}>
                <Image
                    alt='goal' 
                    source={section?.icon} height={5} resizeMode='contain'
                />
            </VStack>
            <VStack justifyContent={'center'}>
                <Text style={styles.txtHeader} /* fontSize={'lg'}  */>
                    {section.title}
                </Text>
            </VStack>
        </View>
        <VStack justifyContent={'center'} >
              <Img
                alt='check'
                source={validateIcon(section) === true ? CheckYellow : CirclePlus}
                resizeMode='contain'
                height={6}
                width={6}
            />
        </VStack>
      </HStack>
      </LinearGradient>
    );
  };

  const changeTextForm = (section, val) => {
    setUpdinfo(true)
    setForm({...form, [section?.name] : val })
  }

  const renderContent = (section, _, isActive) => {
    return (
            <View style={{ borderColor: Colors.orange, borderWidth: 2, borderStyle:'solid', borderRadius:7 }} >
                    <TextArea backgroundColor={'transparent'}  onChangeText={(text) => changeTextForm(section, text) }  value={ form ? form[section?.name] : null} />
            </View>
    );
  };

    const CONTENT = [
        {
          title: 'OBJETIVO',
          name: 'goal',
          content: '',
          icon: ObjetivoIcon
        },
        {
            title: '¿POR QUÉ?',
            name: 'reason',
            content: '',
            icon: PorQueIcon
        },
        {
            title: '¿CÓMO?',
            name: 'how',
            content: '',
            icon: ComoIcon
        },
        {
            title: '¿CUÁNDO?',
            name: 'when',
            content: '',
            icon: CuandoIcon
        },
        {
            title: '¿DÓNDE?',
            name: 'where',
            content: '',
            icon: DondeIcon
        },
        {
            title: '¿CUÁNTO?',
            name: 'how_much',
            content: '',
            icon: CuantoIcon
        }
    ]

    /* const handler = useCallback(debounce(updName, 2000), []); */


    const updName = (val) => {
        console.log('val===>')
    }

    const onChange = (event) => {
        // perform any event related action here
        /* handler(); */
        // console.log('onChange', JSON.stringify(event))
        // console.log('form', JSON.stringify(form))
        setForm({...form, name: event })
        //setProjectName(event)
     };

     const updateProjectName = async (form) => {
        setSaveLoading(true)
        // console.log('form Name', JSON.stringify(form.name))        
        // console.log('id', JSON.stringify(route?.params?.project_id))
        const values = {
            name: form.name            
        }
        console.log('idUpdate', JSON.stringify(values))

        //await updProjectName(route?.params?.project_id, values)
        await updFunction();
        
        setTimeout(() => {
            toast.show({
                duration: 1000,
                render: () => {
                    return <Box bg="#5E5C5C" rounded="sm"> 
                    {/* //rgba(245, 172, 0, 0.5) */}
                        <Text color={"white"} fontSize={16} p={3}>Actualizado</Text>
                    </Box>;
                }
            });

            setSaveLoading(false)
        }, 1111)
        
        
     }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView showsVerticalScrollIndicator={false} position={"relative"}>
        <View
          paddingBottom={130}
          flex={1}
          mx={4}
          style={{ flexDirection: "column" }}
          minHeight={screenHeight}
        >
          <>
            <HStack justifyContent={"center"} p={1} marginTop={20}>
              <Image
                source={Logo}
                alt="question1"
                style={styles.logo}
                resizeMode="contain"
              />
            </HStack>
            <HStack justifyContent={"center"} mt={5} pb={4}>
              <VStack width={"80%"} space={3}>
                <HStack space={1}>
                  <Image
                    alt="sixPAck"
                    source={SixPack}
                    width={"20%"}
                    height={10}
                    resizeMode="contain"
                  />
                  <Input
                    placeholder="Mi proyecto"
                    width={"80%"}
                    height={10}
                    onChangeText={onChange}
                    borderRadius={12}
                    borderColor={Colors.yellowV2}
                    borderWidth={2}
                    value={loading ? null : form?.name}
                    //isReadOnly
                    InputRightElement={
                      saveLoading ? (
                        <Spinner color={Colors.yellowV2} style={{ marginRight :6 }} />
                        
                      ) : (
                        <Ionicons
                          style={{marginRight:4}}
                          size={20}
                          color={Colors.yellowV2}
                          name="md-save"
                          resizeMode="contain"
                          pl={10}
                          onPress={() => updateProjectName(form)}
                        />
                      )
                    }

                    // <Image alt='plus' source={IconPlus} width={7} height={7} resizeMode='contain' pl={10} />}
                  />
                </HStack>

                <Progress
                  value={getProgressProject(project)}
                  size={"md"}
                  bgColor={Colors.gray}
                  _filledTrack={{ bg: Colors.yellowV2 }}
                />
                {loading ? (
                  <VStack space={5}>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </VStack>
                ) : (
                  <Accordion
                    activeSections={activeSections}
                    sections={CONTENT}
                    expandMultiple={false}
                    touchableComponent={TouchableOpacity}
                    touchableProps={{ activeOpacity: 0.8 }}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    duration={300}
                    onChange={setSections}
                  />
                )}
              </VStack>
            </HStack>
            <HStack justifyContent={"center"}>
              <VStack space={2}>
                <TouchableOpacity
                  onPress={() => SharePdfProject(project)}
                  style={styles.buttonsAction}
                >
                  <Text style={styles.txtBtnAction} fontSize={"md"}>
                    COMPARTIR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => printProject(project)}
                  style={styles.buttonsAction}
                >
                  <Text style={styles.txtBtnAction} fontSize={"md"}>
                    DESCARGAR
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => newProject()}
                  style={styles.buttonsAction}
                >
                  <Text style={styles.txtBtnAction} fontSize={"md"}>
                    NUEVO PROYECTO
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonsAction}
                  onPress={() =>
                    navigation.navigate("ReadBook", { book_code: "six" })
                  }
                >
                  <Text style={styles.txtBtnAction} fontSize={"md"}>
                    CONSULTAR LIBRO
                  </Text>
                </TouchableOpacity>
              </VStack>
            </HStack>
          </>
        </View>
        
        <FooterLines />
   
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProjectForm

const styles = StyleSheet.create({
    inputName: {
        borderRadius: 12,
    },
    txtBtnAction:{
        textAlign:'center',
        color: Colors.white,
        fontFamily: 'Bebas-Regular'
    },
    txtHeader:{
        marginLeft: 10,
        fontFamily: 'ContractRegular',
        color: "#DCD7D7",
        height: 20,
        fontSize: 20,
        verticalAlign:'middle'
    },
    buttonsAction: { 
        backgroundColor: Colors.yellowV2, 
        paddingHorizontal:10, 
        paddingVertical:5,
        borderRadius: 2,
        shadowColor: "#B6840E",
        shadowOffset: {
            width: 5,
            height: 5,
         },
         shadowOpacity: 1,
         shadowRadius: 0,
         elevation: 5,
    }
})