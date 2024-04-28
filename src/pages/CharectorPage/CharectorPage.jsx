import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { publicRequest } from '../../api';
import axios from 'axios';
import EpisodeCard from '../home/components/EpisodeCard';

const PageContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  
`;

const CharacterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 1rem;
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const EpisodesContainer = styled.div`
  width: 100%;

  >div{
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    > div{
        flex-grow: 1;
        min-width: min(100%, 300px);
    }
  }
`;

const EpisodeItem = styled.div`
  margin-bottom: 10px;
`;

const CharacterPage = () => {
    const location = useLocation()
    const [character, setCharacter] = useState();
    const [episodes, setEpisoded] = useState();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await publicRequest(`${location.pathname}`)
                
                //fetching all episode's data
                // const episodes = []
                // let promise = await Promise.allSettled(data.episode.map(e => axios.get(e)))
                // promise.forEach(ep => (ep.status == "fulfilled" && ep.value.data) && episodes.push(ep.value.data))

                const episodes = await publicRequest.get(`episode/${data.episode.map(val => val.split("/").pop()).join(",")}`)
                data.episode = !Array.isArray(episodes.data) ? [episodes.data] : episodes.data

                setCharacter(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[location.pathname])

    return !character ? "Loading..." : (
        <PageContainer>
            <CharacterContainer>
                <CharacterInfo>
                    <ImageContainer>
                        <Image src={character.image} alt={character.name} />
                    </ImageContainer>
                    <InfoContainer>
                        <Detail>
                            <Label>Name:</Label> {character.name}
                        </Detail>
                        <Detail>
                            <Label>Status:</Label> {character.status}
                        </Detail>
                        <Detail>
                            <Label>Species:</Label> {character.species}
                        </Detail>
                        <Detail>
                            <Label>Gender:</Label> {character.gender}
                        </Detail>
                        <Detail>
                            <Label>Origin:</Label> {character.origin.name}
                        </Detail>
                        <Detail>
                            <Label>Location:</Label> {character.location.name}
                        </Detail>
                    </InfoContainer>
                </CharacterInfo>
                <EpisodesContainer>
                    <Label>Episodes:</Label>
                    <div>
                        {character.episode.map((ep, index) => (
                            <EpisodeCard key={ep.id} data={ep} />
                        ))}
                    </div>
                </EpisodesContainer>
            </CharacterContainer>
        </PageContainer>
    );
};

export default CharacterPage;
