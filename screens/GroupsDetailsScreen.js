import React, {useEffect, useState} from "react";
import {RefreshControl, TouchableOpacity} from "react-native";
import {ScrollView, Text, View, Progress, Stack, Button} from "native-base";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";
import GroupsMemberItem from "./Groups/Components/GroupsMemberItem";
import {Colors} from "../utils/Colors";


const GroupsDetailsScreen = ({route}) => {

    const isFocused = useIsFocused();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [tabPosition, setTabPosition] = useState(0);
    const [name, setName] = useState(null);
    const [activeButton, setActiveButton] = useState(2)


    useEffect(() => {
        if (isFocused) {
            getGroupsMembersFunction();
        }
    }, [isFocused])

    const filter = (option) => {
        // 1 - la semana anterior, 2 - la semana en curso, 3 el mes
        setActiveButton(option)
        //getCountFeelings(authDuck.user.id, option)

    }

    const getGroupsMembersFunction = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getGroupMembers(route.params.groupId)
            console.log(response.data.data);
            setName(response.data.data.group[0].name)
            let membersArray = [];

            for (let item of response.data.data.requests) {
                console.log(item)

                membersArray.push({
                    id: item.user.id,
                    name: item.user.email,
                    status: item.status
                })
            }

            for (let item of response.data.data.group[0].members) {
                membersArray.push({
                    id: item.id,
                    name: item.email,
                    status: 1
                })
            }
            setMembers(membersArray)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }


    return (
        <ScrollView
            flex={1}
            nestedScrollEnabled={true}
            backgroundColor={'white'}
            borderRadius={10}
            pt={5}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getGroupsMembersFunction()}
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


                        <Stack direction={"row"}>
                            <Text ml={5} width={'70%'} fontSize={'xs'}>Gaspar Dzul</Text>
                            <Text ml={5} width={'30%'} fontSize={'xs'}>40%</Text>
                        </Stack>
                        <Progress size={'xl'} colorScheme="warning" value={45} mx="4" />
                    </View>

                }
                {
                    tabPosition === 1 &&
                    <View>
                        {
                            loading == false &&
                            members.map((item) => {
                                return (
                                    <GroupsMemberItem title={item.name}
                                                      pending={(item.status === 0 || item.status === 2) ? true : false}/>
                                )
                            })
                        }
                    </View>

                }
            </View>
        </ScrollView>

    )
}


export default GroupsDetailsScreen;