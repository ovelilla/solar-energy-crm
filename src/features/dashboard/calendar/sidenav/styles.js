import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    font-size: 20px;
    letter-spacing: -0.4px;
    color: ${gray[900]};

    ${media(breakpoints.md)} {
        height: 88px;
        font-size: 24px;
    }
`;

export const CalendarContainer = styled.div`
    margin: -24px 0 0 0;
`;

export const LabelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;
`;

export const LabelsTitle = styled.div`
    font-weight: 500;
    text-transform: uppercase;
`;

export const Labels = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
`;

export const Label = styled.div`
    display: flex;
    justify-content: space-between;
`;
