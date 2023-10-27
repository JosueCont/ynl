import { SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Button, HStack, Image, Text, VStack, View, ScrollView } from 'native-base'

import Logo from '../assets/new_logo.png'
import Phrase from '../assets/preguntas-09.png'
import CategoriesTree from '../assets/CategoriesTree.png'
import Tree from '../assets/tree.png'

import Icon1 from '../assets/icon_tree_1.png'
import Icon2 from '../assets/icon_tree_2.png'
import Icon3 from '../assets/icon_tree_3.png'
import Icon4 from '../assets/icon_tree_4.png'

import PersonalTxt from '../assets/personal_txt.png'
import IconPersonal from '../assets/icon_personal_white.png'

import ProfesionalTxt from '../assets/profesional_txt.png'
import IconProfesional from '../assets/icon_profesional_white.png'

import EmpresarialTxt from '../assets/empresarial_txt.png'
import IconEmpresarial from '../assets/icon_empresarial_white.png'

import EspiritualTxt from '../assets/espiritual_txt.png'
import IconEspiritual from '../assets/icon_espiritual_white.png'

const GoalTree = () => {

    const [catSelected, setCatSelected] = useState(null)

    const setPersonal = () => {
        if(catSelected === 1){
            setCatSelected(null)
        }else{
            setCatSelected(1)
        }
    }
    
    const setProfesional = () => {
        if(catSelected === 2){
            setCatSelected(null)
        }else{
            setCatSelected(2)
        }
    }

    const setEmpresarial = () => {
        if(catSelected === 3){
            setCatSelected(null)
        }else{
            setCatSelected(3)
        }
    }

    const setEspiritual = () => {
        if(catSelected === 4){
            setCatSelected(null)
        }else{
            setCatSelected(4)
        }
    }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false} >
            <View flex={1} mx={4} style={{ flexDirection: 'column' }}>
                <VStack>
                    <View>
                        <HStack justifyContent={'center'} p={1} marginTop={20}>
                            <Image
                                source={Logo}
                                alt='question1'
                                style={styles.logo}
                            />
                            </HStack>
                            <HStack marginTop={10}>
                                <Image key={1} resizeMode='cover' width={'100%'} height={12} source={Phrase} />
                            </HStack>
                            <View>
                                <Image key={1} resizeMode='contain' width={'100%'} source={CategoriesTree} />
                                <View style={styles.contentButtons}>
                                    <VStack justifyContent={'center'} width={'100%'} >
                                        <HStack justifyContent={'center'} zIndex={catSelected===1 ? 6 :1}  >
                                            <TouchableOpacity onPress={() => setPersonal()} >
                                                <Image source={Icon2} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <HStack zIndex={catSelected===2 ? 6 :1}>
                                            <TouchableOpacity onPress={() => setProfesional()}>
                                                <Image source={Icon1} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <HStack justifyContent={'flex-end'} paddingRight={10} zIndex={catSelected===3 ? 6 :1}>
                                            <TouchableOpacity onPress={() => setEmpresarial()}>
                                                <Image source={Icon3} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <HStack justifyContent={'center'} paddingLeft={16} paddingTop={8} paddingRight={10} zIndex={catSelected===4 ? 6 :1}>
                                            <TouchableOpacity onPress={() => setEspiritual()}>
                                                <Image source={Icon4} />
                                            </TouchableOpacity>
                                        </HStack>
                                        {/* cards */}
                                        {
                                            catSelected === 1 &&
                                            <HStack position={'absolute'} zIndex={5} top={5} justifyContent={'center'} width={'100%'}>
                                                <View width={'70%'} borderRadius={10} backgroundColor={'rgba(138,150,63,.92)'} padding={5}>
                                                    <VStack>
                                                        <HStack justifyContent={'center'}>
                                                            <View>
                                                                <HStack justifyContent={'center'} marginBottom={3} >
                                                                    <Image width={'20%'} height={10} resizeMode='contain'  source={IconPersonal}  />
                                                                    <Image width={'60%'} height={10} resizeMode='contain' source={PersonalTxt}  />
                                                                </HStack>
                                                            </View>
                                                        </HStack>
                                                        <Text textAlign={'center'} fontSize={14} style={{ fontWeight:'bold' }} >
                                                            ¿CUÁLES SON TUS NO NEGOCIABLES?
                                                        </Text>
                                                        <Text textAlign={'justify'} marginTop={3}>
                                                            "Uno de los grandes cambios realizados fue en todo aquello que integraba mi persona, hice un listado de todo aquello que tenía y quería cambiar, rutinas, hábitos, dietas, metodologías, plan de vida, evolución etc, dado esto la pregunta es constante, ¿Qué integra a Hiram como persona? Pero lo más importante ha sido conocer mis No negociables, y los tuyos ¿Cuáles son?"
                                                        </Text>
                                                    </VStack>    
                                                </View>
                                            </HStack>
                                        }
                                        {
                                            catSelected === 2 &&
                                            <HStack position={'absolute'} zIndex={5}  left={10}  width={'100%'}>
                                                <View width={'70%'} borderRadius={10} backgroundColor={'rgba(138,150,63,.92)'} padding={5}>
                                                    <VStack>
                                                        <HStack justifyContent={'center'}>
                                                            <View>
                                                                <HStack justifyContent={'center'} marginBottom={3} >
                                                                    <Image width={'10%'} height={10} resizeMode='contain'  source={IconProfesional}  />
                                                                    <Image width={'80%'} height={10} resizeMode='contain' source={ProfesionalTxt}  />
                                                                </HStack>
                                                            </View>
                                                        </HStack>
                                                        <Text textAlign={'center'} fontSize={14} style={{ fontWeight:'bold' }} >
                                                            ¿CUÁLES SON LOS NO TANGIBLES DE TU PROFESIÓN?
                                                        </Text>
                                                        <Text textAlign={'justify'} marginTop={3}>
                                                            "¡Ser profesional a toda costa! ¿En qué consiste ser profesional y que tus acciones lo sean? Resultados, indicadores, evaluaciones, opiniones. ¿Cuál es tu actividad diaria que te convierte en un profesional? ¿Qué integra tu profesión, no tu título?"
                                                        </Text>
                                                    </VStack>    
                                                </View>
                                            </HStack>
                                        }

                                        {
                                            catSelected === 3 &&
                                            <HStack position={'absolute'} justifyContent={'flex-end'} zIndex={5} right={16} marginRight={3} width={'100%'}>
                                                <View width={'70%'} borderRadius={10} backgroundColor={'rgba(138,150,63,.92)'} padding={5}>
                                                    <VStack>
                                                        <HStack justifyContent={'center'}>
                                                            <View>
                                                                <HStack justifyContent={'center'} marginBottom={3} >
                                                                    <Image width={'10%'} height={10} resizeMode='contain'  source={IconEmpresarial}  />
                                                                    <Image width={'80%'} height={10} resizeMode='contain' source={EmpresarialTxt}  />
                                                                </HStack>
                                                            </View>
                                                        </HStack>
                                                        <Text textAlign={'center'} fontSize={14} style={{ fontWeight:'bold' }} >
                                                            ¿EMPRENDER, PARA QUÉ?
                                                        </Text>
                                                        <Text textAlign={'justify'} marginTop={3}>
                                                            "Con el paso del tiempo encontré que la mayoría de las personas siempre están emprendiendo, desde proyectos personales, de negocios, de vida, etc. Lo triste es que la mayoría de estos planes también se quedan en el olvido, creando un desbalance en otras áreas. ¿Cómo integras esta área? ¿Sabes que eres emprendedor y puedes llegar a ser empresario?"
                                                        </Text>
                                                    </VStack>    
                                                </View>
                                            </HStack>
                                        }
                                        {
                                            catSelected === 4 &&
                                            <HStack position={'absolute'} justifyContent={'center'} bottom={8} zIndex={5} width={'100%'}>
                                                <View width={'70%'} borderRadius={10} backgroundColor={'rgba(138,150,63,.92)'} padding={5}>
                                                    <VStack>
                                                        <HStack justifyContent={'center'}>
                                                            <View>
                                                                <HStack justifyContent={'center'} marginBottom={3} >
                                                                    <Image width={'10%'} height={10} resizeMode='contain'  source={IconEspiritual}  />
                                                                    <Image width={'70%'} height={10} resizeMode='contain' source={EspiritualTxt}  />
                                                                </HStack>
                                                            </View>
                                                        </HStack>
                                                        <Text textAlign={'center'} fontSize={14} style={{ fontWeight:'bold' }} >
                                                            ¿QUÉ COMPONE TU ESPIRITUALIDAD?
                                                        </Text>
                                                        <Text textAlign={'justify'} marginTop={3}>
                                                        "La espiritualidad no consiste en saber lo que quieres, sino en comprender lo que no necesitas". En esta frase he basado esta área tan importante para su servidor, comprender que aquello que me hace viajar ligero es no llevar carga innecesaria me ofrece un regalo único y que está dentro de mí. ¿Qué elementos integran tu área espiritual?
                                                        "Cuanto más avanza la evolución espiritual de la humanidad, más seguro me parece que el camino hacia la genuina religiosidad no reside en el miedo a la vida, y el miedo a la muerte, y la fe ciega, sino a través del esfuerzo del conocimiento racional". Albert Einstein
                                                        </Text>
                                                    </VStack>    
                                                </View>
                                            </HStack>
                                        }
                                        
                                    </VStack>
                                </View>
                            </View>
                            <HStack justifyContent={'center'} zIndex={-1} paddingBottom={10}>
                                <Image resizeMode='contain'  height={20} source={Tree} />
                            </HStack>
                        </View>
                </VStack>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default GoalTree

const styles = StyleSheet.create({
    contentButtons: {
        position:'absolute',
        left:0,
        top:0,
        marginTop:80,
        width:'100%',
        height:'100%',
    },
    cardContentPersonal:{
        position:'absolute',
        width:'100%',
        top:115
    },
    Cards:{
        /* backgroundColor:'rgba(0,0,0,0.7)', */
        borderRadius:10,
        width:'80%',
    }
})