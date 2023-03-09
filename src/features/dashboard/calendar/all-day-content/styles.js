import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import { white } from "@styles/colors";

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Weekday = styled.div`
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
`;

export const Day = styled.div``;

export const DayButton = styled(IconButton)`
    font-size: 18px;
    font-weight: 500;
`;
