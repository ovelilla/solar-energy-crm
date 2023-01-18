import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { white, slate, gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 100%;
    padding: 0 8px;

    ${media(breakpoints.md)} {
        padding: 0 16px;
    }
`;

export const Adornment = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    color: ${slate[400]};
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    font-family: inherit;
    font-size: inherit;

    &:focus {
        outline: none;
    }
`;
