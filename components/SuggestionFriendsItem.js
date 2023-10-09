import React,{useState,useEffect} from "react";
import { View, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
import {FontAwesome, Entypo, AntDesign, MaterialIcons, FontAwesome5, Ionicons} from "@expo/vector-icons";
import { getFontSize } from "../utils/functions";
import { Colors } from "../utils/Colors";

const SuggestionsFriendsItem = ({item,userId,onSetActionFollow, changeRoute, deleteSuggestion}) => {
    const [image, setImage] = useState(null)
    const [isFollowing, setIsFoloowing ] = useState(false)

    useEffect(() => {
        getData()
    },[item.follows])

    const getData = () => {
        if(item?.avatar?.url){
            setImage(item?.avatar?.url)
        }
        console.log('isFollow',item.follows.length)
        if(item.follows.length > 0) setIsFoloowing(true)
        else setIsFoloowing(false)
    }

    //const onSetActionFollow = async(id) => {
    //    try {
    //        let dataSend = {
    //            follower: userId,
    //            following: id
    //        }
    //        console.log('data a seguir',dataSend)
    //    } catch (e) {
    //        
    //    }
    //}

    return(
        <View backgroundColor={Colors.secondary} style={{marginRight:8, width:85, borderRadius:9, padding:10,}}>
            <TouchableOpacity onPress={() => deleteSuggestion(item.id)}>
                <Ionicons name="md-close" size={12} color={'black'} style={{alignSelf:'flex-end', }}/>
            </TouchableOpacity>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                    onPress={() => changeRoute(item.id,item.firstName,item?.avatar?.url)}
                    style={{width:45, height:45, justifyContent:'center', alignItems:'center'}}>
                    {image != null ? (
                        <Image w={40} h={40} source={{uri: image}}
                            style={[
                                {resizeMode: 'cover', flex:1}]}
                            borderRadius={20}  alt="img"/>
                    ):(
                        <Image w={40} h={40} source={require('../assets/profile-default.jpg')}
                            style={[
                                {resizeMode: 'cover', flex:1}]}
                            borderRadius={20}  alt="img"/>
                    )}

                </TouchableOpacity>
                <Text fontSize={getFontSize(9)} style={{fontWeight:'900'}}>{item.firstName}</Text>
                <Text fontSize={getFontSize(6)} style={{fontWeight:'500', letterSpacing:0}}>Entre tus contactos</Text>
                <TouchableOpacity 
                    onPress={() => onSetActionFollow(item.id,isFollowing)}
                    style={{width:33,height:12, backgroundColor:Colors.yellowV2, borderRadius:2, justifyContent:'center',alignItems:'center', marginTop:5}}>
                    <Text fontSize={getFontSize(6)} color={Colors.white}>{isFollowing ? 'Desseguir' : 'Seguir'}</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SuggestionsFriendsItem;