import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import * as Animatable from 'react-native-animatable'
WebBrowser.maybeCompleteAuthSession();
export default function Login() {
    useWarmUpBrowser();
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
      return (
        <View style={styles.container}>
          
          <View style={styles.LoginImage}>
          <Animatable.Image 
          animation="zoomIn"
          source={require('./../../../assets/images/logoanimale.png')}
          style={{ width: '100%' }}
          resizeMode='contain'
          />
          </View>
    
          <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
            <Text style={styles.title}>Temos a missão de te ajudar a manter seu pet feliz e saudável!</Text>
            
            <TouchableOpacity style={styles.button}
            onPress={onPress}>
            <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>
          </Animatable.View>
    
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container:{
        flex:1,
        backgroundColor:Colors.PRIMARY,
      },
      LoginImage:{
        flex:2,
        backgroundColor:Colors.PRIMARY,
        justifyContent:'center',
        alignItems:'center',
        padding:75
      },
      containerForm:{
        flex:1,
        backgroundColor:Colors.PRIMARY,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart: '5%',
        paddingEnd: "5%"
      },
      title:{
        fontSize:18,
        fontFamily:"Sniglet",
        marginTop:90,
        marginBottom:12,
        textAlign:'center',
        justifyContent:'center',
        color:Colors.WHITE
      },
      button:{
        position:'absolute',
        backgroundColor:Colors.WHITE,
        borderRadius:50,
        paddingVertical:8,
        width:'60%',
        alignSelf:'center',
        bottom:'15%',
        alignItems:'center',
        justifyContent:'center'
      },
      buttonText:{
        fontSize:17,
        fontFamily:'Sniglet',
        color:Colors.PRIMARY
      }
    })