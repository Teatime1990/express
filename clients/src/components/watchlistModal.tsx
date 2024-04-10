import React, { FC } from 'react';
import styled from "styled-components";
import { DefaultContainer } from "../utilities/styles";
import { MovieIDAndTitle } from '../utilities/common';
import { DefaultBtn } from '../utilities/styles';

const  WatchlistModalContainer = styled(DefaultContainer)`
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    left: 40%;
    right: 0;
    top: 0;
    bottom: 0;
    transition: opacity 0.3s ease;

    .btn-back {
        padding: 14px 19px;
    }

    .add-delete-current-movie {
        padding: 40px 0;
        display: flex;

        button.add {
            padding: 14px 22px;
        }
    }

    ul {
        li {
            display: flex;
            padding: 10px 0;
            &:not(:last-child) {
                border-bottom: 1px solid #666666;
            }
            .li-btn {
                padding: 3px 18px;
                background: transparent;
                border-radius: 5px;
                font-weight: 600;
                margin-left: auto;
            }
        }
    }
`;

export type WatchlistModalProps = {
    movieId: string;
    movieTitle: string;
    setShowCancelModal: (Cancel: boolean) => void;
    watchlist: Array<MovieIDAndTitle>;
    handleWatchlist: (movieId: string, movieTitle: string) => void;
    isSaved: boolean;
}


const WatchlistModal: FC<WatchlistModalProps> = ({movieId, movieTitle, setShowCancelModal, watchlist, handleWatchlist, isSaved}: WatchlistModalProps) => {
    
    const onClose = () => {
        setShowCancelModal(false);
    };
    //Display current watchlist, Add or delete current movie.
    return (
        <WatchlistModalContainer>
            <DefaultBtn>
                <button className='btn-back' onClick={onClose}>Back</button>
            </DefaultBtn>
            <DefaultBtn className='add-delete-current-movie'>
                <span>
                    {`Do you want to ${isSaved ? 'delete': 'add'} current movie - ${movieTitle} to your Watchlist?`}
                </span>
                <button className={isSaved ? 'delete' : 'add'} onClick={() => handleWatchlist(movieId, movieTitle)}>{isSaved ? 'Delete' : 'Add'}</button>
            </DefaultBtn>
            <div>
                <h3>Watchlist</h3>
                <ul>
                    {watchlist.map((movie) => (
                    <li key={movie.MovieId}>{movie.Title}
                        <button className='li-btn' onClick={() => handleWatchlist(movie.MovieId, movie.Title)}>Delete</button>
                    </li>
                    ))}
                </ul>
            </div>
        </WatchlistModalContainer>
    );
};

export default WatchlistModal;