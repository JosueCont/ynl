import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'native-base'

const GoalsReport = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Text>GoalsReport</Text>
        </ScrollView>
    </SafeAreaView>
  )
}

export default GoalsReport

const styles = StyleSheet.create({})