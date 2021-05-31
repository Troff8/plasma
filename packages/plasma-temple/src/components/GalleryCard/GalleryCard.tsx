import React from 'react';
import styled, { css } from 'styled-components';
import { Card, CardBody, CardMedia, CardBody1, CardBadge, CardContent, Caption } from '@salutejs/plasma-ui';
import { IconClock } from '@salutejs/plasma-icons';
import { overlay, primary } from '@salutejs/plasma-tokens';
import { isSberBox, mediaQuery } from '@salutejs/plasma-ui/utils';

import { GalleryCardParams as GalleryCardType } from '../../pages/GalleryPage/types';
import { AnyObject } from '../../types';

export interface GalleryCardProps<T extends AnyObject = AnyObject> {
    card: GalleryCardType<T>;
    index: number;
    onClick: <T1 extends T>(cardProps: T1) => void;
    onFocus: () => void;
    focused?: boolean;
}

const StyledCardIndex = styled(CardBadge)`
    position: absolute;
    top: 16px;
    left: 16px;
`;

const StyledTag = styled(CardBadge)`
    position: absolute;
    bottom: 16px;
    left: 16px;
    padding: 6px 14px;

    padding: 4px 12px;
    font-weight: 500;
    font-size: 20px;
    text-transform: none;
    line-height: 20px;

    border-radius: 12px;
    background-color: ${overlay};
    backdrop-filter: blur(10px);
`;

const StyledCardContent = styled(CardContent)`
    display: flex;
    flex: 1;
    flex-direction: column;

    min-height: 200px;
`;

const StyledAdditionalContent = styled.div`
    display: flex;
    align-items: center;

    margin-top: auto;

    opacity: 0.47;
    color: ${primary};
`;

const StyledCaption = styled(Caption)`
    margin-bottom: 0;
    margin-left: 4px;
`;

const Time: React.FC<{ time: string }> = ({ time }) => (
    <>
        <IconClock size="xs" />
        <StyledCaption>{time}</StyledCaption>
    </>
);

const StyledCard = styled(Card)`
    width: 392px;

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            width: 332px;
        `,
    )}
`;

const GalleryCardComponent = <T extends AnyObject = AnyObject>({
    card,
    focused,
    index,
    onClick,
    onFocus,
}: GalleryCardProps<T>): React.ReactElement => {
    const cardRef = React.useRef<HTMLDivElement | null>(null);
    const imageSrc = Array.isArray(card.image.src) ? card.image.src[0] : card.image.src;

    React.useLayoutEffect(() => {
        if (focused && isSberBox()) {
            cardRef.current?.focus({ preventScroll: true });
        }
    }, [focused]);

    const handleClick = React.useCallback(() => onClick(card), [card, onClick]);
    const isFocused = isSberBox() && focused;

    return (
        <StyledCard
            focused={isFocused}
            tabIndex={0}
            onClick={handleClick}
            onFocus={onFocus}
            data-cy={`gallery-card-${index}`}
            ref={cardRef}
        >
            <CardBody>
                <CardMedia base="div" src={imageSrc} ratio={card.image.ratio ?? '1 / 1'} data-cy="gallery-card-media">
                    {card.position && (
                        <StyledCardIndex view="secondary" size="l" circled text={String(card.position)} />
                    )}
                    {typeof card.tag === 'string' && <StyledTag view="secondary" size="s" text={card.tag} />}
                </CardMedia>
                <StyledCardContent>
                    <CardBody1 lines={2}>{card.label}</CardBody1>
                    <StyledAdditionalContent>{card.time != null && <Time time={card.time} />}</StyledAdditionalContent>
                </StyledCardContent>
            </CardBody>
        </StyledCard>
    );
};

export const GalleryCard = React.memo(GalleryCardComponent);