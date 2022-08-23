import React from 'react';
import styled, { css } from 'styled-components';

import { toCssSize } from '../../utils';

const ratios = {
    '1 / 1': '100',
    '1/1': '100',
    '3 / 4': '133.3333',
    '3/4': '133.3333',
    '4 / 3': '75',
    '4/3': '75',
    '9 / 16': '177.7778',
    '9/16': '177.7778',
    '16 / 9': '56.25',
    '16/9': '56.25',
    '1 / 2': '200',
    '1/2': '200',
    '2 / 1': '50',
    '2/1': '50',
};

export type Ratio = keyof typeof ratios;

interface StyledRootProps {
    $ratio?: Ratio;
    $customRatio?: string;
    $width?: string | number;
    $height?: string | number;
}

interface HeightProps {
    height?: string | number;
}

interface RatioProps {
    ratio?: Ratio;
}

interface CustomRatioProps {
    customRatio?: string;
}

export type ImageBaseProps = (HeightProps | RatioProps | CustomRatioProps) &
    React.ImgHTMLAttributes<HTMLImageElement> & {
        src: string;
        alt?: string;
        base?: 'div' | 'img';
    };

export type ImageProps = ImageBaseProps & {
    children?: never;
};

const StyledRoot = styled.div<StyledRootProps>`
    position: relative;
    display: block;
    box-sizing: border-box;
    overflow: hidden;

    width: 100%;
    height: inherit;
    border-radius: inherit;

    ${({ $ratio, $customRatio }) =>
        ($ratio || $customRatio) &&
        css`
            height: 0;
            padding-bottom: ${$ratio ? ratios[$ratio] : $customRatio}%;
        `}

    ${({ $width, $height }) =>
        css`
            ${$width && `width: ${toCssSize($width)};`}
            ${$height && `height: ${toCssSize($height)};`}
        `}
`;

const StyledImg = styled.img<RatioProps>`
    width: 100%;
    ${({ src, ratio }) =>
        src &&
        ratio &&
        css`
            height: 100%;
            object-fit: cover;
            position: absolute;
        `};
`;

const StyledDivImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background-position: center;
    background-size: cover;
`;

/**
 * Компонент для отображения картинок.
 */
export const Image: React.FC<ImageProps> = ({ src, srcSet, sizes, base = 'img', alt, width, height, ...props }) => {
    const ratio = 'ratio' in props ? props.ratio : undefined;
    const customRatio = 'customRatio' in props ? props.customRatio : undefined;

    return (
        <StyledRoot $ratio={ratio} $customRatio={customRatio} $width={width} $height={height} {...props}>
            {base === 'img' && <StyledImg src={src} srcSet={srcSet} sizes={sizes} alt={alt} ratio={ratio} />}
            {base === 'div' && <StyledDivImg style={{ backgroundImage: `url(${src})` }} role="img" aria-label={alt} />}
        </StyledRoot>
    );
};
