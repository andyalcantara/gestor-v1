import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {aquaMarine} from "../colors";

const SubmitButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Text>Submit</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   button: {
       backgroundColor: aquaMarine,
       borderRadius: 25,
       borderColor: aquaMarine,
       width: '100%',
       borderWidth: 1,
       height: 40,
       marginTop: 20,
       justifyContent: 'center',
       alignItems: 'center'
   }
});

export default SubmitButton;
