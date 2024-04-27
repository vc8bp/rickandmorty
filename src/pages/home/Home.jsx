import React, { useEffect, useState } from 'react'
import { publicRequest } from '../../api';
import List from './components/UserCard';
import styled from 'styled-components';
import UserCard from './components/UserCard';
import LocationCard from './components/LocationCard';
import EpisodeCard from './components/EpisodeCard';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

const ListContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
`;

const Container = styled.div`
    display: flex;
    margin: 1rem;
    box-sizing: border-box;
    gap: 1rem;
`

const CardsTypes = {
    "location": {
        component: LocationCard,
        filters: {
            dimension: ["unknown", "Monster", "Dimension", "Replacement", "Cromulon"],
            type: ["Planet", "Space station", "Dimension", "Rick's Toxic Side"]
        }
    },
    "episode": {
        component: EpisodeCard,
        filters: {
            episode: { type: "text", label: "Episode No.", name: "episode", placeHolder: "Enter Episode ex: (S1E01)" }
        }
    },
    "character": {
        component: UserCard,
        filters: {
            gender: ["female", "male", "genderless", "unknown"],
            status: ["alive", "dead", "unknown"],
            species: ["alien", "human", "Humanoid", "Poopybutthole"]
        }
    }
}

function Home({activeTab, setSearchParams}) {
    const [data, setData] = useState(null)
    const [isLoading ,setIsLoading] = useState(false)
    const [filters, setFilters] = useState({}) 


    useEffect(() => {
        if(!activeTab) return setSearchParams(p => ({tab: Items[0].key}));
        (async () => {
            setIsLoading(true)
            try {
                const {data} = await publicRequest.get(activeTab, { params: filters[activeTab]})
                setData(data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        })()
    },[activeTab, filters])

  return (
    <>
        <SearchBar setFilters={setFilters} tab={activeTab} filter={filters[activeTab]?.name} />
        <Container>
            <Filter data={CardsTypes[activeTab].filters} setFilters={setFilters} tab={activeTab} filter={filters[activeTab]} />
            {data && (
                <ListContainer>
                    {isLoading ? "LOADING...." : data.results.map((character) => {
                        const Card = CardsTypes[activeTab].component;
                        return <Card key={character.id} data={character} />
                    })}
                </ListContainer>
            )}
        </Container>
    </>
  )
}

export default Home