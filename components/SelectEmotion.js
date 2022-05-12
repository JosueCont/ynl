import React, {useEffect, useState} from 'react'
import {Select} from "native-base";
import _ from "lodash";


const SelectEmotion=({parent,emotions,...props})=>{

    const [child, setChild]=useState(null)


    useEffect(() => {
        console.log(parent.id, 18)
        if (parent) {
            getListFromParent()
        }
    }, [parent])

    /**
     * Obtenemos un listado de emociones dado un id de parent
     * @returns {*[]}
     */
    const getListFromParent=()=>{
        try{
            console.log(Object.keys(emotions), 'linea 30')
            if(emotions){
                let newaarray =[];
                emotions.forEach((item,i)=> {

                    console.log(Object.keys(item), 'aqui es el keys')


                    console.log(parent.id, item.attributes.parent, 'linea 34')
                    if (_.get(item, 'attributes.parent.data.id', 0) === parent.id) {
                        console.log('linea 42')
                        newaarray.push(item)
                    }

                })

                console.log('setchild', newaarray)
                setChild(newaarray)
            }
        }catch (e){
            console.log('errors', e, 49, 'code')
        }
    }

    return (
        <Select borderColor="red.500" fontWeight="bold"
                fontSize={18}
                borderRadius={10}
                p={5}
                color={'gray.700'}
                onValueChange={itemValue => props.onSelectEmotion(itemValue)}
                accessibility={true}
                style={styleSelect} mb={2}
                placeholder={parent.attributes.name}>
            {
                child ? child.map((item, i) => {
                    return <Select.Item color={'black'} fontSize={20} fontWeight="bold" key={i} value={item.id}
                                        label={item.attributes.name}/>
                }) : null
            }
        </Select>
    )
}

const styleSelect={
    border:'red',
    padding:10
}

export default SelectEmotion;
