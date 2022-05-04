import React, {useState} from 'react';
import {DrawerContentScrollView,} from "@react-navigation/drawer";
import {useRoute} from '@react-navigation/native';
import {connect} from "react-redux";


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
            {/*<View flex={1}>*/}

            {/*    <View flex={Platform.OS === 'ios' ? 0.061 : 0.091} alignItems={'center'} justifyContent={'center'}>*/}

            {/*        <Image*/}
            {/*            marginBottom={1}*/}
            {/*            source={_.has(accountDuck, 'companyLogo') ? {uri: accountDuck.companyLogo} : logo}*/}
            {/*               style={{width: 80, height: '94%', resizeMode: 'contain'}}></Image>*/}

            {/*    </View>*/}

            {/*    <View flex={1} backgroundColor={Colors.blue}>*/}

            {/*        <View flex={1} mx={5} mt={10}>*/}

            {/*            <TouchableHighlight*/}
            {/*                style={{height: 45, flexDirection: 'column', borderRadius: 5}}*/}
            {/*                underlayColor={Colors.green}*/}
            {/*                onPress={() => navigation.navigate('HomeScreen')}>*/}
            {/*                <View flex={1} flexDirection={'row'}>*/}
            {/*                    <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>*/}
            {/*                        <Icon as={Entypo} color={'white'} size={4} name={'home'}/>*/}
            {/*                    </View>*/}
            {/*                    <View style={{flex: 1, justifyContent: 'center'}}>*/}
            {/*                        <Text style={{color: 'white', fontSize: 14,}}>Inicio</Text>*/}
            {/*                    </View>*/}
            {/*                </View>*/}
            {/*            </TouchableHighlight>*/}

            {/*            <TouchableHighlight*/}
            {/*                style={{height: 45, flexDirection: 'column', borderRadius: 5}}*/}
            {/*                underlayColor={Colors.green}*/}
            {/*                onPress={() => navigation.navigate('Perfil')}>*/}
            {/*                <View flex={1} flexDirection={'row'}>*/}
            {/*                    <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>*/}
            {/*                        <Icon as={Entypo} color={'white'} size={4} name={'user'}/>*/}
            {/*                    </View>*/}
            {/*                    <View style={{flex: 1, justifyContent: 'center'}}>*/}
            {/*                        <Text style={{color: 'white', fontSize: 14,}}>Perfil</Text>*/}
            {/*                    </View>*/}
            {/*                </View>*/}
            {/*            </TouchableHighlight>*/}

            {/*            /!*<TouchableHighlight*!/*/}
            {/*            /!*    style={{*!/*/}
            {/*            /!*        height: 45,*!/*/}
            {/*            /!*        flexDirection: 'column',*!/*/}
            {/*            /!*        borderRadius: 5*!/*/}
            {/*            /!*    }}*!/*/}
            {/*            /!*    underlayColor={Colors.green}*!/*/}
            {/*            /!*    onPress={() => navigation.navigate('ScreensDemo')}>*!/*/}
            {/*            /!*    <View flex={1} flexDirection={'row'}>*!/*/}
            {/*            /!*        <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>*!/*/}
            {/*            /!*            <Icon as={Entypo} color={'white'} size={4} name={'grid'}/>*!/*/}
            {/*            /!*        </View>*!/*/}
            {/*            /!*        <View style={{flex: 1, justifyContent: 'center'}}>*!/*/}
            {/*            /!*            <Text style={{color: 'white', fontSize: 14,}}>Pantallas</Text>*!/*/}
            {/*            /!*        </View>*!/*/}
            {/*            /!*    </View>*!/*/}
            {/*            /!*</TouchableHighlight>*!/*/}

            {/*            /!* <TouchableHighlight*/}
            {/*                style={{*/}
            {/*                    height: 45,*/}
            {/*                    flexDirection: 'column',*/}
            {/*                    borderRadius: 5*/}
            {/*                }}*/}
            {/*                underlayColor={Colors.green}*/}
            {/*                onPress={() => {*/}
            {/*                    setAttribute('resetMode', !navigationDuck.resetMode)*/}
            {/*                }}>*/}
            {/*                <View flex={1} flexDirection={'row'}>*/}
            {/*                    <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center'}}>*/}
            {/*                        <Icon as={Entypo} color={'white'} size={4} name={'switch'}/>*/}
            {/*                    </View>*/}
            {/*                    <View style={{flex: 1, justifyContent: 'center'}}>*/}
            {/*                        <Text style={{color: 'white', fontSize: 14,}}>Reset</Text>*/}
            {/*                    </View>*/}
            {/*                </View>*/}
            {/*            </TouchableHighlight> *!/*/}
            {/*            */}
            {/*        </View>*/}

            {/*    </View>*/}
            {/*    {*/}
            {/*        (navigationDuck.inCourse && courses.length > 0) &&*/}


            {/*        <View flex={1} style={{flexDirection: 'column'}} backgroundColor={Colors.blue}>*/}
            {/*            <View flex={0.5} mx={5}>*/}
            {/*                <View flex={0.2}>*/}
            {/*                    <Text style={{color: 'white'}} fontFamily={'heading'} fontSize={16}>Otros cursos</Text>*/}
            {/*                </View>*/}

            {/*                <View flex={1}>*/}
            {/*                    {*/}
            {/*                        courses.map((item) => {*/}
            {/*                            return (*/}
            {/*                                <TouchableOpacity style={{flexDirection: 'row'}}*/}
            {/*                                                  key={item.id}*/}
            {/*                                    onPress={() => {*/}
            {/*                                    setAttribute('courseId', item.id)*/}
            {/*                                    navigation.navigate('CourseDetailStartScreen')*/}
            {/*                                }}>*/}
            {/*                                    <View*/}
            {/*                                        key={item.id}*/}
            {/*                                        flex={0.5} my={2} mr={2}>*/}
            {/*                                        <Image*/}
            {/*                                            style={{width: '80%', resizeMode: 'stretch'}}*/}
            {/*                                            source={{uri: item.imgThumb}}*/}
            {/*                                            height={50}*/}
            {/*                                            resizeMode={'contain'} borderRadius={5}/>*/}
            {/*                                    </View>*/}
            {/*                                    <View flex={1} justifyContent={'center'}>*/}
            {/*                                        <Text fontSize={11}>{item.title}</Text>*/}
            {/*                                    </View>*/}
            {/*                                </TouchableOpacity>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </View>*/}
            {/*            </View>*/}
            {/*        </View>*/}

            {/*    }*/}

            {/*    <View flex={0.1} backgroundColor={Colors.blue} alignItems={'center'}>*/}
            {/*        <Text style={{color: 'white'}} fontFamily={'body'} fontSize={11}>*/}
            {/*            {*/}
            {/*                platformResolve(`${Constants.manifest.version} (${Constants.manifest.ios.buildNumber})`, `${Constants.manifest.version} (${Constants.manifest.android.versionCode})`)*/}
            {/*            }*/}
            {/*        </Text>*/}
            {/*    </View>*/}


            {/*    /!*<View flex={1} mx={5} justifyContent={'center'} alignItems={'center'}>*!/*/}
            {/*    /!*    <Image source={imageDefaultGif} style={{resizeMode: 'contain', width: 150}}></Image>*!/*/}
            {/*    /!*</View>*!/*/}
            {/*</View>*/}

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
