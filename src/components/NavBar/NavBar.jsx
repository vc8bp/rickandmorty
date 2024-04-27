import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {  Link, useSearchParams } from 'react-router-dom';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

const CompanyName = styled.div`
  font-size: 24px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const NavItem = styled(Link)`
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#ff9800' : '#fff')};
  
  &:last-child {
    margin-right: 0;
  }
`;


const Items = [
    {Title: "Characters", key: "character"},
    {Title: "Episodes", key: "episode"},
    {Title: "Locations", key: "location"},
]

const Navbar = ({activeTab}) => {


  return (
    <NavbarContainer>
      <CompanyName>rickandmorty</CompanyName>
      <NavItems>
        {Items.map(e => {
            return <NavItem 
                isActive={activeTab === e.key}
                to={`/?tab=${e.key}`}
            >
                {e.Title}
            </NavItem>
        })}

      </NavItems>
    </NavbarContainer>
  );
};

export default Navbar;
