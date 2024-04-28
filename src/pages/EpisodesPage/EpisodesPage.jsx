import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { publicRequest } from '../../api';
import axios from 'axios';
import EpisodeCard from '../home/components/EpisodeCard';
import UserCard from '../home/components/UserCard';

const PageContainer = styled.div`
  padding: 20px;
`;

const EpisodeName = styled.h1`
  margin-bottom: 20px;
`;

const Detail = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;


const EpisodesPage = () => {
    const location = useLocation()
    const [episode, setCharacter] = useState();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await publicRequest(`${location.pathname}`)
                
                const character = await publicRequest.get(`character/${data.characters.map(val => val.split("/").pop()).join(",")}`)
                data.characters = !Array.isArray(character.data) ? [character.data] : character.data

                setCharacter(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[location.pathname])

    return !episode ? "Loading..." : (
        <PageContainer>
      <EpisodeName>{episode.name}</EpisodeName>
      <Detail>
        <Label>Air Date:</Label> {episode.air_date}
      </Detail>

      <Detail>
        <Label>Episode :</Label> {episode.episode}
      </Detail>
      <Detail>
        <Label>Characters ({episode.characters.length}) :</Label>
        <div className='items'>
          {episode.characters.map((character, index) => (
            <UserCard data={character} />
          ))}
        </div>
      </Detail>
    </PageContainer>
    );
};

export default EpisodesPage;
