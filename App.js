import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons'; 
import { useFonts, AkayaKanadaka_400Regular } from '@expo-google-fonts/akaya-kanadaka';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox, Text, View, ImageBackground, TouchableOpacity, TouchableHighlight, Modal, ScrollView, TextInput, Alert } from 'react-native';
import styles from './componentes/styles.js';


export default function App() {

  const image = require('./resources/bg.jpg');
  LogBox.ignoreAllLogs();

  // array com os objetos 'tarefa'
  const [tarefas, setarTarefas] = useState([]);

  const [modal,setModal] = useState(false);

  // string da tarefa corrente
  const [tarefaAtual, setTarefaAtual] = useState('');

  // para carregar dados
  useEffect(()=>{
    (async () => {
      try {
        let tarefa_Atual = await AsyncStorage.getItem('tarefasStorage');
        if(tarefa_Atual == null)
        {
          setarTarefas([]);
        }
        else
        {
          setarTarefas(JSON.parse(tarefa_Atual));
        }
          
      } catch (erro) {
        // Error saving data
      }
    })();
  },[])


  let [fontsLoaded] = useFonts({
    AkayaKanadaka_400Regular,
  });

  if (!fontsLoaded) {
      return <AppLoading />;
    }

  function salvarInStorage(tarefas){
    (async () => {
      try {
        await AsyncStorage.setItem('tarefasStorage', JSON.stringify(tarefas));
      } catch (error) {
        // alert('Erro saving data');
      }
    })();
  }


  function deletarTarefa(id){

    // criando novo array sem o item corrente
    var newTarefas = tarefas.filter(function(val){
      return val.id != id;
    });
    setarTarefas(newTarefas);
    // salvando nova lista
    salvarInStorage(newTarefas);
  }

  function addTarefa(){
    // torna o modal visível 
    setModal(!modal);

    
    let id = 0;
    // pegando novo id com base no último id do array
    if(tarefas.length > 0){
      id = tarefas[tarefas.length - 1].id + 1;
    }
    let tarefa = {id:id, tarefa:tarefaAtual, t_finalizada:false}
    tarefas.push(tarefa);
    setarTarefas(tarefas);
    salvarInStorage(tarefas);
  }

  function marcarTarefa(tarefa_atual){
    // esta função mararia com uma risca, tarefas realizadas
    // esta função encontra-se INCOMPLETA

    // pegando indice de 'tarefa_atual' dentro do array 'tarefas'
    for( var i = 0; tarefas[i].id != tarefa_atual.id ; i++ );
    
    // t_finalizada leia-se: tarefa_finalizada = true
    tarefas[i].t_finalizada = true;
    
    setarTarefas(tarefas);
    salvarInStorage(tarefas);
  }

  function mostrarTarefa(tarefa){
    // esta funação verifica se uma tarefa foi realizada para mostrar riscada ou não

    if( tarefa.t_finalizada )
    return <Text onLongPress={()=> marcarTarefa(tarefa)} style={{textDecorationLine:'line-through'}}>{tarefa.tarefa}</Text>

    else
    return <Text onLongPress={()=> marcarTarefa(tarefa)}>{tarefa.tarefa}</Text>
  }


  return (
    <ScrollView style={{flex:1}}>
        <StatusBar hidden />

        <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}><Text style={styles.textHeader}>Raccooner Tasks</Text></View>
        </ImageBackground>

        
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <TextInput onChangeText={text => setTarefaAtual(text)} autoFocus={true}></TextInput>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: 'rgb(252, 120, 3)' }}
              onPress={() => addTarefa()}>
              <Text style={styles.textStyle}>Adicionar</Text>
            </TouchableHighlight>

          </View>
        </View>
        </Modal>

      {
      // 
      tarefas.map(function(val){
        return(
          <View style={styles.tarefaSingle}>
            
            <View style={{flex:1, width:'100%', padding:10,}}> 
              <View>{mostrarTarefa(val)}</View>
            </View>
            
            <View style={{alignItems:'flex-end', flex:1, padding:10}}>
              <TouchableOpacity onPress={()=> deletarTarefa(val.id)} ><AntDesign name="minuscircleo" size={24} color="black" /></TouchableOpacity>
            </View>

          </View>
        );
      })
      }

      <View style={{flex:1, alignItems:'center'}}>
        
        <TouchableOpacity style={styles.btnAddTarefa} onPress={()=>setModal(true)}><Text
        style={{textAlign:'center',color:'black'}}>Adicionar Tarefa
        </Text>
        </TouchableOpacity>

      </View>
        
    </ScrollView>
  );
}

