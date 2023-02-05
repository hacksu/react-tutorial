import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'

type API_PokemonList = {
    count: number
    results: {
        name: string
        url: string
    }[]
}

type API_Pokemon = {
    id: number
    name: string
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[]
    sprites: {
        other: {
            'official-artwork': {
                front_default: string
            }
        }
    }
}

const PokemonContext = createContext<API_PokemonList['results']>([]);

function useAllPokemon() {
    const { data } = useQuery<API_PokemonList>(['all_pokemon'], () =>
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
            .then(res => res.json())
    );
    return data?.results || [];
}

function usePokemon(id: number) {
    return useQuery<API_Pokemon>(['pokemon', id], () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then(res => res.json())
    );
}


function useFilteredPokemon(search: string) {
    search = search.toLowerCase();
    const allPokemon = useAllPokemon();
    const pokemon = useMemo(() => {
        if (!allPokemon) return [];

        if (search.startsWith('#')) {
            return allPokemon.filter(o => String(o.url.split('/').slice(-2)[0]) == search.slice(1));
        }

        return allPokemon
            .filter(o => o.name.includes(search));

    }, [allPokemon, search]);
    return pokemon;
}


function PokemonItem(props: { id: number }) {
    const pokemon = usePokemon(props.id);
    
    const data = pokemon.data;
    if (!data) {
        return <span>Loading...</span>
    }


    return <span style={{ padding: '20px', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{  }}>#{data.id} - {data.name}</h4>
        <img src={data.sprites.other['official-artwork'].front_default}
        style={{ maxHeight: 150, maxWidth: 150 }} />
        <span>
            {data.types.map(({ type }) => {
                return type.name
            }).join(' - ')}
        </span>
    </span>
}


function PokemonList() {
    const pokemon = useContext(PokemonContext);
    return <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemon.map(({ url }) => {
            const id = Number(url.split('/').slice(-2)[0]);
            return <PokemonItem id={id} key={id} />
        })}
    </div>
}



export default function Pokedex() {
    const [search, setSearch] = useState('');
    const [showAll, setShowAll] = useState(false);

    const pokemon = useFilteredPokemon(search);
    const limitedPokemon = useMemo(() => {
        if (!showAll) return pokemon.slice(0, 20);
        return pokemon;
    }, [pokemon, showAll]);

    return <PokemonContext.Provider value={limitedPokemon}>
        <div>
            <h2>Pokedex</h2>
            <div>
                <input value={search} placeholder='Search'
                    onInput={(event) => setSearch((event.target as any).value)} />
                <span style={{ paddingLeft: 10, paddingRight: 10 }}>{pokemon.length} pokemon</span>
                <button onClick={() => setShowAll(!showAll)}>{showAll ? 'limit to 20' : 'show all'}</button>
            </div>

            <hr />

            <PokemonList />
        </div>
    </PokemonContext.Provider>
}
