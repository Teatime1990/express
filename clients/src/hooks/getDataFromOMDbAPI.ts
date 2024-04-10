import { useState, useEffect } from 'react';
import axios from 'axios';
import { OMDBResults, MovieDetails } from '../utilities/common';

const API_KEY = 'd9bcb3de';

type MovieSearchResultsType = {
    isLoading: boolean;
    error: string | undefined;
    omdbResults: OMDBResults | undefined;
};

// get data from search
export const useMovieSearchResults = (title: string, searchType: string, searchYears: Array<number>, page: number): MovieSearchResultsType => {
    const [searchResults, setSearchResults] = useState<OMDBResults>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(undefined);
            const url = `http://www.omdbapi.com/?s=${title.replace(/ /g, '+')}&apikey=${API_KEY}&type=${searchType}&page=${page}`;

            try {
                const response = await axios.get(url);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchData();
          }, 500)
        
        return () => clearTimeout(delayDebounceFn);
        
    }, [title, searchType, searchYears, page]);

    return {isLoading, error, omdbResults: searchResults};
}

type MovieDetailsProps = {
    isLoading: boolean;
    error: string | undefined;
    details: MovieDetails | undefined;
};

// get details based on ID
export const useGetMovieDetails = (obmdID: string): MovieDetailsProps => {
    const [details, setDetails] = useState<MovieDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(undefined);
            const url = `http://www.omdbapi.com/?i=${obmdID}&apikey=${API_KEY}`;

            try {
                const response = await axios.get(url);
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        
    }, [obmdID]);

    return {isLoading, error, details};
}