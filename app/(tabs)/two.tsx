import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import Scanner from '../../components/scanner';
import React, { Children, useContext, useState } from 'react';
import { codeContext } from '../../Context/codeContext';


export default function TabTwoScreen() {
  const code = useContext(codeContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      
      <Scanner />
     
      
      <Text>Detta skrivs ut på sida två: {}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
