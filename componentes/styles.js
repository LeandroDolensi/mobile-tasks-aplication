import {StyleSheet} from 'react-native';
import React from 'react'; 

export default StyleSheet.create({
    image:{
        width:'100%',
        height:80,
        resizeMode:"cover"
        
      },
      coverView:{
        width:'100%',
        height:80,
        backgroundColor:'rgba(222,86,7,0.7)'
      },
    
      textHeader:{
        textAlign:'center',
        color:'black',
        fontSize:30,
        marginTop:20,
        fontFamily:'AkayaKanadaka_400Regular',
        
      },
    
      tarefaSingle:{
        marginTop:20,
        width:'100%',
        borderBottomColor:'black',
        borderBottomWidth:1,
        flexDirection:'row',
        paddingBottom:10
        
      },
      //Estilos para nossa modal
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'rgba(0,0,0,0.7)'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex:5
      },
      openButton: {
        backgroundColor: 'rgb(252, 120, 3)',
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      btnAddTarefa:{
        width:200,
        padding:8,
        backgroundColor:'rgb(252, 120, 3)',
        marginTop:20,
        borderRadius:20,
        
        }
});