import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Single Card Component
const CardContainer = styled.div`
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

const CardImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const UserCard = ({ data }) => {
  const navigate = useNavigate()
  return (
    <CardContainer onClick={() => navigate(`/character/${data.id}`, { state: {character: data}})} >
      <CardImage src={data?.image} alt={data?.name} />
      <CardTitle>{data?.name}</CardTitle>
      <CardText>Status: {data?.status}</CardText>
      <CardText>Species: {data?.species}</CardText>
      <CardText>Gender: {data?.gender}</CardText>
    </CardContainer>
  );
};

export default UserCard
