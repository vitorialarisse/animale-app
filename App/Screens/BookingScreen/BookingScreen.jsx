import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {PageHeading} from './../../Components/PageHeading'
import GlobalApi from '../../Utils/GlobalApi'
import { useUser } from '@clerk/clerk-expo'
import BusinessListItem from './../BusinessListByCategoryScreen/BusinessListItem'
export default function BookingScreen() {

  const {user}=useUser();
  const [bookingList,setBookingList]=useState([])
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    user&&getUserBookings();
  },[user])
 
  /**
   * Get User Bookings Agendamentos de Usuarios
   */
  const getUserBookings=()=>{
    setLoading(true)
    GlobalApi.getUserBookings(user.primaryEmailAddress.emailAddress).then(resp=>{
      setBookingList(resp.bookings);
      setLoading(false)
    })
  }
  return (
    <View style={{padding:20}}>
      <Text style={{fontFamily:'Sniglet',
      fontSize:24,
      padding:20}}>Meus Agendamentos</Text>

   <View>
    {bookingList?.length>0? <FlatList
      data={bookingList}
      onRefresh={()=>getUserBookings()}
      refreshing={loading}
      renderItem={({item,index})=>(
        <BusinessListItem 
        business={item?.businessList}
        booking={item}
            
          />
        )}
        />:
        <Text style={{fontFamily:'Sniglet',
        fontSize:25,textAlign:'center',marginTop:100}}>Agendamento não encontrado</Text>}
        </View>
    </View>
  )
}