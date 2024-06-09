import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Heading from '../../Components/Heading'
import Colors from '../../Utils/Colors';

export default function BusinessAbout({business}) {
    const [isReadMore,setIsReadMore]=useState(false);
    return business&&(
    <View>
        <Heading text={'Sobre'}/>
        <Text style={{fontFamily:'Sniglet',
        lineHeight:25, textAlign:'justify',
        color:Colors.GRAY,fontSize:14}} 
        numberOfLines={isReadMore?20:5}>{business.about}</Text>
        <TouchableOpacity onPress={()=>setIsReadMore(!isReadMore)}>
        <Text style={{color:Colors.PRIMARY,
        fontSize:14,fontFamily:'Sniglet'}}>
          {isReadMore?'Ler Menos':'Ler Mais'}</Text>
        </TouchableOpacity>
        </View>
  )
}