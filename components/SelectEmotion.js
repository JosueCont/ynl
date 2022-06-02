import React, {useEffect} from 'react'
import {Select} from "native-base";


const SelectEmotion = ({item}) => {


    useEffect(() => {
        console.log(item, 12)
    }, [])

    return (
        <Select key={item.id} borderColor="red.500" fontWeight="bold"
                fontSize={18}
                borderRadius={10}
                p={5}
                color={'gray.700'}
                onValueChange={itemValue => console.log(itemValue)}
                accessibility={true}
                style={styleSelect} mb={2}>
            {/*placeholder={item.attributes.name}*/}
            
            <Select.Item label="UX Research" value="ux"/>
            <Select.Item label="Web Development" value="web"/>
            <Select.Item label="Cross Platform Development" value="cross"/>
            <Select.Item label="UI Designing" value="ui"/>
            <Select.Item label="Backend Development" value="backend"/>
            {/*{*/}
            {/*    child ? child.map((item, i) => {*/}
            {/*        return <Select.Item color={'black'} fontSize={20} fontWeight="bold" key={i} value={item.id}*/}
            {/*                            label={item.attributes.name}/>*/}
            {/*    }) : null*/}
            {/*}*/}
        </Select>
    )
}

const styleSelect = {
    border: 'red',
    padding: 10
}

export default SelectEmotion;
