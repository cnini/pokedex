import {
    TYPE_GRASS,
    TYPE_FIRE,
    TYPE_WATER,
    TYPE_LIGHTNING,
    TYPE_FIGHTING,
    TYPE_PSYCHIC,
    TYPE_COLORLESS,
    TYPE_DARKNESS,
    TYPE_METAL,
    TYPE_DRAGON,
    TYPE_FAIRY
} from '@env';

export const getUniqueTypes = (type) => {
    const typeToLowerCase = type.type.name.toLowerCase()

    switch(typeToLowerCase) {
        case ['grass','bug','poison'].find(t => t === typeToLowerCase):
            return 'grass'
        
        case 'fire':
            return 'fire'

        case ['water','ice'].find(t => t === typeToLowerCase):
            return 'water'

        case 'electric':
            return 'electric'

        case ['fighting','rock', 'ground'].find(t => t === typeToLowerCase):
            return 'fighting'

        case ['psychic','ghost', 'poison', 'fairy'].find(t => t === typeToLowerCase):
            return 'psychic'

        case ['normal','flying', 'dragon'].find(t => t === typeToLowerCase):
            return 'normal'

        case ['dark','poison'].find(t => t === typeToLowerCase):
            return 'dark'

        case 'steel':
            return 'steel'

        case 'dragon':
            return 'dragon'

        case 'fairy':
            return 'fairy'

        default:
            return false
    }
}

export const getTypeImage = (type) => {
    // Pour éviter les problèmes de fautes de frappe, on met le type passé en paramètre.
    const typeToLowerCase = type.toLowerCase()

    // Comme il y a plus de trois cas, un switch sur la variable typeToLowerCase est favorisé.
    // Si un cas comporte plusieurs possibilités, on les regroupe dans une liste et on vérifie
    // si typeToLowerCase se trouve dans cette liste. Sinon, on se contente de vérifier si oui
    // ou non, typeToLowerCase correspond à un cas à une possibilité.
    switch(typeToLowerCase) {
        case ['grass','bug','poison'].find(t => t === typeToLowerCase):
            return TYPE_GRASS
        
        case 'fire':
            return TYPE_FIRE

        case ['water','ice'].find(t => t === typeToLowerCase):
            return TYPE_WATER

        case 'electric':
            return TYPE_LIGHTNING

        case ['fighting','rock', 'ground'].find(t => t === typeToLowerCase):
            return TYPE_FIGHTING

        case ['psychic','ghost', 'poison', 'fairy'].find(t => t === typeToLowerCase):
            return TYPE_PSYCHIC

        case ['normal','flying', 'dragon'].find(t => t === typeToLowerCase):
            return TYPE_COLORLESS

        case ['dark','poison'].find(t => t === typeToLowerCase):
            return TYPE_DARKNESS

        case 'steel':
            return TYPE_METAL

        case 'dragon':
            return TYPE_DRAGON

        case 'fairy':
            return TYPE_FAIRY

        default:
            return false
    }
}