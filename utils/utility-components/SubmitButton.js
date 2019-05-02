import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text style={{color: 'white'}}>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   button: {
       backgroundColor: 'fuchsia',
       borderRadius: 25,
       borderColor: 'fuchsia',
       width: '100%',
       borderWidth: 1,
       height: 40,
       marginTop: 20,
       justifyContent: 'center',
       alignItems: 'center'
   }
});

export default SubmitButton;
