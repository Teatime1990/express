import React, { FC, useState } from 'react';
import { useMovieSearchResults } from '../hooks/getDataFromOMDbAPI';
import styled from "styled-components";
import SearchBar from "../components/searchBar";
import SearchContents from "../components/searchContents";

const SearchFromContainer = styled.div`
    display: block;

    .no-results {
        padding: 35px 40px;
    }
`;

const SearchForm: FC = () => {
    
    const [searchText, setSearchText] = useState<string>('');
    const [searchYears, setSearchYears] = useState<Array<number>>([1940, 2015]);
    const [searchType, setSearchType] = useState<string>('');

    return (
        <SearchFromContainer>
            <SearchBar searchText={searchText} searchTextOnChange={setSearchText} 
                       searchYears={searchYears} setSearchYears={setSearchYears} 
                       searchType={searchType} searchTypeOnChange={setSearchType} />

            <SearchContents searchText={searchText} searchYears={searchYears} searchType={searchType} />
        </SearchFromContainer>
    );
};

export default SearchForm;