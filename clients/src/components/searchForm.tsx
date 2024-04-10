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
    const [page, setPage] = useState<number>(1);
    const {error, omdbResults} = useMovieSearchResults(searchText, searchType, searchYears, page);

    if (error) {
        return (
            <div>
                <span>Can not get data</span>
            </div>
        )
    }

    return (
        <SearchFromContainer>
            <SearchBar searchText={searchText} searchTextOnChange={setSearchText} 
                       searchYears={searchYears} setSearchYears={setSearchYears} 
                       searchType={searchType} searchTypeOnChange={setSearchType}
                       setPage={setPage} />
            {omdbResults?.Search !== undefined ? (
                <SearchContents results={omdbResults} searchYears={searchYears}/>
            ) : (
                <div className='no-results'>No Contents</div> 
            )}

        </SearchFromContainer>
    );
};

export default SearchForm;