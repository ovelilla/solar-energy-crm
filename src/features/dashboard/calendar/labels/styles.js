import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 24px 24px 24px;
`;

export const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    text-transform: uppercase;
`;

export const LabelsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
`;

export const Label = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LabelColor = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

export const LabelName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
