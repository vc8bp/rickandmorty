import React from 'react';
import styled from 'styled-components';

// Single Location Card Component
const LocationCardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const LocationTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const LocationText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const LocationCard = ({ data }) => {
  return (
    <LocationCardContainer>
      <LocationTitle>{data?.name}</LocationTitle>
      <LocationText>Type: {data?.type}</LocationText>
      <LocationText>Dimension: {data?.dimension}</LocationText>
      <LocationText>Residents: {data?.residents?.length}</LocationText>
    </LocationCardContainer>
  );
};

export default LocationCard;
