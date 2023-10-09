import React,{useEffect,useState} from "react";
import { View,Text, Skeleton, Image } from "native-base";
import { SafeAreaView, Platform, Dimensions, TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
import { useRoute } from "@react-navigation/native";
import { MaterialIcons, FontAwesome5, } from "@expo/vector-icons";
import { getFontSize } from "../utils/functions";
import { getShadowCircleStyle } from "../utils/functions";

const {height, width} = Dimensions.get('window');


const StadisticPerson = ({userName,dateCreatedUser,image,currentStreakDay,myGoal,loading, isMyProfile, moveTo}) => {

    const route = useRoute();
    console.log('route',route.params)
    return(
        <View>
            <View flexDirection={'row'} style={{marginTop:60, marginLeft:60, marginRight: 40, paddingVertical:10}}>
                <View>
                    {loading ? (
                        <Skeleton lines={1} width={200} height={50}   />
                    ):(
                        <>
                            <Text fontSize={getFontSize(26)} style={{fontWeight:'700'}} textTransform={'capitalize'}>{userName}</Text>
                            <Text fontSize={getFontSize(13)}>Se unio el {dateCreatedUser}</Text>

                        </>

                    )}
                </View>
                {loading ? (
                    <View style={getShadowCircleStyle(10, 10)}>
                        <Skeleton endColor="warmGray.50" size="90" rounded="full" ml={3} />
                    </View>
                ): (
                    <TouchableOpacity  
                        onPress={() => isMyProfile ? moveTo(): console.log('Pressed')}
                        style={{width:75, height:75, backgroundColor:Colors.black, marginLeft: Platform.OS === 'ios' ? 30:40, borderRadius:37.5, justifyContent:'center', alignItems:'center', marginBottom:40}}>
                        <>
                            {image != null ? (
                                <Image  w={65} h={65} source={{uri: image}}
                                    style={[
                                        {resizeMode: 'cover'}]}
                                    borderRadius={32.5}  alt="img"/>
                            ) : (
                                <Image  w={65} h={65} source={require('../assets/profile-default.jpg')}
                                    style={[
                                        {resizeMode: 'cover'}]}
                                    borderRadius={32.5}  alt="img"/>
                            )}
                           {isMyProfile ? (
                                <View style={{backgroundColor:Colors.yellowV2, position:'absolute', top:0, right:5, width:24, height:24, borderRadius:12, justifyContent:'center',alignItems:'center'}}>
                                    <MaterialIcons name="edit" size={15} color={'black'}/>
                                </View>

                           ): null}
                        
                        </>
                    </TouchableOpacity>

                )}
            </View>

            <View style={{marginHorizontal:35}}>
                {loading ? (
                    <Skeleton.Text px="10" lines={1} mb={4} mt={3}/>
                ):(
                    <Text fontSize={getFontSize(26)} style={{fontWeight:'700', marginBottom:7}} textTransform={'capitalize'}>Estadísticas</Text>

                )}
                {loading ? (
                    <View flexDirection={'row'}>
                        <Skeleton lines={1} width={width/2.4} height={55}  mr={1} />
                        <Skeleton lines={1} width={width/2.4} height={55}  mb={3} />
                    </View>
                ):(
                    <View flexDirection={'row'}>
                        <View style={{width:width/2.4, height:55, backgroundColor:Colors.secondary,borderRadius:9, marginRight:5,  paddingLeft:15, flexDirection:'row', alignItems:'center' }}>
                            <FontAwesome5 name="fire-alt" size={23} color={'black'}/>
                            <View style={{marginLeft:8}}>
                                <Text fontSize={getFontSize(15)} style={{fontWeight:'900',}}>{currentStreakDay}</Text>
                                <Text fontSize={getFontSize(10)} style={{fontWeight:'900'}}>Días de racha</Text>
                            </View>
                        </View>
                        <View style={{width:width/2.4, height:55, backgroundColor:Colors.secondary, borderRadius:9, justifyContent:'center', alignItems:'center' }}>
                            <View>
                                <Text  fontSize={getFontSize(15)} style={{fontWeight:'900',}}>MIS ENGRANES</Text>
                                <Text fontSize={getFontSize(10)} style={{fontWeight:'900', alignSelf:'flex-start'}}>{myGoal}</Text>

                            </View>
                        </View>
                    </View>

                )}
            </View>
        </View>
    )
}

export default StadisticPerson;