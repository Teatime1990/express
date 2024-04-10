import React, { FC } from 'react';
import styled from "styled-components";
import { Search, movieURL } from '../utilities/common';

const MovieThumbnailContainer = styled.div`
    padding: 35px 40px;
    display: flex;
    border-bottom: 1px solid #666666;
    align-items: center;

    img {  
        width: 60px;
        height: 60px;
        border-radius: 5px;
    }

    .movie-name {
        padding: 8px 16px;
        display: flex;
        flex-direction: column;
        font-size: 16px;

        .title {
            white-space: normal;
        }

        .sub-title {
            font-size: 14px;
            color: #c6c6c6;
            margin-top: 5px;
        }
    }
`;

type MovieThumbnailProps = {
    movie: Search;
}

const MovieThumbnail: FC<MovieThumbnailProps> = ({ movie }: MovieThumbnailProps) => {
    return (
        <MovieThumbnailContainer>
            <div>
                <img alt={movie.Title} src={movieURL(movie.Poster)} />
            </div>
            <div className='movie-name'>

                <span className='title'>{movie.Title}</span>

                <span className='sub-title'>{movie.Year}</span>
            </div>
        </MovieThumbnailContainer>
    );
};

export default MovieThumbnail;