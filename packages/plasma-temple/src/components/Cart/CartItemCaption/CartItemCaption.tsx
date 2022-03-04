import React from 'react';
import styled from 'styled-components';
import { accent, critical, warning } from '@salutejs/plasma-tokens';
import { Caption, detectDevice, DeviceKind, Footnote1 } from '@salutejs/plasma-ui';

import { CaptionType, CartItemCaptionType } from '../types';

const contentMap: Record<CaptionType, (s?: string) => string> = {
    'sold-out': (value) => value || 'Раскупили',
    'few-left': (value) => value || 'Больше нет',
    'price-changed': (value) => value || 'Изменилась цена',
    sale: (value) => `Скидка ${value}%`,
    'you-want': (value) => `Вы хотели ${value} товара`,
    present: (value) => value || 'Подарок',
    warning: (value) => value || '',
    critical: (value) => value || '',
    accent: (value) => value || '',
};

const textColorMap: Record<CaptionType, string> = {
    'sold-out': warning,
    'few-left': warning,
    'price-changed': warning,
    sale: accent,
    present: accent,
    'you-want': warning,
    warning,
    critical,
    accent,
};

const mapDeviceToCaption: Record<DeviceKind, React.FC> = {
    sberBox: Footnote1,
    sberPortal: Caption,
    mobile: Footnote1,
};

const StyledLabel = styled(mapDeviceToCaption[detectDevice()])<{ type: CaptionType; className?: string }>`
    color: ${({ type }) => textColorMap[type]};
`;

export interface CartItemCaptionProps extends CartItemCaptionType {
    className?: string;
}

export const CartItemCaption: React.FC<CartItemCaptionProps> = ({ type, content, className }) => {
    const contentProvider = contentMap[type];

    return (
        <StyledLabel className={className} type={type}>
            {contentProvider(content)}
        </StyledLabel>
    );
};