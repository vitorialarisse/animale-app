import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import GlobalApi from '../../Utils/GlobalApi';
import BusinessListItem from './BusinessListItem';
import PageHeading from '../../Components/PageHeading';
export default function BusinessListByCategoryScreen() {
  const param=useRoute().params;
  const navigation=useNavigation()

  const [businessList,setBusinessList]=useState([]);
  useEffect(()=>{
  
  param&&getBusinessByCategory()
},[param])

/**
 * Últimos Serviços por Categorias
 */
  const getBusinessByCategory=()=>{
    GlobalApi.getBusinessListByCategory(param.category)
    .then(resp=>{
      setBusinessList(resp.businessLists);
    })
  }
  return (
    <View style={{padding:20,paddingTop:30}}>
      <PageHeading title={param.category} />
      <FlatList
      data={businessList}
      style={{marginTop:15}}
      renderItem={({item,index})=>(
        <BusinessListItem business={item} />
      )}
      />   
    </View>
  )
}