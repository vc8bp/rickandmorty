import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Single Episode Card Component
const EpisodeCardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EpisodeTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const EpisodeText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const EpisodeCard = ({ data }) => {
  const navigate = useNavigate()
  return (
    <EpisodeCardContainer onClick={() => navigate(`/episode/${data.id}`)}>
      <EpisodeTitle>{data?.name}</EpisodeTitle>
      <EpisodeText>Air Date: {data?.air_date}</EpisodeText>
      <EpisodeText>Episode: {data?.episode}</EpisodeText>
      <EpisodeText>Characters: {data?.characters?.length}</EpisodeText>
    </EpisodeCardContainer>
  );
};

export default EpisodeCard;
