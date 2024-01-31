import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function TaskList({data, handleDelete}){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleDelete(data)}>
                <Text style={styles.setinha}> Deletar </Text>
            </TouchableOpacity>

            <View>
                <Text style={styles.task}> {data.task} </Text>
            </View>
        </View>
        

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8dbeda',
        borderRadius: 5,
        padding: 15,      
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height: 3,
        }

    },
    setinha:{
        color: '#295872',
      fontSize: 14,
      fontWeight: 'bold',
      fontFamily: 'Arial'
      
    },

    task:{
        color: '#121212',
        fontSize: 14,
        paddingLeft: 8,
        paddingRight: 20

    }
})
