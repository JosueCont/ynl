import React, {useEffect, useState} from "react";
import {Box, FlatList, Text, VStack,HStack, Image, Slider, Icon, Button, Input, Divider, Heading, Spinner,Badge, Avatar, Spacer} from "native-base";
import {Alert, ScrollView,ImageBackground,TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import logo from '../../assets/logo.png'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import groupicon from '../../assets/groupicon.png'
import groupDuck, {getUsersByUserName} from '../../redux/ducks/groupDuck'
import authDuck from '../../redux/ducks/authDuck'
import backgroundGroup from '../../assets/backGroups.png'
import _  from 'lodash'

const AddMemberScreen = ({navigation,route,groupDuck, authDuck,getUsersByUserName}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [usersSelected, setUsersSelected] = useState([])

    useEffect(()=>{
        getUsersByUserName()
    },[])

    useEffect(()=>{
        if(authDuck.isLogged){
            setUser(authDuck.user)
        }
    },[authDuck])


    useEffect(()=>{
        if(route.params){
            setGroupName(route.params.groupName)
        }
    },[route.params])

    const registerGroup=()=>{
        console.log(groupName)
    }

    const searchUsers=async (text)=>{
        console.log('text:',text)
        try{
            const res = await getUsersByUserName(text.trim())
        }catch (e){
            console.log(e)
        }
    }

    const addUserToList=(user)=>{
        console.log(_.uniq([...usersSelected,user]))
        let newArray =_.uniq([...usersSelected,user])
        //validamos si ya fue seleccionado previamente
        if(isUserSelected(user)){
            newArray = _.remove(newArray, function(u) {
                return u.id!==user.id;
            });
            setUsersSelected(newArray)
            //eliminamos al elemento previamente seleccionado
        }else{
            setUsersSelected(newArray)
        }

    }

    const isUserSelected=(user)=>{
         const idx = _.findIndex(usersSelected, function(o) { return o.id === user.id; });
         if(idx>=0){
             return true
         }
         return false
    }

    const getNameUsr=(usrID)=>{
        try{
            const  data =   _.find(groupDuck.users, { 'id':usrID});
            console.log('dato usuario',data)
            return data.username
        }catch (e){

        }

    }

    function ListUsers(){
        return <HStack flex={1} w={'100%'}>
                <VStack w={'100%'}>
                    <HStack mb={5} w={'100%'}>
                        {
                            usersSelected ? usersSelected.map((ele,i)=>{
                                return <Text borderRadius={20} style={{backgroundColor:'#FD5535',padding:5, color:'white'}}  fontSize={10} ml={1}>{ele.username}</Text>
                            }):null
                        }
                    </HStack>

                    <Text size={'sm'}>Sugerencias</Text>
                    <FlatList data={groupDuck.users} renderItem={({
                                                           item
                                                       }) => <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                        <TouchableOpacity onPress={()=>addUserToList(item)}>
                            <HStack  w={'100%'} space={3} justifyContent="space-between">
                                <Avatar bg={'red.100'} mr={1} size="30px"></Avatar>
                                <VStack>
                                    <Text size={'md'} color="coolGray.800" bold>
                                        {item.username}
                                    </Text>
                                    <Text size={'sm'} color="coolGray.800" bold>
                                        {item.email}
                                    </Text>
                                </VStack>
                                <Spacer />
                                {
                                    isUserSelected(item)?<Ionicons size="20" color={'red'} name="ios-checkmark-circle" />
                                        :<Ionicons size="20" color={'red'} name="ios-radio-button-off-outline" />
                                }
                            </HStack>
                        </TouchableOpacity>

                    </Box>} keyExtractor={item => item.id} />
                    <Button onPress={registerGroup} isDisabled={usersSelected.length<=0} size="lg" colorScheme={'red'} m={3}>
                        Crear
                    </Button>
                </VStack>
        </HStack>
    }

    return (
        <Box felx={1} bg="#fff" alignItems="center">
            <ScrollView w={'100%'} h={'100%'}>
                <HStack justifyContent={'center'} p={3}>
                    <VStack alignItems={'center'}>
                        <Image size={'xs'} source={logo} />
                        <VStack my="4" space={5} w="100%" maxW="350px">
                            <VStack w="100%" space={5} alignSelf="center">
                                <Input placeholder={`Buscar amigos para añadir a ${groupName}`}
                                       width="100%"
                                       height={10}
                                       autoCapitalize="none"
                                       borderRadius="10"
                                       py="1" px="2"
                                       borderWidth="2"
                                       clearButtonMode="never"
                                       onChangeText={_.debounce(searchUsers,1000)}
                                       borderColor={'red.500'}
                                       InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} />
                                <Divider />
                            </VStack>
                        </VStack>
                        {
                            groupDuck.fetchingUsers ?
                                <Spinner size="sm"  color={'red.400'}/>:
                                <ListUsers/>
                        }
                    </VStack>
                </HStack>
            </ScrollView>
        </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}

const styles={
    image: {
        flex: 1,
        justifyContent: "center",
        height:'100%',
        width:'100%',
    },
}

export default connect(mapState,{getUsersByUserName})(AddMemberScreen);