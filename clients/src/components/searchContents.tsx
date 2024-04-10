import React, { FC, useState, useMemo, useEffect } from 'react';
import styled from "styled-components";
import { OMDBResults, Search, HANDLEPAGE } from '../utilities/common';
import axios from "axios";
import MovieThumbnail from '../components/movieThumbnail';
import MovieDetail from '../components/movieDetail';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMovieSearchResults } from '../hooks/getDataFromOMDbAPI';
import Skeleton from 'react-loading-skeleton';

const SearchContentsContainer = styled.div`
    .movies-list-container {
        display: flex;
        height: calc(100vh - 100px);
        overflow-y: hidden;

        .movies-list {
            flex: 0 0 40%;
            border-right: 1px solid #666666;
            white-space: nowrap;
            height: calc(-100px + 100vh);
            position: relative;
            box-sizing: border-box;

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
    searchText: string;
    searchType: string;
    searchYears: Array<number>;
}

const SearchContents: FC<SearchContentsProps> = ({ searchText, searchYears, searchType}: SearchContentsProps) => {
    const [selectedMovie, setSelectedMovie] = useState<Search>();
    const handleMovieSelection = (selected: Search) => {
        setSelectedMovie(selected);
    };

    const [items, setItems] = useState<Array<Search>>([]);
    const [hasMore, setHasMore] = useState(true);
    const [index, setIndex] = useState(2);
    const {omdbResults} = useMovieSearchResults(searchText, searchType, searchYears, 1);
    
    useEffect(() => {
        if(omdbResults != null) {
            setItems(omdbResults.Search);
        }
    }, [omdbResults]);
    
    const fetchMoreData = () => {
        const url = `http://www.omdbapi.com/?s=${searchText.replace(/ /g, '+')}&apikey=d9bcb3de&type=${searchType}&page=${index}`;
        axios.get(url).then((res) => {
            console.log(res.data);
            
            const result: Array<Search> = res.data.Search;
            setItems((prevItems) => [...prevItems, ...result]);
    
            result?.length > 0 ? setHasMore(true) : setHasMore(false);
          })
          .catch((err) => console.log(err));
        setIndex((prevIndex) => prevIndex + 1);
    };

    const {filteredContetsData, totalNumber} = useMemo(() => {
        let filteredResults = items?.filter(r => searchYears[0] <= parseInt(r.Year) && parseInt(r.Year) <= searchYears[1]);
       return {filteredContetsData: filteredResults, totalNumber: filteredResults?.length};
   }, [searchYears, items]);

    return (
        <SearchContentsContainer>
            <div className="movies-list-container">
                <div className="movies-list">
                    <div>
                        <InfiniteScroll
                            dataLength={totalNumber}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={
                                <h4 style={{ textAlign: 'center' }}>
                                    <Skeleton count={10} height={145} />
                                </h4>
                            }
                            height={'calc(100vh - 120px)'}
                            endMessage={
                                <p
                                    className="reach-end-hint"
                                    style={{ textAlign: 'center' }}
                                >
                                    <b>This is the end of the list.</b>
                                </p>
                            }
                            >
                            <div className='total-result'>{totalNumber ?? 0} RESULTS</div>
                            <div className='container'>
                                <div className='row'>
                                {filteredContetsData &&
                                    filteredContetsData.map((item) => (
                                        <div key={item.imdbID} onClick={() => handleMovieSelection(item)} 
                                            className={item.imdbID === selectedMovie?.imdbID ? 'selected item' : 'item'}>
                                            <MovieThumbnail movie={item}></MovieThumbnail>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
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