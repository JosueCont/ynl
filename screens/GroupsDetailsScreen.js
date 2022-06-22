import React, {useEffect, useState} from "react";
import {Alert, RefreshControl, TouchableOpacity} from "react-native";
import {ScrollView, Text, View, Progress, Stack, Button, Skeleton} from "native-base";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";
import GroupsMemberItem from "./Groups/Components/GroupsMemberItem";
import {Colors} from "../utils/Colors";


const GroupsDetailsScreen = ({navigation, route}) => {

    const isFocused = useIsFocused();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [loadingStats, setLoadingStats] = useState(null);
    const [tabPosition, setTabPosition] = useState(0);
    const [name, setName] = useState(null);
    const [activeButton, setActiveButton] = useState(2)
    const [statsMembers, setStatsMembers] = useState(null)


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
            let membersArray = [];

            for (let item of response.data.data.requests) {
                // console.log(item)

                if (item.user){
                    membersArray.push({
                        id: item.user.id,
                        name: item.user.email,
                        status: item.status
                    })
                } else {
                    membersArray.push({
                        id: null,
                        name: item.public_email,
                        status: item.status
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

    const groupDeleteFunction = async (userId, groupId) => {
        try {
            const dataPost = {data: {groupId: groupId, member: userId}}
            const response = await ApiApp.deleteMemberGroup(dataPost);
            refreshView()
        } catch (e) {
            console.log("groupDeleteFunction error => ",e.toString())
        }
    }


    return (
        <View flex={1} px={2} style={{backgroundColor: Colors.gray}}>
            <ScrollView
                flex={1}
                nestedScrollEnabled={true}
                backgroundColor={'white'}
                borderRadius={10}
                pt={5}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => refreshView()}
                    />
                }>


                <Text textAlign={'center'} mb={2} color={Colors.red}>{name}</Text>

                <View mx={4}>
                    <View flexDir={'row'} mb={6}>
                        <TouchableOpacity style={{
                            marginRight: 10,
                            borderBottomWidth: tabPosition === 0 ? 1 : 0,
                            borderBottomColor: Colors.red,
                            paddingBottom: 10
                        }} onPress={() => setTabPosition(0)}>
                            <Text fontSize={18}>Detalles</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginHorizontal: 10,
                            borderBottomWidth: tabPosition === 1 ? 1 : 0,
                            borderBottomColor: Colors.red,
                            paddingBottom: 10
                        }} onPress={() => setTabPosition(1)}>
                            <Text fontSize={18}>Miembros</Text>
                        </TouchableOpacity>
                    </View>


                    {
                        tabPosition === 0 &&
                        <View p={0}>
                            <Button.Group  style={{marginBottom:60}} isAttached colorScheme="red" mx={{
                                base: "auto",
                                md: 0
                            }} size="sm">
                                <Button colorScheme={'orange'} onPress={() => {
                                    filter(1)
                                }} variant={activeButton === 1 ? 'solid' : 'outline'}>Semana anterior</Button>
                                <Button colorScheme={'orange'} onPress={() => {
                                    filter(2)
                                }} variant={activeButton === 2 ? 'solid' : 'outline'}>Semana</Button>
                                <Button colorScheme={'orange'} onPress={() => {
                                    filter(3)
                                }} variant={activeButton === 3 ? 'solid' : 'outline'}>Mes</Button>
                            </Button.Group>

                            {
                                (!loadingStats && statsMembers) && statsMembers.map((ele) => {
                                    return <>
                                        <Stack direction={"row"} mt={3}>
                                            <Text ml={3} width={'75%'} fontSize={'xs'}>{(ele.fullName && ele.fullName.includes('null'))?ele.username:ele.fullName}</Text>
                                            <Text ml={3} width={'30%'} fontSize={'xs'}>{Math.round(ele.value)}%</Text>
                                        </Stack>
                                        <Progress size={'xl'} colorScheme="warning" value={Math.round(ele.value)}/>
                                    </>
                                })
                            }

                            {
                                (!loadingStats && statsMembers) && statsMembers.length === 0 &&
                                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                        <Text fontSize={20} color="gray.300">Sin datos</Text>
                                    </View>
                            }

                            {
                                loadingStats && <>
                                    <Stack >
                                        <Skeleton  endColor="warmGray.50" width={'100%'} height={'20px'} rounded={10} />
                                        <Skeleton endColor="warmGray.50" width={'100%'} height={'20px'} rounded={10}  mt={5} />
                                        <Skeleton  endColor="warmGray.50" width={'100%'} height={'20px'} rounded={10}  mt={5} />
                                    </Stack>
                                </>
                            }

                        </View>

                    }
                    {
                        tabPosition === 1 &&
                        <View>
                            {
                                loading == false &&
                                members.map((item,i) => {
                                    return (
                                        <GroupsMemberItem 
                                        key={i}
                                        thisOwner ={item.id === route.params.thisOwner} 
                                        isOwner={route.params.isOwner} title={item.name}
                                        pending={(item.status === 0 || item.status === 2) ? true : false} 
                                        deleteAction={() => {
                                            Alert.alert(
                                                "Your Next Level",
                                                "¿Deseas desvincular al usuario del grupo?",
                                                [
                                                    {
                                                        text: "No",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "Eliminar",
                                                        onPress: () => groupDeleteFunction(item.id, route.params.groupId)
                                                    }
                                                ])
                                        }}/>
                                    )
                                })
                            }
                        </View>

                    }
                </View>
            </ScrollView>
            {tabPosition === 1 &&
            <View flex={0.1}>
                <Button colorScheme={'orange'} onPress={() => navigation.navigate('GroupsMembersAdd', {groupName: name, groupId:route.params.groupId, members: members, thisOwner:route.params.thisOwner, isOwner:route.params.isOwner, option:'add'})}>Agregar miembros</Button>
            </View>}
        </View>

    )
}


export default GroupsDetailsScreen;