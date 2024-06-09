import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function BusinessListItemSmall({business}) {
  const navigation=useNavigation()
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigation.push('business-detail',{
      business:business
    })}>
      <Image source={{uri:business?.images[0]?.url}} 
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={{fontSize:17,
        fontFamily:'Sniglet'}}>{business?.name}</Text>
        <Text style={{fontSize:13,fontFamily:'Sniglet',
        color:Colors.GRAY}}>{business?.contactPerson}</Text>
        <Text style={{
            fontSize:10,
            fontFamily:'Sniglet',
            padding:3,
            color:Colors.PRIMARY,
            backgroundColor:Colors.PRIMARY_LIGHT,
            borderRadius:4,
            alignSelf:'flex-start',
            paddingHorizontal:7,
        }}>{business?.category.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:8,
        backgroundColor:Colors.WHITE,
        borderRadius:10,
    },
    infoContainer:{
        padding:3,
        display:'flex',
        gap:4
    },
    image:{
        width:160,
        height:100,
        borderRadius:10
    }
})