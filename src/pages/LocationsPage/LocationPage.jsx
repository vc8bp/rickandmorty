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


const LocationPage = () => {
    const location = useLocation()
    const [locationData, setCharacter] = useState();

    useEffect(() => {
        (async () => {
            try {
                const {data} = await publicRequest(`${location.pathname}`)
                
                const characters = await publicRequest.get(`character/${data.residents.map(val => val.split("/").pop()).join(",")}`)
                data.residents = !Array.isArray(characters.data) ? [characters.data] : characters.data

                setCharacter(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[location.pathname])

    console.log(locationData)

    return !locationData ? "Loading..." : (
        <PageContainer>
      <EpisodeName>{locationData.name}</EpisodeName>
      <Detail>
        <Label>Air Date:</Label> {locationData.air_date}
      </Detail>

      <Detail>
        <Label>type :</Label> {locationData.type}
      </Detail>
      <Detail>
        <Label>dimension :</Label> {locationData.dimension}
      </Detail>
      <Detail>
        <Label>Residents ({locationData.residents.length}) :</Label>
        <div className='items'>
            {locationData.residents.map(char => (
                <UserCard data={char} />
            ))}
        </div>
      </Detail>
    </PageContainer>
    );
};

export default LocationPage;
