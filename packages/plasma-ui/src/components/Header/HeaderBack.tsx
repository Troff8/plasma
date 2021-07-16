import React from 'react';
import styled, { css } from 'styled-components';
import { IconChevronLeft, IconSize } from '@salutejs/plasma-icons';
import type { PickOptional } from '@salutejs/plasma-core';
import { mediaQuery } from '@salutejs/plasma-core';

import { Button, ButtonProps } from '../Button';

export const StyledHeaderBackButton = styled(Button)`
    position: absolute;
    top: -0.125rem;
    right: 100%;
    margin-right: 0.5rem;

    ${({ theme }) =>
        mediaQuery(
            'S',
            theme.deviceScale,
        )(css`
            position: static;
            width: auto;
            height: auto;
            padding: 0;
            margin-right: 1rem;
        `)}
`;
export interface HeaderBackProps
    extends PickOptional<ButtonProps, 'as' | 'size' | 'scaleOnInteraction' | 'disabled'>,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    iconSize?: IconSize;
}

/**
 * Кнопка назад.
 */
export const HeaderBack: React.FC<HeaderBackProps> = ({ iconSize = 's', ...rest }) => (
    <StyledHeaderBackButton size="s" square view="clear" {...rest}>
        <IconChevronLeft size={iconSize} />
    </StyledHeaderBackButton>
);
