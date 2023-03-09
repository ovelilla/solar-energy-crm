import styled from "@emotion/styled";
import { breakpoints, media } from "@styles/sizes";
import { gray } from "@styles/colors";
import { shadows } from "@styles/shadows";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Row = styled.div`
    display: flex;
    gap: 24px;
`;

export const Left = styled.div`
    display: flex;
    justify-content: center;
    flex: 0 0 48px;

    svg {
        color: ${gray[500]};
        width: 24px;
        height: 24px;
    }
`;

export const Right = styled.div`
    display: flex;
    align-items: center;
    flex: 1 1 auto;
`;

export const Title = styled.div`
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: 18px;
    font-weight: 500;
`;

export const Subtitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const Date = styled.div`
    font-size: 16px;
    color: ${gray[600]};
`;

export const Recurring = styled.div`
    font-size: 16px;
    color: ${gray[600]};
`;

export const Color = styled.div`
    width: 16px;
    height: 16px;
    margin: 8px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

export const Label = styled.div`
    font-size: 16px;
    color: ${gray[600]};
`;


export const Description = styled.div`
    font-size: 16px;
    color: ${gray[600]};
`;
