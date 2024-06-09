import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Heading({text,isViewAll=false}) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {text}
      </Text>
      {isViewAll&& <Text style={{fontFamily:'Sniglet'}} >Ver Tudo</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    heading:{
        fontSize:20,
        fontFamily:'Sniglet',
        marginBottom:10
    },
})
