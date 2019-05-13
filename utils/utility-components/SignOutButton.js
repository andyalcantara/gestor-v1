import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignOutButton = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
   container: {
       alignItems: 'center',
       justifyContent: 'center',
       marginRight: 10
   },
    text: {
       color: 'white',
        fontSize: 11
    }
});

export default SignOutButton;
