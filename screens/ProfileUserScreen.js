import React,{useState,useEffect} from "react";
import { View, Text, Image, Skeleton } from "native-base";
import { SafeAreaView, ScrollView, Dimensions, FlatList, StyleSheet, TouchableOpacity, Platform } from "react-native";
import {connect} from "react-redux";
import ApiApp from "../utils/ApiApp";
import { Colors } from "../utils/Colors";
import { getFontSize } from "../utils/functions";
import {useIsFocused} from "@react-navigation/native";
import {FontAwesome, Entypo, AntDesign, MaterialIcons, FontAwesome5, Ionicons} from "@expo/vector-icons";
import moment from "moment";
import SuggestionsFriendsItem from "../components/SuggestionFriendsItem";
import { useRoute } from "@react-navigation/native";
import { getShadowCircleStyle } from "../utils/functions";
import StadisticPerson from "../components/StadisticPerson";

const {height, width} = Dimensions.get('window');

const ProfileUserScreen = ({authDuck, navigation}) => {
    const isFocused = useIsFocused();
    const route = useRoute();
    const [userName, setUserNane] = useState(null)
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [currentStreakDay, setCurrentStreakDay] = useState(null);
    const [dateCreatedUser, setDateUser] = useState(null)
    const [isAllowSuggestions, setIsAllowSugges] = useState(false)
    const [suggestionFriends, setFriends] = useState([])
    const [myGoal, setGoal] = useState(null);
    const [marksDays, setMarksDays] = useState([]);
    const [isFollowSomeone, setFollowSomeone] = useState(false)

    //useEffect(() => {
    //    console.log('authDuck',authDuck.user)
    //    if(authDuck.user){
//
    //        getDataUser()
    //    }
    //},[])

    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            if(authDuck?.userSiteConfig?.id){
                getFriends() 
                setIsAllowSugges(true)
              }else {
                  setIsAllowSugges(false)
              }
        }
    }, [isFocused, isFollowSomeone])

    
    
    const getData = async() => {
        try {
            setLoading(true)
            await getPrifileData()
            await getDailyGoal()
            await getDays()
            await getCurrentStreak()

            setTimeout(() => {
                setLoading(false)
            }, 200)
        } catch (e) {
            console.log('error',e)
            setLoading(false)
        }
    }

    const getFriends = async() => {
        try {
            let dataSend = {
                siteId:authDuck?.userSiteConfig?.id ,
                userId: authDuck.user.id,
            }
            console.log('dataSendAmigos',dataSend)
            const response = await ApiApp.getFriendsSuggestions(dataSend)
            console.log('suggestions,', response.data)
            setFriends(response.data.data)
        } catch (e) {
            console.log('error al obtener sugerencias', e)
        }
    }

    const getCurrentStreak = async() => {
        try {
            let dataSend = {
                userId: authDuck.user.id,
                siteId: authDuck?.userSiteConfig?.id ? authDuck?.userSiteConfig?.id : null
            }
            //if(authDuck?.userSiteConfig?.id) dataSend.siteId = authDuck?.userSiteConfig?.id
            const response = await ApiApp.getMaxStreak(dataSend)
            if(response.data?.success)
                setCurrentStreakDay(response.data.data.totalDays)
            console.log('dias de racha',response.data)
        } catch (e) {
            console.log('error al obtener racha')
        }
    }

    const getDays = async() => {
        try {
            let dataSend = {
                "userId": authDuck?.user?.id 
            }
            if(authDuck?.userSiteConfig?.id) dataSend.siteId = authDuck?.userSiteConfig?.id
            const response = await ApiApp.getDaysInRow(dataSend);
            setMarksDays(response?.data?.data)
            console.log('response racha dias',response.data)
        } catch (e) {
            console.log('error al obtener racha',e)
        }
    }

    const getDailyGoal = async() => {
        try {
            let dataSend = {
                date:moment().format('YYYY-MM-DD'),
                userId: authDuck.user.id
            }
            const response = await ApiApp.getGoalDaily(dataSend)
            if(response.data?.data?.id){
                setGoal(response?.data?.data?.description)
            }else{
                setGoal('Ninguno por hoy')
            }
            console.log('Dail goal',response.data)
        } catch (e) {
            console.log('error daily goal',e)
        }
    }

    const getPrifileData = async() => {
        try {
            const response = await ApiApp.getProfile(authDuck.user.id)
            if(response?.data?.username){
                let firstName = response.data.firstName.split(' ');
                let lastName = response.data.lastName.split(' ');
                let dateCreated = moment(response.data.createdAt).format("DD [de] MMMM [del] YYYY");
                setImage(response?.data?.avatar?.url)
                setUserNane(`${firstName[0]} ${lastName[0]}`)
                setDateUser(dateCreated)
            }
            console.log('data',response)
        } catch (e) {
            console.log('error',e)
        }
    }

    //const getDataUser = () => {
    //    let firstname = authDuck?.user?.firstName.split(' ')[0];
    //    let lastName = authDuck?.user?.lastName.split(' ')[0];
    //    setUserNane(`${firstname} ${lastName}`)
    //    console.log('name',firstname,lastName)
    //    
    //}


    const days = [
        {name:'lun'},
        {name:'mar'},
        {name:'mié'},
        {name:'jue'},
        {name:'vie'},
        {name:'sab'},
        {name:'dom'},
    ]

    const getDaysInARow = () => {
        return days.map((item,index) => {
            const isDayMarked = marksDays.some((marcado) => {
                const dayName = moment(marcado.date).isoWeekday();
                return dayName -1 === index;
            });
            return(
                <View style={{marginRight:8}}>
                    <View justifyContent={'center'} alignItems={'center'}>
                        <FontAwesome5 name="calendar-day" size={25} color={Colors.gray}/>
                        {isDayMarked ? (
                            <FontAwesome5 name="fire-alt" size={18} color={Colors.yellowV2} style={{position:'absolute', bottom:0}}/>
                        ): null}
                        
                    </View>
                    <Text fontSize={getFontSize(11)} style={{fontWeight:'900', textTransform:'uppercase'}}>{item.name}</Text>
                </View>

            )
        })
    }

    const onSetActionFollow = async(id, follow) => {
        try {
            let dataSend = {
                userId: authDuck?.user?.id,
                //followId: id
            }
            if(follow){
                dataSend.unFollowId = id
                const response = await ApiApp.unFollowFriend(dataSend)
                if(response?.data?.success) setFollowSomeone(!isFollowSomeone)
                console.log('Se tiene que dejar de seguir', response.data)
            }else{
                dataSend.followId = id
                const response = await ApiApp.followFriend(dataSend);
                console.log('response follow',response.data)
                if(response?.data?.success) setFollowSomeone(!isFollowSomeone)
            }

        } catch (e) {
            console.log('error al seguir',e)
        }
    }

    const onDeletePerson = (id) => {
        const newArray = suggestionFriends.filter(item => item.id !== id)
        setFriends(newArray)
    }

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.scrollView}>
                    <StadisticPerson 
                        userName={userName}
                        dateCreatedUser={dateCreatedUser}
                        image={image}
                        currentStreakDay={currentStreakDay}
                        myGoal={myGoal}
                        loading={loading}
                        isMyProfile={true}
                        moveTo={() => navigation.navigate('Profile')}
                    />

                    {authDuck?.userSiteConfig?.id && suggestionFriends && suggestionFriends.length > 0 ? (
                        <View style={{marginHorizontal:35, marginTop:12, width: width/1.2}}>
                            {loading ? (
                                <Skeleton.Text px="10" lines={1} mb={4}/>
                            ) : (
                                <Text fontSize={getFontSize(26)} style={{fontWeight:'700', marginBottom:7}}>Sugerencias de amigos</Text>

                            )}
                            {loading ? (
                                <Skeleton lines={1} width={width/1.2} height={120} />
                            ): (
                                <FlatList 
                                    data={suggestionFriends}
                                    keyExtractor={(item,index) => index.toString()}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    snapToOffsets={[...Array(suggestionFriends.length)].map((x, i) => 158 * i + 180)}
                                    decelerationRate={0}
                                    snapToAlignment="center"
                                    contentContainerStyle={{
                                        height:120,
                                    }}
                                    renderItem={({item}) => (
                                        <SuggestionsFriendsItem 
                                            item={item}
                                            userId={authDuck.user.id}
                                            onSetActionFollow={(id,follow) =>  onSetActionFollow(id,follow)}
                                            changeRoute={(id,name, image) => navigation.navigate('ProfilePerson',{id,name,image})}
                                            deleteSuggestion={(id) => onDeletePerson(id)}
                                        />
                                        
                                )}
    
                            />

                            )}
                    </View>): null}

                    {loading ? (
                        <View justifyContent={'center'} alignItems={'center'}>
                            <Skeleton lines={1} width={width/1.2} height={91} mt={4}/>

                        </View>
                    ) : (
                        <View style={{marginHorizontal:35, backgroundColor:Colors.secondary, width:width/1.2, height:91, borderRadius:16,alignItems:'center', paddingTop:11,marginTop:21}}>
                            <Text fontSize={getFontSize(15)} style={{fontWeight:'900', textTransform:'uppercase'}}>Días de racha</Text>
                            <View flexDirection={'row'}>
                                {getDaysInARow()}
                            </View>
                        </View>

                    )}

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1, backgroundColor:Colors.white,
    }, 
    scrollView:{
        flexGrow: 1, backgroundColor: Colors.white
    }
})


const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState,{})(ProfileUserScreen);