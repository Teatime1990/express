import React, { FC } from 'react';
import styled from "styled-components";
import { DefaultContainer } from "../utilities/styles";
import { OMDBTYPE } from "../utilities/common";

const SearchRadioContainer = styled(DefaultContainer)`
    flex: 0 0 30%;
    padding-left: 40px;

    .ratio-options {
        align-items: center;
        display: flex;

        input {
            border:2px solid white;
            appearance:none;
            border-radius:50%;
            width:16px;
            height:16px;
            background-color:#666666;
            transition:all ease-in 0.2s;
            margin: 0;
        }

        input[type="radio"]:checked {
            background-color:#ffffff;
            position: relative;
        }

        input[type="radio"]:checked:after {
            content: '';
            width: 8px;
            height: 8px;
            background-color: white;
            border: 2px solid #666666;
            position: absolute;
            bottom: 0;
            right: 0;
            top: 0px;
            left: 0;
            border-radius: 50%;
        }

        label {
            color: #ffffff;
            font-size: 14px;
            align-items: center;
            display: flex;
            
            & > span {
                padding: 0 10px 1px 10px;
            }
        }
    }
`;

export type SearchTypeProps = {
    searchType: string;
    searchTypeOnChange: (Type: string) => void;
}


const SearchRadio: FC<SearchTypeProps> = ({searchType, searchTypeOnChange}: SearchTypeProps) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTypeOnChange(e.target.value);
  };

    return (
        <SearchRadioContainer>
            <h4>TYPE</h4>
            <div className='ratio-options'>
                <label>
                    <input
                        type="radio"
                        value=""
                        checked={searchType === OMDBTYPE.Any}
                        onChange={handleOptionChange}
                    />
                    <span>Any</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value={OMDBTYPE.Movies}
                        checked={searchType === OMDBTYPE.Movies}
                        onChange={handleOptionChange}
                    />
                    <span>Movies</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value={OMDBTYPE.Series}
                        checked={searchType === OMDBTYPE.Series}
                        onChange={handleOptionChange}
                    />
                    <span>Series</span>
                </label>
                <label>
                    <input
                        type="radio"
                        value={OMDBTYPE.Episodes}
                        checked={searchType === OMDBTYPE.Episodes}
                        onChange={handleOptionChange}
                    />
                    <span>Episodes</span>
                </label>
            </div>
        </SearchRadioContainer>
    );
};

export default SearchRadio;