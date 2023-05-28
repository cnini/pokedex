import axios from "axios";
import { useState } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { usePokedexContext } from "../contexts/PokedexContext"

export const SearchingBar = () => {
    const { searchingValue, setSearchingValue } = usePokedexContext()

    function handlingSearchingBar(value) {
        if (value !== '') {
            setSearchingValue('')
            setSearchingValue(value)
        } else {
            setSearchingValue('')
        }
    }

    return (
        <View>
            <Text>Rechercher :</Text>
            <TextInput
                style={css.searchingBar}
                placeholder="ex: Bulbizarre"
                value={searchingValue}
                onChangeText={newSearchingValue => handlingSearchingBar(newSearchingValue)}
            />
        </View>
    )
}

const css = StyleSheet.create({
    searchingBar : {
        borderStyle : 'solid',
        borderWidth : 1,
        borderColor : '#000',
        paddingStart : 4,
        paddingVertical : 2
    }
})