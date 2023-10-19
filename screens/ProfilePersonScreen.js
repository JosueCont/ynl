import React,{useEffect,useState} from "react";
import { View,Text, Skeleton } from "native-base";
import { SafeAreaView } from "react-native";
import { Colors } from "../utils/Colors";
import { useRoute } from "@react-navigation/native";
import {useIsFocused} from "@react-navigation/native";
import {FontAwesome, Entypo, AntDesign, MaterialIcons, FontAwesome5, Ionicons} from "@expo/vector-icons";
import StadisticPerson from "../components/StadisticPerson";
import ApiApp from "../utils/ApiApp";
import {connect} from "react-redux";
import moment from "moment";

const ProfilePersonScreen = ({authDuck,navigation}) => {
    const isFocused = useIsFocused();
    const route = useRoute();
    const [userName, setUserNane] = useState(null)
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [dateCreatedUser, setDateUser] = useState(null)
    const [myGoal, setGoal] = useState(null);
    const [currentStreakDay, setCurrentStreakDay] = useState(null);


    useEffect(() => {
        if (isFocused) {
            getData()
        }
    }, [isFocused])

    const getData = async() => {
        try {
            setLoading(true)
            await getPrifileData()
            await getDailyGoal()
            //await getDays()
            await getCurrentStreak()

            setTimeout(() => {
                setLoading(false)
            }, 200)
        } catch (e) {
            console.log('error',e)
            setLoading(false)
        }
    }

    const getPrifileData = async() => {
        try {
            const response = await ApiApp.getProfile(route?.params?.id)
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

    const getDailyGoal = async() => {
        try {
            let dataSend = {
                date:moment().format('YYYY-MM-DD'),
                userId: route?.params?.id
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

    const getCurrentStreak = async() => {
        try {
            let dataSend = {
                userId: route?.params?.id,
                siteId:null
            }
            //if(authDuck?.userSiteConfig?.id) dataSend.siteId = authDuck?.userSiteConfig?.id
            const response = await ApiApp.getMaxStreak(dataSend)
            if(response.data?.success)
                setCurrentStreakDay(response.data.data.totalDays)
        } catch (e) {
            console.log('error al obtener racha',e)
        }
    }
    console.log('route',route.params)
    return(
        <SafeAreaView style={{flex:1, backgroundColor:Colors.white}}>
            <StadisticPerson 
                userName={userName}
                dateCreatedUser={dateCreatedUser}
                image={image}
                currentStreakDay={currentStreakDay}
                myGoal={myGoal}
                loading={loading}
                isMyProfile={false}
            />
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState,{})(ProfilePersonScreen);