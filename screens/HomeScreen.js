import React, {useEffect, useState} from "react";
import {Box, Text, Button, VStack, HStack} from "native-base";
import {connect} from "react-redux";
import {db, auth, initFirebase} from '../utils/firebase'
import productsDuck from "../redux/ducks/productsDuck";
import { doc, onSnapshot, collection, query, orderBy, where } from "firebase/firestore";
import {getAuth, signOut} from "firebase/auth";

const HomeScreen = ({productsDuck,navigation}) => {

    const [feelings,setFeelings] = useState(null)

    useEffect(() => {

        try{
            console.log("uid====",auth)

            const q = query(
                collection(db,'yourFeels'),
                where("createdBy","==", auth.currentUser.uid)
            )

            onSnapshot(q, (snapshot) => {
                const feel = [];

                snapshot.docs.map((doc)=>{
                    console.log('doc=====',doc._document)
                    feel.push(doc._document)
                })

                setFeelings(feel)

            })
        }catch (e){

        }


    }, [])



    const logOut=async ()=>{
        const auth = getAuth()
        await signOut(auth)
        navigation.navigate('Login')
    }

    return (
        <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <HStack>
                <VStack>
                    <Text color={'red.400'}>Bienvenido a YNL!</Text>
                    <Button  colorScheme={'red'} onPress={() => navigation.navigate('YourFeel')}>¿Cómo te sientes hoy?</Button>
                    <Text mb={3} size={'sm'} color={'red.400'}>Registros hasta el momento ({feelings ? feelings.length : 0})</Text>
                    <Button colorScheme={'red'} onPress={() => logOut()}>Cerrar Sesión</Button>
                </VStack>
            </HStack>


        </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HomeScreen);