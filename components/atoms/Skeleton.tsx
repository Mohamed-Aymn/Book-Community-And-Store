import styled, { keyframes } from "styled-components";

interface ISeleton {
    width?: number;
    height?: number;
    shape?: "circular" | "rectangular" | "rounded";
}

const skeletonKeyframes = keyframes`
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
`;

const Skeleton = styled.div<ISeleton>`
    width: ${({ width }) => (width ? `${width.toString()}em;` : "100%;")};
    height: ${({ height }) => (height ? `${height.toString()}em;` : "14px;")};
    animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
    background-color: #eee;
    background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
    background-size: 200px 100%;
    background-repeat: no-repeat;
    ${({ shape }) =>
        shape === "circular"
            ? `
    border-radius: 100%;
    `
            : shape === "rounded"
            ? `
    border-radius: 2%;
    `
            : `
    border-radius: 0;
    `}
`;

export default Skeleton;
