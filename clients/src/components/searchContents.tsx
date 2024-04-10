import React, { FC, useState, useMemo, Fragment } from 'react';
import styled from "styled-components";
import { OMDBResults, Search, HANDLEPAGE } from '../utilities/common';
import MovieThumbnail from '../components/movieThumbnail';
import MovieDetail from '../components/movieDetail';
import { DefaultBtn } from '../utilities/styles';

const SearchContentsContainer = styled.div`
    .movies-list-container {
        display: flex;

        .movies-list {
            flex: 0 0 40%;
            border-right: 1px solid #666666;
            overflow-y: auto;
            white-space: nowrap;
            height: calc(-100px + 100vh);
            position: relative;
            box-sizing: inherit;

            &::-webkit-scrollbar {
                width: 14px;
            }
            
            &::-webkit-scrollbar-thumb {
                background: #c6c6c6;
            }

            &::-webkit-scrollbar-track {
                background: #f1f1f1;
            }
            
            .total-result {
                padding: 35px 40px;
            }

            .selected {
                background-color: #f1f1f1;
            }
        }

        .movies-details {
            flex: 0 0 60%;
        }

        .item {
            &:hover {
                background-color: #f1f1f1;
            }
        }

        .pagination {
            display: flex;
            padding: 5px 40px;

            .current-page {
                margin: auto;
            }
            .next-btn {
                padding: 14px 30px;
            }
        }
    }
`;

type SearchContentsProps = {
    results: OMDBResults;
    searchYears: Array<number>;
}

const SearchContents: FC<SearchContentsProps> = ({ results, searchYears }: SearchContentsProps) => {
    const [selectedMovie, setSelectedMovie] = useState<Search>();
    const {filteredContetsData, totalNumber} = useMemo(() => {
         let filteredResults = results.Search.filter(r => searchYears[0] <= parseInt(r.Year) && parseInt(r.Year) <= searchYears[1]);
        return {filteredContetsData: filteredResults, totalNumber: filteredResults.length};
    }, [searchYears, results]);

    const handleMovieSelection = (selected: Search) => {
        setSelectedMovie(selected);
    };

    return (
        <SearchContentsContainer>
            <div className="movies-list-container">
                <div className="movies-list">
                    <div className='total-result'>{totalNumber ?? 0} RESULTS</div>
                    {results.totalResults > 0 ? (
                        <Fragment>
                            {
                                filteredContetsData.length > 0 ? (
                                    filteredContetsData.map((o) => (
                                        <div key={o.imdbID} onClick={() => handleMovieSelection(o)} 
                                            className={o.imdbID === selectedMovie?.imdbID ? 'selected item' : 'item'}>
                                            <MovieThumbnail movie={o}></MovieThumbnail>
                                        </div>
                                    ))
                                ) : (
                                    <div className='no-results'>No Contents</div> 
                                )
                            }
                        </Fragment>
                    ) : (
                        <div className='no-results'>No Contents</div> 
                    )}
                </div>
                <div className="movies-details">
                    {selectedMovie && (
                        <MovieDetail movie={selectedMovie} />
                    )}
                </div>
            </div>
        </SearchContentsContainer>
    );
};

export default SearchContents;