import React from 'react';
import { View, Text, FlatList, SafeAreaView } from "react-native";

import { connect } from 'react-redux';

class Calculator extends React.Component {
    render() {

        const { invoices } = this.props;

        return (
            <SafeAreaView>
                <Text>Here you can find the whole Income of your clinics</Text>

                <FlatList
                    data={invoices}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.price}</Text>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }
}

function mapStateToProps({ invoices }) {
    return {
        invoices: Object.keys(invoices).map(key => invoices[key])
    }
}

export default connect(mapStateToProps)(Calculator);
