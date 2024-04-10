import React, { FC } from 'react';
import { Range, getTrackBackground } from "react-range";
import { DefaultContainer } from "../utilities/styles";
import styled from "styled-components";

export const ScrollbarYearRangeContainer = styled(DefaultContainer)`
    flex: 0 0 20%;

    .scroll-bar-group {
        display: flex;
        font-size: 14px;
        color: #ffffff;

        .year-left {
            padding-right: 14px;
        }

        .year-right {
            padding-left: 14px;
        }

        .scroll-bar {
            background-color: #ffffff;
        }
    }
`;

const STEP = 1;
const MIN = 1895;
const MAX = 2024;

export type SearchYearRangeProps = {
    searchYears: Array<number>;
    setSearchYears: (Year: Array<number>) => void;
}

const ScrollbarYearRange: FC<SearchYearRangeProps> = ({searchYears, setSearchYears}: SearchYearRangeProps) => {
    return (
        <ScrollbarYearRangeContainer>
            <h4>YEAR</h4>
            <div className='scroll-bar-group'>
                <span className='year-left'>{searchYears[0]}</span>
                <Range
                    values={searchYears}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    onChange={setSearchYears}
                    renderTrack={({ props, children }) => {
                    return (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                                ...props.style,
                                height: "20px",
                                display: "flex",
                                width: "100%"
                            }}
                            >
                            <div
                                ref={props.ref}
                                style={{
                                height: "6px",
                                width: "100%",
                                borderRadius: "5px",
                                background: getTrackBackground({
                                    values: searchYears,
                                    colors: ["#ffffff", "#c6c6c6", "#c6c6c6", "#ffffff"],
                                    min: MIN,
                                    max: MAX,
                                }),
                                alignSelf: "center",
                                }}
                                className='scroll-bar'
                            >
                                {children}
                            </div>
                        </div>
                    );
                    }}
                    renderThumb = {({ props }) => (
                        <div
                            {...props}
                            style={{
                            ...props.style,
                            height: "16px",
                            width: "16px",
                            borderRadius: "15px",
                            backgroundColor: "#c6c6c6",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            }}
                        />
                    )}
                />
                <span className='year-right'>{searchYears[1]}</span>
            </div>
        </ScrollbarYearRangeContainer>
    );
};

export default ScrollbarYearRange;