import styled from "@emotion/styled";
import { slate } from "@styles/colors";

const Icon = styled.div`
    overflow: hidden;
    width: 88px;
    height: 88px;
    margin: 0 auto;
`;

const Success = styled.div`
    position: relative;
    width: 80px;
    height: 80px;
    box-sizing: content-box;
    border-radius: 50%;
    border: 4px solid ${slate[500]};

    &::before {
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
    }

    &::after {
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: rotateCircle 4.25s ease-in;
    }

    &::before,
    &::after {
        content: "";
        position: absolute;
        height: 100px;
        background: #ffffff;
        transform: rotate(-45deg);
    }

    @keyframes rotateCircle {
        0% {
            transform: rotate(-45deg);
        }

        5% {
            transform: rotate(-45deg);
        }

        12% {
            transform: rotate(-405deg);
        }

        100% {
            transform: rotate(-405deg);
        }
    }
`;

const LineTip = styled.div`
    display: block;
    z-index: 10;
    position: absolute;
    top: 46px;
    left: 14px;
    width: 25px;
    height: 5px;
    background-color: ${slate[500]};
    border-radius: 2px;
    transform: rotate(45deg);
    animation: lineTip 0.75s;

    @keyframes lineTip {
        0% {
            width: 0;
            left: 1px;
            top: 19px;
        }

        54% {
            width: 0;
            left: 1px;
            top: 19px;
        }

        70% {
            width: 50px;
            left: -8px;
            top: 37px;
        }

        84% {
            width: 17px;
            left: 21px;
            top: 48px;
        }

        100% {
            width: 25px;
            left: 14px;
            top: 45px;
        }
    }
`;

const LineLong = styled.div`
    display: block;
    z-index: 10;
    position: absolute;
    top: 38px;
    right: 8px;
    width: 47px;
    height: 5px;
    background-color: ${slate[500]};
    border-radius: 2px;
    transform: rotate(-45deg);
    animation: lineLong 0.75s;

    @keyframes lineLong {
        0% {
            width: 0;
            right: 46px;
            top: 54px;
        }

        65% {
            width: 0;
            right: 46px;
            top: 54px;
        }

        84% {
            width: 55px;
            right: 0px;
            top: 35px;
        }

        100% {
            width: 47px;
            right: 8px;
            top: 38px;
        }
    }
`;

const Circle = styled.div`
    z-index: 10;
    position: absolute;
    box-sizing: content-box;
    top: -4px;
    left: -4px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid ${slate[500]};
    opacity: 0.5;
`;

const Fix = styled.div`
    z-index: 1;
    position: absolute;
    top: 8px;
    width: 5px;
    left: 26px;
    height: 85px;
    transform: rotate(-45deg);
    background-color: #ffffff;
`;

const AnimatedSuccess = () => {
    return (
        <Icon>
            <Success>
                <LineTip />
                <LineLong />
                <Circle />
                <Fix />
            </Success>
        </Icon>
    );
};

export default AnimatedSuccess;
