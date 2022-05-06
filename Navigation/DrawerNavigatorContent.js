import React, {useState} from 'react';
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {useRoute} from '@react-navigation/native';
import {connect} from "react-redux";
import {ImageBackground} from "react-native";
import sidebarImage from "../assets/sidebar.png";
import {Image, Text, View} from "native-base";
import logoSmall from "../assets/logoSmall.png";


const CustomDrawerContent = ({navigation, navigationDuck, accountDuck, ...props}) => {

    const route = useRoute();

    const [contentArray, setContentArray] = useState([]);
    const [contentArrayLength, setContentArrayLength] = useState(null);
    const [courses, setCourses] = useState(null);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //
    //             let coursesNotCurrent = _.filter(navigationDuck.courses, function (o) {
    //                 return o.id !== navigationDuck.courseId;
    //             });
    //
    //             let coursesNotApproved = _.filter(coursesNotCurrent, {approved: false});
    //             let coursesShuffle = _.shuffle(coursesNotApproved);
    //             let courses3Courses = _.take(coursesShuffle, 3);
    //
    //             setCourses(courses3Courses)
    //         } catch (ex) {
    //             console.log(26, ex)
    //         }
    //     })();
    // }, [navigationDuck.courseId])


    return (
        <DrawerContentScrollView
            bounces={false}
            {...props}
            nestedScrollEnabled={true}
            contentContainerStyle={{flex: 1}}
        >
            <ImageBackground source={sidebarImage} style={{flex: 1}}>
                <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                    <Image source={logoSmall}></Image>
                </View>
                <View flex={1} alignItems={'center'}>
                    <Text color={'white'} fontSize={20} my={2}>Mis grupos</Text>
                    <Text color={'white'} fontSize={20} my={2}>Mi avance</Text>
                    <Text color={'white'} fontSize={20} my={2}>Historial</Text>
                </View>
            </ImageBackground>

        </DrawerContentScrollView>
    );
}


const mapState = (state) => {
    return {
        navigationDuck: state.navigationDuck,
        accountDuck: state.accountDuck
    }
}

export default connect(mapState)(CustomDrawerContent);
