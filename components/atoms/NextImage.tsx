import Image from "next/image";
import styled from "styled-components";

interface INextImage {
    objectFit?: string;
    objectPosition?: string;
}

const NextImage = styled(Image)`
    width: 100%;
    height: 100%;
`;
