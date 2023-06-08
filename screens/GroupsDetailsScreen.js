import React, {useEffect, useState} from "react";
import {Alert, RefreshControl, TouchableOpacity} from "react-native";
import {
    ScrollView,
    Text,
    View,
    Progress,
    Stack,
    Button,
    Skeleton,
    Icon, HStack, VStack,useToast, Box
} from "native-base";
import {t} from 'i18n-js';
import { MaterialIcons } from "@expo/vector-icons";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";
import GroupsMemberItem from "./Groups/Components/GroupsMemberItem";
import {Colors} from "../utils/Colors";
import GroupsModalCreate from "./Groups/Components/GroupsModalCreate";
import ModalSuccess from "./Modals/ModalSuccess";


const GroupsDetailsScreen = ({navigation, route}) => {

    const isFocused = useIsFocused();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [loadingStats, setLoadingStats] = useState(null);
    const [tabPosition, setTabPosition] = useState(0);
    const [name, setName] = useState(null);
    const [activeButton, setActiveButton] = useState(2)
    const [statsMembers, setStatsMembers] = useState(null)
    const [updGroupName, setUpdGroupName] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [privateForUp, setPrivateForUp] = useState(false);
    const [nameForUp, setNameForUp] = useState("")
    const [idUpd, setIdUpd] = useState(null)
    const [modalSuccessVisible, setModalSuccessVisible] = useState(null);
    const [saving, setSaving] = useState(false)
    const [idOwnerAssigned, setIdOwnerAssigned] = useState(null)
    const [numMembersActive, setNumMembersActive] = useState(1)
    const toast = useToast();


    useEffect(() => {
        if (isFocused) {
            getGroupsMembersFunction();
            filter(activeButton)
        }
    }, [isFocused])

    const filter = (option) => {
        // 1 - la semana anterior, 2 - la semana en curso, 3 el mes
        setActiveButton(option)
        getGroupStats(option)
        // console.log('groupId: ', route.params.groupId)
    }

    const getGroupStats=async (option)=>{
        try{
            setLoadingStats(true)
            const response = await ApiApp.groupStats(route.params.groupId,option)
            setIdOwnerAssigned(route?.params?.thisOwner)
            // console.log('respuesta',response.data.data);
            setStatsMembers(response.data.data.membersArray)
        } catch (e) {
            console.log('GroupsDetailsScreen getGroupStats error => ',e.toString())
        }finally {
            setTimeout(()=>{
                setLoadingStats(false)
            },500)

        }
    }

    const refreshView=()=>{
        getGroupsMembersFunction();
        filter(activeButton)
    }

    const getGroupsMembersFunction = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getGroupMembers(route.params.groupId)
            setName(response.data.data.group[0].name)
            setIsPrivate(response.data.data.group[0].is_private)
            setIdUpd(response.data.data.group[0].id);
            let membersArray = [];

            for (let item of response.data.data.requests) {
                // console.log(item)
                if (item.user){
                    membersArray.push({
                        id: item.user.id,
                        name: item.user.email,
                        status: item.status,
                        request_id: item.id
                    })
                } else {
                    membersArray.push({
                        id: null,
                        name: item.public_email,
                        status: item.status,
                        request_id: item.id
                    })
                }

            }

            for (let item of response.data.data.group[0].members) {
                membersArray.push({
                    id: item.id,
                    name: item.email,
                    status: 1
                })
            }

            if (response?.data?.data?.group[0]?.members.length > 0){
              if(route?.params?.isOwner){
                setNumMembersActive(response.data.data.group[0].members.length + response.data.data.requests.length +1)
              }else{
                setNumMembersActive(response.data.data.group[0].members.length + 1)
              }
            }

            if (response.data.data.group[0].owner) {
                membersArray.push({
                    id: response.data.data.group[0].owner.id,
                    name: response.data.data.group[0].owner.email,
                    status: 1
                })
            }
            setMembers(membersArray)
        } catch (e) {
            console.log("getGroupsMembersFunction error =>",e.toString())
        } finally {
            setLoading(false)
        }
    }

    const groupDeleteFunction = async (userId, groupId, is_owner) => {
        try {
            const dataPost = {data: {groupId: groupId, member: userId, is_owner: is_owner}}
            const response = await ApiApp.deleteMemberGroup(dataPost);
            if (response?.data?.data){
              toast.show({
                duration: 2000,
                render: () => {
                    return <Box bg="emerald.500" rounded="sm">
                        <Text color={"white"} fontSize={16} p={3}>{userId === idOwnerAssigned ? 'Haz salido del grupo exitosamente': 'Se eliminó usuario exitosamente'}</Text>
                    </Box>;
                }
            });
            }

            // console.log(response?.data?.data)
            if (userId === idOwnerAssigned){
              navigation.goBack(0);
            }else{
              refreshView()
            }
        } catch (e) {
            console.log("groupDeleteFunction error => ",e.toString())
        }
    }

    const resendEmailFunction = async (item) => {
      try {
          const dataPost = {request_id: item.request_id}
          const response = await ApiApp.reSendEmailMemberGroup(dataPost);
          if (response?.data?.data === 'Ok'){
            toast.show({
              duration: 2000,
              render: () => {
                  return <Box bg="emerald.500" rounded="sm">
                      <Text color={"white"} fontSize={16} p={3}>{'Se reenvió correo de manera exitosa'}</Text>
                  </Box>;
                  }
              });
          }
          refreshView()
      } catch (e) {
          console.log("groupDeleteFunction error => ",e.toString())
      }
  }

    const openModalUpd = () => {
        setUpdGroupName(true);
        setNameForUp(name)
        setPrivateForUp(isPrivate)
    }

    const closeModalUpd = (flag) => {
        setUpdGroupName(flag);
        setNameForUp(null);
        setPrivateForUp(null)
    }

    const updGroup = async (value,isPrivate=false) => {
        try {
            
            let data = {
                data: {name: value, is_private: isPrivate}
            }
            setSaving(true)
            const response = await ApiApp.updGroup(idUpd, data);
            if(response.status === 200){
                closeModalUpd(false)
                setModalSuccessVisible(true);
                getGroupsMembersFunction();
                filter(activeButton);
                setSaving(false);
            }
        } catch (e) {
            console.log("groupAcceptInvite error =>",e.toString())
        }
    }


    return (
      <View flex={1} px={2} style={{ backgroundColor: Colors.gray }}>
        <ScrollView
          flex={1}
          nestedScrollEnabled={true}
          backgroundColor={"white"}
          borderRadius={10}
          pt={5}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => refreshView()}
            />
          }
        >
          <View
            style={{ justifyContent: "center", paddingHorizontal: 15}}
            flexDirection={"row"}
            display={"flex"}
          >
            <Text textAlign={"center"} size={'lg'} mb={2} color={Colors.red}>
              {name}
            </Text>
              {
                  route?.params?.isOwner &&
                  <TouchableOpacity
                      style={{
                          height: 20,
                          width: 20,
                          borderRadius: 20,
                          marginTop: "auto",
                          marginBottom: "auto",
                          marginLeft: 10,
                          backgroundColor: Colors.red2,
                      }}
                      onPress={() => openModalUpd()}
                  >
                      <Icon
                          as={MaterialIcons}
                          name="edit"
                          size={3}
                          margin={"auto"}
                          color={"white"}
                      />
                  </TouchableOpacity>
              }

          </View>

          <View mx={4}>
            <View flexDir={"row"} mb={6}>
              <TouchableOpacity
                style={{
                  marginRight: 10,
                  borderBottomWidth: tabPosition === 0 ? 1 : 0,
                  borderBottomColor: Colors.red,
                  paddingBottom: 10,
                }}
                onPress={() => setTabPosition(0)}
              >
                <Text fontSize={18}>{t('detail')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  borderBottomWidth: tabPosition === 1 ? 1 : 0,
                  borderBottomColor: Colors.red,
                  paddingBottom: 10,
                }}
                onPress={() => setTabPosition(1)}
              >
                <Text fontSize={18}>{t('members')} {numMembersActive && `(${numMembersActive})`} </Text>
              </TouchableOpacity>
            </View>

            {tabPosition === 0 && (
              <View p={0}>

                <Button.Group
                  style={{ marginBottom: 60 }}
                  isAttached
                  colorScheme="red"
                  mx={{
                    base: "auto",
                    md: 0,
                  }}
                  size="sm"
                >
                  <Button
                    colorScheme={"orange"}
                    onPress={() => {
                      filter(1);
                    }}
                    variant={activeButton === 1 ? "solid" : "outline"}
                  >
                      {t('dash_last_week')}
                  </Button>
                  <Button
                    colorScheme={"orange"}
                    onPress={() => {
                      filter(2);
                    }}
                    variant={activeButton === 2 ? "solid" : "outline"}
                  >
                      {t('week')}
                  </Button>
                  <Button
                    colorScheme={"orange"}
                    onPress={() => {
                      filter(3);
                    }}
                    variant={activeButton === 3 ? "solid" : "outline"}
                  >
                      {t('month')}
                  </Button>
                </Button.Group>
                  <Text>
                      {isPrivate && "Grupo privado"}
                  </Text>

                {!loadingStats &&
                  statsMembers &&
                  statsMembers.map((ele) => {
                    return (
                      <>
                        <Stack direction={"row"} mt={3}>

                          <Text ml={3} width={"75%"} pt={2} fontSize={"xs"}>
                              <Icon
                                  as={MaterialIcons}
                                  mr={5}
                                  pt={2}
                                  style={{color:Math.round(ele.value)>50?"green":Math.round(ele.value)==50?"orange":"red"}}
                                  name={Math.round(ele.value)>50?"sentiment-satisfied-alt":Math.round(ele.value)==50?"sentiment-neutral":"sentiment-dissatisfied"}
                              />
                              {'  '}

                            {ele.fullName && ele.fullName.includes("null")
                              ? ele.username
                              : ele.fullName}


                          </Text>

                          <Text ml={3} width={"30%"} fontSize={"md"}>


                            {' '+Math.round(ele.value)}%
                          </Text>

                        </Stack>
                        <Progress
                          size={"xl"}
                          colorScheme={Math.round(ele.value)>50?"green":Math.round(ele.value)==50?"orange":"red"}
                          value={Math.round(ele.value)}
                        />
                          <View flexDirection={'row'}>
                              <View style={{flex:1}}>
                                  <Icon
                                      as={MaterialIcons}
                                      name="minimize"
                                      size={3}
                                  />
                              </View>

                              <View  style={{flex:1}}>
                                  <Icon
                                      as={MaterialIcons}
                                      name="add"
                                      style={{alignSelf: "flex-end"}}
                                      size={3}
                                  />
                              </View>
                          </View>
                      </>
                    );
                  })}

                {!loadingStats && statsMembers && statsMembers.length === 0 && (
                  <View
                    flex={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={20} color="gray.300">
                        {t('no_data')}
                    </Text>
                  </View>
                )}

                {loadingStats && (
                  <>
                    <Stack>
                      <Skeleton
                        endColor="warmGray.50"
                        width={"100%"}
                        height={"20px"}
                        rounded={10}
                      />
                      <Skeleton
                        endColor="warmGray.50"
                        width={"100%"}
                        height={"20px"}
                        rounded={10}
                        mt={5}
                      />
                      <Skeleton
                        endColor="warmGray.50"
                        width={"100%"}
                        height={"20px"}
                        rounded={10}
                        mt={5}
                      />
                    </Stack>
                  </>
                )}
              </View>
            )}
            {tabPosition === 1 && (
              <View>
                {loading == false &&
                  members.map((item, i) => {
                    return (
                      <GroupsMemberItem
                        key={i}
                        thisOwner={item.id === route.params.thisOwner}
                        isOwner={route.params.isOwner}
                        title={item.name}
                        thisCurrentUser = {idOwnerAssigned ? item.id === idOwnerAssigned : false}
                        pending={
                          item.status === 0 || item.status === 2
                        }
                        deleteAction={(is_owner) => {
                          Alert.alert(
                            "Your Next Level",
                            item.id === idOwnerAssigned ? '¿Deseas salir del grupo?':t('groups_delete_member'),
                            [
                              {
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: item.id === idOwnerAssigned ? 'Salir':'Desvincular',
                                onPress: () =>
                                  groupDeleteFunction(
                                    item.id,
                                    route.params.groupId,
                                    is_owner
                                  ),
                              },
                            ]
                          );
                        }}
                        emailConfirmation={() => {
                          Alert.alert(
                            "Your Next Level",
                            `¿Deseas reenviar la invitación a ${item.name}?`,
                            [
                              {
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel",
                              },
                              {
                                text: 'Enviar',
                                onPress: () =>
                                resendEmailFunction(
                                    item
                                  ),
                              },
                            ]
                          );
                        }}
                      />
                    );
                  })}
              </View>
            )}
          </View>
        </ScrollView>
        {tabPosition === 1 && route.params.isOwner && (
          <View flex={0.1}>
            <Button
              colorScheme={"orange"}
              onPress={() =>
                navigation.navigate("GroupsMembersAdd", {
                  groupName: name,
                  groupId: route.params.groupId,
                  members: members,
                  thisOwner: route.params.thisOwner,
                  isOwner: route.params.isOwner,
                  option: "add",
                })
              }
            >
                {t('groups_add_member')}
            </Button>
          </View>
        )}
        <GroupsModalCreate
          visible={updGroupName}
          setVisible={closeModalUpd}
          isUpd={true}
          privateGroup={privateForUp}
          name={nameForUp}
          action={updGroup}
          loading={saving}
        />
        <ModalSuccess
        text={"Grupo actualizado"}
        visible={modalSuccessVisible}
        setVisible={setModalSuccessVisible}
        />
      </View>
    );
}


export default GroupsDetailsScreen;