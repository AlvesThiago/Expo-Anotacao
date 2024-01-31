import React, {useState, useCallback, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Modal,
   TouchableOpacity, FlatList, TextInput,AsyncStorage } from 'react-native';
import TaskList from './src/components/TaskList';   



   export default function App(){
    const [task, setTask] = useState([]);

    const [open, setOpen] = useState(false);

    const [input, setInput] = useState('');

    useEffect(() => {
     async function loadTasks(){
        const taskStorage = await AsyncStorage.getItem('@task')

        if(taskStorage){
          setTask(JSON.parse(taskStorage));
        }
      }

      loadTasks();

    }, [])

    useEffect(() => {

         async function saveTasks(){
           await AsyncStorage.setItem('@task', JSON.stringify(task));
         }

         saveTasks();

    }, [task]);


    function buttonSalvar(){
      if(input === '') return;

      const data = {
        key: input,
        task: input
      };

      setTask([...task, data]);
      setOpen(false);
      setInput('');


    }

    const handleDelete = useCallback((data) => {const find = task.filter(r => r.key !== data.key)
      setTask(find);
    })

   return(
     <SafeAreaView style={styles.container}>
       <StatusBar backgroundColor='#69a8cd' barStyke='light-content'/>

       <View style={styles.content}>
          <Text style={styles.title}>Minhas Tarefas</Text>
       </View>

       <FlatList
       showsHorizontalScrollIndicator={false}
       data={task}
       keyExtractor={ (item) => String(item.key)}
       renderItem={ ({item}) => <TaskList data={item} handleDelete={handleDelete} /> }  />

       <Modal animationType= 'slide' transparent={false} visible={open}> 

       <SafeAreaView style={styles.modal}>

         <View style={styles.modalHeader}>
           <TouchableOpacity
            onPress={() => setOpen(false)}
            style={styles.voltar}>
             <Text>Voltar</Text>
           </TouchableOpacity>

           <Text style={styles.modalTitle}>Nova Tarefa</Text>

         </View>

         <View style={styles.modalBody}>
           <TextInput
           multiline={true}
           autoCorrect={false}
           placeholder= 'O que precisa fazer hoje?'
           style={styles.input} 
           value={input}
           onChangeText={ (texto)  => setInput(texto)}
           />

           <TouchableOpacity style={styles.buttonSalvar} onPress={buttonSalvar}>
             <Text style={styles.textSalvar}>Salvar</Text>
           </TouchableOpacity>
         </View>
       </SafeAreaView>


       </Modal>



         <TouchableOpacity style={styles.button} onPress={() => setOpen(true)}>
             <Text style={styles.textbutton}> + </Text>
         </TouchableOpacity>

     </SafeAreaView>
          
   )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#69a8cd'

    },

    title:{
      marginTop: 15,
      paddingBottom: 10,
      fontSize: 22,
      textAlign: 'center',
      backgroundColor: '#295872',
      color: '#FFF',
      paddingTop: 5,
      alignItems: 'center'
      

    },

    button:{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      right: 30,
      borderRadius: 30,
      elevation: 2,
      zIndex: 9,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset:{
         width: 1,
         right: 3,
      },
      marginTop: 685,
      margin: 0,
      padding: 8,
      backgroundColor: '#295872'
      
                      
    },
    textbutton:{
      color: '#FFF',
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Arial',
      alignSelf: 'center'
      
    },
    voltar:{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 60,
      right: 30,
      borderRadius: 30,
      elevation: 2,
      zIndex: 9,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset:{
         width: 1,
         right: 3,
      },
      marginTop: 600,
      margin: 0,
      padding: 8,
      backgroundColor: '#295872'
      
   },
   modal:{
    flex: 1,
    backgroundColor: '#69a8cd'
   },
   modalHeader:{
     marginLeft: 15,
     marginTop: 20,
     flexDirection: 'row',
     alignItems: 'center'
   },
   modalTitle:{
    marginTop: 2,
    paddingLeft: 5,
    fontSize: 22,
    textAlign: 'center',
    color: '#FFF',
    paddingTop: 5,
    alignItems: 'center'
   },
   modalBody:{
     marginTop: 30,
   },

   input:{
     fontSize: 15,
     marginLeft: 10,
     marginRight: 10,
     marginTop: 20,
     backgroundColor: '#FFF',
     padding: 9,
     height: 300,
     textAlignVertical: 'top',
     color: '#000',
     borderRadius: 5,
   },

   buttonSalvar:{
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
    marginRight: 80,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#295872'
    
   },

   textSalvar:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Arial',
    alignSelf: 'center'
   }

   
});