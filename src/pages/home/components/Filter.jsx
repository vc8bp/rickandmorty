import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  width: 300px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FilterSection = styled.div`
  margin-bottom: 15px;

  >input{
    padding: 0.2rem 0.5rem;
    border-radius: 0.2rem;
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
  cursor: pointer;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

const OptionList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;


`;

const OptionItem = styled.li`
  border: 1px solid black;
  padding: 0.2rem 0.5rem;
  border-radius: 0.2rem;;
  margin-bottom: 5px;
  cursor: pointer;
  color: #666;
  font-size: 16px;
  transition: color 0.3s ease;
  background-color: ${p => p.isActive && "#baffba"};

  &:hover {
    color: #000;
  }
`;


const Filter = ({ data = {}, setFilters, tab, filter = {} }) => {

  const handleSelectOption = (section, option) => {
    setFilters((prevFilters) => {
        const newData = structuredClone(prevFilters);
        if(!newData[tab]) newData[tab] = {}

        console.log(newData[tab][section], option)
        if (newData[tab] && newData[tab][section] === option) {
            delete newData[tab][section];
        } else newData[tab][section] = option

        return newData
    });
  }


  return (
    <FilterContainer className='filter'>
      {Object.entries(data).map(([section, options]) => (
        <FilterSection key={section}>
            <SectionTitle>{section}</SectionTitle>
            {Array.isArray(options) ? 
                <OptionList>
                    {options.map((option) => (
                        <OptionItem isActive={filter?.[section] == option} key={option} onClick={() => handleSelectOption(section, option)}>
                        {option}
                        </OptionItem>
                    ))}
                </OptionList>
            :
                <>
                    <label>{options.label}</label>
                    <input placeholder={options.placeHolder} type={options.type} name={options.name} value={filter[section]} onChange={(e) => handleSelectOption(section, e.target.value)} />
                </>
            }
        </FilterSection>
      ))}
    </FilterContainer>
  );
};

export default Filter;
