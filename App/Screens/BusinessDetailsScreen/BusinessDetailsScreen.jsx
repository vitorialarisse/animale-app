import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Modal, Linking, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Components/Heading'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import BusinessPhotos from './BusinessPhotos';
import BusinessAbout from './BusinessAbout';
import BookingModal from './BookingModal';


export default function BusinessDetailsScreen() {
  const param=useRoute().params;
  const [business,setBusiness]=useState(param.business);
  const [showModal,setShowModal]=useState(false)
  const navigation=useNavigation();
  useEffect(()=>{


  },[])
  //'mailto:someone@example.com?subject=Hello&body=Hello%20there!'
  
  const onMessageBtnClick=()=>{
    Linking.openURL('mailto:'+business?.email+"?subject=Gostaria de um orçamento&body=Olá,");
  }
  return business&&(
    <View>
    <SafeAreaView style={{height:'91%'}}>
      <ScrollView>
      <TouchableOpacity style={styles.backBtnContainer}
      onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>
        <Image source={{uri:business?.images[0]?.url}}
          style={{width:'100%',height:300}}
        />
        <View style={styles.infoContainer}>
          <Text style={{fontFamily:'Sniglet',
            fontSize:25}}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={{fontFamily:'Sniglet',
              color:Colors.PRIMARY,fontSize:18}}>
                {business?.contactPerson}  🐾</Text>
            <Text style={{fontFamily:'Sniglet',color:Colors.PRIMARY,backgroundColor:Colors.PRIMARY_LIGHT,
            padding:4,borderRadius:5,fontSize:14}}>{business?.category.name}</Text>
          </View>
          <Text style={{fontFamily:'Sniglet',fontSize:17,color:Colors.GRAY}}>
          <Ionicons name="location-sharp" size={22} 
        color={Colors.PRIMARY} /> {business?.address}</Text>
      
        {/* Linha Horizontal  */}
        <View style={{borderWidth:0.5,borderColor:Colors.GRAY,marginTop:20,
          marginBottom:20}}></View>

        {/* Seção Sobre  */}
          <BusinessAbout business={business}/>
        
         {/* Linha Horizontal  */}
         <View style={{borderWidth:0.5,borderColor:Colors.GRAY,marginTop:20,
          marginBottom:20}}></View>

          <BusinessPhotos business={business} />
        </View>
        </ScrollView>
    </SafeAreaView>
    <View style={{
      diplay:'flex',
      flexDirection:'row',
      margin:8,
      gap:8
    }}>
      <TouchableOpacity style={styles.messagebtn}
      onPress={()=>onMessageBtnClick()}
      >
        <Text style={{
          textAlign:'center',
          fontFamily:'Sniglet',
          color:Colors.PRIMARY,
          fontSize:14
        }}>Mensagem</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookingbtn}
      onPress={()=>setShowModal(true)}>
        <Text style={{
          textAlign:'center',
          fontFamily:'Sniglet',
          color:Colors.WHITE,
          fontSize:14
        }}>Agendar</Text>
      </TouchableOpacity>
    </View>

    {/* Tela Modal Agendar  */}
    <Modal
    animationType='slide'
    visible={showModal}
    >
      <BookingModal 
      businessId={business.id}
      hideModal={()=>setShowModal(false)}/>

    </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  backBtnContainer:{
    position:'absolute',
    zIndex:10,
    padding:20
  },
  infoContainer:{
    padding:20,
    display:'flex',
    gap:7
  },
  subContainer:{
    display:'flex',
    flexDirection:'row',
    gap:5,
    alignItems:'center'
  },
  messagebtn:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1
  },
  bookingbtn:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    borderWidth:1,
    borderColor:Colors.PRIMARY,
    borderRadius:99,
    flex:1
  }
})