import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

const BasicTable = () => {
    const table = {
        tableHead: ['Head1', 'Head 2', 'Head 3', 'Head 4'],
        tableData: [
            ['1', '2', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
        ]
    };

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={table.tableHead} style={styles.head} textStyle={styles.text} />
                <Rows data={table.tableData} textStyle={styles.text} />
            </Table>
        </View>
    );
}

const TopTable = () => {
    const table = {
        tableHead: ['', 'Head1', 'Head2', 'Head3'],
        tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
        tableData: [
            ['1', '2', '3'],
            ['a', 'b', 'c'],
            ['1', '2', '3'],
            ['a', 'b', 'c']
        ]
    };

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={table.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Col data={table.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                    <Rows data={table.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 5, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
});

export { BasicTable, TopTable };