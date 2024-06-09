import { View, Text, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useUser } from '@clerk/clerk-expo';
import Colors from './../../Utils/Colors'
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native';
export default function ProfileScreen() {
 
  const {user}=useUser();
 const profileMenu=[
  {
    id:1,
    name:'Início',
    icon:'home'
  },
  {
    id:2,
    name:'Meus Agendamentos',
    icon:'bookmark-sharp'
  },
  {
    id:3,
    name:'Fale Conosco',
    icon:'mail'
  },
  {
    id:4,
    name:'Sair',
    icon:'log-out'
  }
 ]
  return (
    <View>
    <View style={{padding:20,paddingTop:30, backgroundColor:Colors.PRIMARY}}>
     <Text style={{fontSize:30,fontFamily:'Sniglet',color:Colors.WHITE}}>Perfil</Text>
      <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
       
      }}>
        <Image source={{uri:user.imageUrl}}
        style={{width:90,height:90, borderRadius:99}}
        />
        <Text style={{fontSize:26,marginTop:8,fontFamily:'Sniglet',
      color:Colors.WHITE}}>{user.fullName}</Text>
       <Text style={{fontSize:18,marginTop:8,fontFamily:'Sniglet',
      color:Colors.WHITE}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
    </View>

    <View style={{paddingTop:60}}>
      <FlatList
      data={profileMenu}
      renderItem={({item,index})=>(
        <TouchableOpacity style={{display:'flex',flexDirection:'row',
        alignItems:'center',gap:10,marginBottom:40,
        paddingHorizontal:80,
        }}>
          <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
          <Text style={{fontFamily:'Sniglet',
        fontSize:20,}}>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
    </View>
  )
}