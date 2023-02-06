import styled from "@emotion/styled";
import { red } from "@styles/colors";

const Icon = styled.div`
    overflow: hidden;
    width: 88px;
    height: 88px;
    margin: 0 auto;
`;

const Error = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: content-box;
    border-radius: 50%;
    border: 4px solid ${red[800]};
    padding: 0;
    background-color: #fff;
    animation: animateErrorIcon 0.5s;

    @keyframes animateErrorIcon {
        0% {
            transform: rotateX(100deg);
            opacity: 0;
        }

        100% {
            transform: rotateX(0deg);
            opacity: 1;
        }
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        width: 60px;
        height: 120px;
        background: #fff;
        transform: rotate(45deg);
    }

    &::before {
        width: 26px;
        height: 80px;
        top: -17px;
        left: 5px;
        border-radius: 40px 0 0 40px;
        transform-origin: 60px 60px;
        transform: rotate(-45deg);
    }

    &::after {
        left: 30px;
        top: -11px;
        border-radius: 0 120px 120px 0;
        transform-origin: 0 60px;
        transform: rotate(-45deg);
        animation: rotatePlaceholder 4.25s ease-in;
    }

    @keyframes rotatePlaceholder {
        0%,
        5% {
            transform: rotate(-45deg);
        }

        100%,
        12% {
            transform: rotate(-405deg);
        }
    }
`;

const X = styled.div`
    display: block;
    z-index: 2;
    position: relative;
`;

const Left = styled.div`
    display: block;
    z-index: 2;
    position: absolute;
    top: 37px;
    left: 17px;
    width: 47px;
    height: 5px;
    border-radius: 2px;
    background-color: ${red[800]};
    transform: rotate(45deg);
    animation: animateXLeft 0.75s;

    @keyframes animateXLeft {
        0%,
        65% {
            left: 82px;
            top: 95px;
            width: 0;
        }

        84% {
            left: 14px;
            top: 33px;
            width: 47px;
        }

        100% {
            left: 17px;
            top: 37px;
            width: 47px;
        }
    }
`;

const Right = styled.div`
    display: block;
    z-index: 2;
    position: absolute;
    top: 37px;
    right: 16px;
    width: 47px;
    height: 5px;
    border-radius: 2px;
    background-color: ${red[800]};
    transform: rotate(-45deg);
    animation: animateXRight 0.75s;

    @keyframes animateXRight {
        0%,
        65% {
            right: 82px;
            top: 95px;
            width: 0;
        }

        84% {
            right: 14px;
            top: 33px;
            width: 47px;
        }

        100% {
            right: 16px;
            top: 37px;
            width: 47px;
        }
    }
`;

const Placeholder = styled.div`
    z-index: 2;
    position: absolute;
    box-sizing: content-box;
    top: -4px;
    left: -4px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid rgba(200, 0, 0, 0.2);
`;

const Fix = styled.div`
    z-index: 1;
    position: absolute;
    top: 8px;
    left: 28px;
    width: 5px;
    height: 90px;
    background-color: #fff;
    transform: rotate(-45deg);
`;

const AnimatedSuccess = () => {
    return (
        <Icon>
            <Error>
                <X>
                    <Left />
                    <Right />
                </X>
                <Placeholder />
                <Fix />
            </Error>
        </Icon>
    );
};

export default AnimatedSuccess;
