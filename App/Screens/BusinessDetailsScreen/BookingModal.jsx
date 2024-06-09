import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import PageHeading from '../../Components/PageHeading'
import { Ionicons } from '@expo/vector-icons';
import CalendarPicker from "react-native-calendar-picker";
import Colors from '../../Utils/Colors';
import Heading from '../../Components/Heading';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import GlobalApi from '../../Utils/GlobalApi';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';
export default function BookingModal({businessId,hideModal}) {

    const [timeList,setTimeList]=useState();
    const [selectedTime,setSelectedTime]=useState();
    const [selectedDate,setSelectedDate]=useState();
    const [note,setNote]=useState();
    const {user}=useUser();
    useEffect(()=>{
        getTime();
    },[])
    
    const getTime=()=>{
        const timeList=[];
        for(let i=9;i<=12;i++)
            {
                timeList.push({
                    time:i+':00'
                })
                timeList.push({
                    time:i+':30'
                })
            }
            for(let i=14;i<=17;i++)
                {
                    timeList.push({
                        time:i+':00'
                    })
                    timeList.push({
                        time:i+':30'
                    })
                }
                setTimeList(timeList);
    }

    // Criar Agendamento
    const createNewBooking=()=>{
        if(!selectedTime||!selectedDate)
            {
            ToastAndroid.show('Por favor escolha data e horário ',ToastAndroid.LONG)
                
                return ;
            }
        const data={
            userName:user?.fullName,
            userEmail:user?.primaryEmailAddress.emailAddress,
            time:selectedTime,
            date:moment(selectedDate). format('DD-MM-yyyy'),
            businessId:businessId
        }
        GlobalApi.createBooking(data).then(resp=>{
            console.log("Resp",resp);
            ToastAndroid.show('Agendado com sucesso!',ToastAndroid.LONG)
            hideModal();
        })
    }
  return (
    <ScrollView>
    <KeyboardAvoidingView style={{padding:20}}>
    <TouchableOpacity style={{display:'flex',flexDirection:'row',gap:10,
    alignItems:'center',marginBottom:20}}
      onPress={()=>hideModal()}
    >
        <Ionicons name="arrow-back-outline" size={30} color="black" />
        <Text style={{fontSize:25,fontFamily:'Sniglet'}}>
            Agendar</Text> 
    </TouchableOpacity>

    {/* Seção Calendário  */}
    <Heading text={'Escolha uma data'}/>
    <View style={styles.calendarContainer}>
    <CalendarPicker
        weekdays={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]}
        months={[
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ]}
        previousTitle="Anterior"
        nextTitle="Próximo"
        scaleFactor={375}
        textStyle={{
          fontFamily: "Sniglet",
          color: "#000000",
        }}
        onDateChange={setSelectedDate}
        width={350}
        minDate={Date.now()}
        todayTextStyle={{color:Colors.WHITE}} 
        todayBackgroundColor={Colors.BLACK}
        selectedDayColor={Colors.PRIMARY}
        selectedDayTextColor={Colors.WHITE}
        />
    </View>

    {/* Seção Selecione um horário  */}
    <View style={{marginTop:20}}>
        <Heading text={'Escolha um horário'}/>
        <FlatList
        data={timeList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({item,index})=>(
            <TouchableOpacity style={{marginRight:5}}
            onPress={()=>setSelectedTime(item.time)}>
                <Text style={[selectedTime==item.time?
                 styles.selectedTime:styles.unSelectedTime]}>
                    {item.time}</Text>
            </TouchableOpacity>
        )}
        />
    </View>

    {/* Seção de Observação  */}
    <View style={{paddingTop:20}}>
        <Heading text={'Alguma observação?'}/>
        <TextInput placeholder='ATENÇÃO: Caso seja um serviço domiciliar escreva o endereço do local que seu pet irá receber o atendimento aqui!' 
        numberOfLines={5} multiline={true}
        style={styles.noteTextArea}
        onChange={(text)=>setNote(text)}
        />
    </View>

    {/* Botão de Confirmação  */}
    <TouchableOpacity style={{marginTop:15}}
    onPress={()=>createNewBooking()}>
        <Text style={styles.confirmBtn}
        
        >Confirmar e Agendar</Text>
    </TouchableOpacity>
    </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    calendarContainer:{
        backgroundColor:Colors.PRIMARY_LIGHT,
        padding:20,
        borderRadius:15,
    },
    selectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE
    },
    unSelectedTime:{
        padding:10,
        borderWidth:1,
        borderColor:Colors.PRIMARY,
        borderRadius:99,
        paddingHorizontal:18,
        color:Colors.PRIMARY
    },
    noteTextArea:{
        borderWidth:1,
        borderRadius:15,
        textAlignVertical:'top',
        padding:13,
        fontSize:16,
        fontFamily:'Sniglet',
        borderColor:Colors.PRIMARY
    },
    confirmBtn:{
        textAlign:'center',
        fontFamily:'Sniglet',
        fontSize:17,
        backgroundColor:Colors.PRIMARY,
        color:Colors.WHITE,
        padding:13,
        borderRadius:99,
        elevation:2
    }
})