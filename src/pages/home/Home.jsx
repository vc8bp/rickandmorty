import React, { useEffect, useState } from 'react'
import { publicRequest } from '../../api';
import List from './components/UserCard';
import styled from 'styled-components';
import UserCard from './components/UserCard';
import LocationCard from './components/LocationCard';
import EpisodeCard from './components/EpisodeCard';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Pagination from '../../components/Pagination';


const Container = styled.div`
    display: flex;
    margin: 1rem;
    box-sizing: border-box;
    gap: 1rem;

    @media screen and (max-width: 700px) {
        flex-direction: column;

        >div{
            width: 100% !important;
        }
    }
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
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
            species: ["alien", "human", "Humanoid", "Poopybutthole", "Cronenberg", "robot"]
        }
    }
}

function Home({activeTab, setSearchParams}) {
    const [data, setData] = useState(null)
    const [isLoading ,setIsLoading] = useState(false)
    const [filters, setFilters] = useState({}) 
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1)
        if(!activeTab) return setSearchParams(p => ({tab: "character"}));
    },[activeTab])


    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const {data} = await publicRequest.get(activeTab, { params: { ...filters[activeTab], page}})
                setData(data)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        })()
    },[activeTab, filters, page])

  return !activeTab ? null : (
    <>
        <SearchBar setFilters={setFilters} tab={activeTab} filter={filters[activeTab]?.name} />
        <Container>
            <Filter data={CardsTypes[activeTab].filters} setFilters={setFilters} tab={activeTab} filter={filters[activeTab]} />
            {data && (
                <Main>
                    <div className='items'>
                        {isLoading ? "LOADING...." : data.results.map((character) => {
                            const Card = CardsTypes[activeTab].component;
                            return <Card key={character.id} data={character} />
                        })}
                    </div>
                    <Pagination total={data.info.pages} setPage={setPage} page={page} />
                </Main>

            )}
        </Container>
    </>
  )
}

export default Home