import styled from "@emotion/styled";
import { white } from "@styles/colors";

export const Container = styled.div`
    display: flex;
    ${({ view }) => {
        if (view === "dayGridMonth") {
            return `
                flex-direction: row;
                align-items: center;
            `;
        } else {
            return `
                flex-direction: column;
            `;
        }
    }}
    gap: 4px;
    overflow: hidden;
    padding: 2px 4px;
    font-size: 13px;
    user-select: none;
`;

export const Dot = styled.div`
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(p) => p.color};
`;

export const Time = styled.div`
    ${({ view }) => {
        if (view !== "dayGridMonth") {
            return `
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `;
        }
    }}
`;

export const Title = styled.div`
    overflow: hidden;
    ${({ view }) => {
        if (view === "dayGridMonth" || view === "listWeek") {
            return `
                white-space: nowrap;
                text-overflow: ellipsis;
            `;
        }
    }}

    ${({ view }) => {
        if (view === "listWeek") {
            return `
                font-size: 16px;
            `;
        }
    }}
`;
