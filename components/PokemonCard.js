import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { getUniqueTypes, getTypeImage } from "../functions"
import axios from "axios";

const PokemonCard = ({ species }) => {
    const [pokemonData, setPokemonData] = useState({})
    const [evolvesTo, setEvolvesTo] = useState('-')
    const [evolvesFrom, setEvolvesFrom] = useState('-')

    useEffect(() => {
        const getPokemon = async () => {
            const data = (await axios(species.url)).data
            const defaultVariety = data.varieties.filter(v => v.is_default === true)[0]
            const defaultPokemon = (await axios(defaultVariety.pokemon.url)).data
            const types = [ ...new Set(defaultPokemon.types.map(t => getUniqueTypes(t))) ]

            setPokemonData({
                id : data.id,
                name : data.names.filter(name => name.language.name === 'fr')[0].name,
                height : defaultPokemon.height,
                weight : defaultPokemon.weight,
                front_default : defaultPokemon.sprites.front_default,
                types : types.map(
                    typeName => {
                        return {
                            name : typeName,
                            image : getTypeImage(typeName)
                        }
                    }
                )
            })
        }

        const getEvolvesFrom = async () => {
            const defaultPokemon = (await axios(species.url)).data

            if (defaultPokemon.evolves_from_species !== null) {
                const evolvingFrom = (await axios(defaultPokemon.evolves_from_species.url)).data
                setEvolvesFrom(evolvingFrom.names.filter(n => n.language.name === 'fr')[0].name)
            } else {
                setEvolvesFrom('-')
            }
        }


        const getEvolvesTo = async () => {
            const defaultPokemon = (await axios(species.url)).data

            const currentName = defaultPokemon.name
            const levelOne = (await axios(defaultPokemon.evolution_chain.url)).data.chain

            let evolutionNames = ''

            if (levelOne.evolves_to.length > 0 && levelOne.evolves_to !== undefined) {
                if (levelOne.species.name === currentName) {
                    const levelTwo = Object.entries(levelOne.evolves_to[0])
                    const pokemonFinded = (await axios(levelTwo[3][1].url)).data
                    evolutionNames = pokemonFinded.names.filter(n => n.language.name === 'fr')[0].name
                }
                
                if (
                    levelOne.evolves_to[0].species.name === currentName 
                    && levelOne.evolves_to[0].evolves_to.length > 0
                ) {
                    if (levelOne.evolves_to[0].evolves_to.length > 1) {
                        const levelTwo = levelOne.evolves_to[0].evolves_to
                        const arrayNames = await Promise.all(levelTwo.map(
                            async evolution => {
                                let pokemonFinded = (await axios(evolution.species.url)).data

                                return pokemonFinded.names.filter(n => n.language.name === 'fr')[0].name
                            }
                        ))

                        evolutionNames = arrayNames.join('\nou\n')

                    } else {
                        const levelThree = Object.entries(levelOne.evolves_to[0].evolves_to[0])
                        const pokemonFinded = (await axios(levelThree[3][1].url)).data
                        evolutionNames = pokemonFinded.names.filter(n => n.language.name === 'fr')[0].name
                    }
                    
                }
            }

            if (evolutionNames !== '') {
                setEvolvesTo(evolutionNames)
            } else {
                setEvolvesTo('-')
            }
        }

        getPokemon()
        getEvolvesFrom()
        getEvolvesTo()
    }, [])

    return (
        <View style={css.pokemonCard}>
            <View style={css.pokemonCardHeader}>
                <Text style={css.pokemonNumber}>N° {pokemonData.id}</Text>
                <View style={css.pokemonTypesContainer}>
                {
                    pokemonData.types !== undefined ? (
                        pokemonData.types.map(
                            (type, key) => {
                                return (
                                    <Image
                                        key={species.name + "_type_" + key} 
                                        source={{ uri : type.image }}
                                        style={css.pokemonTypeImage}
                                    />
                                )
                            }
                        )
                    ) : (<Text>[types]</Text>)
                }
                </View>
            </View>
            <View style={css.pokemonImageContainer}>
            {
                pokemonData.front_default ? (<Image style={css.pokemonImage} source={{ uri: pokemonData.front_default }} />) : (<Image style={css.pokemonImageNotFound} source={{ uri: "https://cdn.pixabay.com/photo/2019/11/27/14/06/pokemon-4657023_1280.png" }} />)
            }
            </View>
            <Text style={css.pokemonName}>{pokemonData.name}</Text>
            <View style={css.pokemonDescription}>
                <View style={css.pokemonDescriptionContainer}>
                    <Text style={css.label}>Taille</Text>
                    <Text>{pokemonData.height / 10} m</Text>
                </View>
                <View style={css.pokemonDescriptionContainer}>
                    <Text style={css.label}>Poids</Text>
                    <Text>{pokemonData.weight / 10} kg</Text>
                </View>
            </View>
            <View style={css.pokemonDescription}>
                <View style={css.pokemonDescriptionContainer}>
                    <Text style={css.label}>Évolution de</Text>
                    <Text>{evolvesFrom}</Text>
                </View>
                <View style={css.pokemonDescriptionContainer}>
                    <Text style={css.label}>Évolue en</Text>
                    <Text style={css.text}>{evolvesTo}</Text>
                </View>
            </View>
        </View>
    )
}

export default PokemonCard

const css = StyleSheet.create({
    pokemonCard : {
      backgroundColor : '#FFFFFF',
      borderBottomColor : '#0A285F',
      borderBottomWidth : 4,
      borderStyle : 'dotted',
      width : 300,
      height : 'auto',
      marginLeft : 'auto',
      marginRight : 'auto',
      paddingHorizontal : 20,
      paddingVertical : 20,
      color: '#0A285F'
    },

    pokemonCardHeader : {
        flex : 1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },

    pokemonNumber : {
        fontWeight : 'bold',
        fontSize : 18,
        color: 'black'
    },

    pokemonTypesContainer : {
        flexDirection : 'row'
    },

    pokemonTypeImage : {
        width : 25,
        height : 25
    },

    pokemonImageContainer : {
        width : 150,
        height : 150,
        alignSelf : 'center'
    },

    pokemonImage : {
        width : 150,
        height : 150,
        resizeMode : 'contain'
    },

    pokemonImageNotFound : {
        width : 100,
        height : 100,
        resizeMode : 'contain',
        alignSelf : 'center',
        marginVertical : 'auto'
    },

    pokemonName : {
        textAlign : 'center',
        fontWeight : 'bold',
        fontSize : 25
    },

    pokemonDescription : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        flexWrap : 'wrap',
        flexGrow : 2,
        marginTop : 20,
        marginLeft : 'auto',
        width : '100%'
    },

    pokemonDescriptionContainer : {
        flex : 1,
        alignItems : 'center'
    },

    label : {
        color : 'lightgray',
        textTransform : 'uppercase',
        fontSize : 10
    },

    text : {
        textAlign : 'center'
    }
});