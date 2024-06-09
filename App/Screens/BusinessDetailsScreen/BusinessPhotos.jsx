import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Heading from '../../Components/Heading'

export default function BusinessPhotos({business}) {
  return (
    <View>
      <Heading text={'Galeria'} />
      <FlatList
      data={business.images}
      numColumns={2}
      renderItem={({item})=>(
        <Image source={{uri:item.url}}
            style={{width:'100%',flex:1,
            borderRadius:15,
            margin:7,
            height:200}}
        />
      )}
      />
    </View>
  )
}