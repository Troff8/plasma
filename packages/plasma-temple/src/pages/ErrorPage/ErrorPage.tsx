import React from 'react';
import styled from 'styled-components';
import { isSberBox, mediaQuery } from '@salutejs/plasma-ui/utils';

import { useFocusOnMount } from '../../hooks/useFocusOnMount';
import { THROTTLE_WAIT } from '../../hooks/useThrottledCallback';
import { StateLayout } from '../../components/StateLayout/StateLayout';
import { ComponentPropsWithHeader } from '../../components/Header/types';

import iconWarn from './ErrorPage.assets/warning-circle.svg';

interface ErrorPageProps extends ComponentPropsWithHeader {
    error: {
        status: string;
        message?: string;
    };
    buttons?: ((focusedRef: React.Ref<HTMLButtonElement>) => React.ReactNode) | React.ReactNode;
}

const StyledWarningIcon = styled.div`
    ${mediaQuery('M')`
        width: 176px;
        height: 176px;
    `}

    width: 320px;
    height: 320px;

    background-image: url(${iconWarn});
    background-size: contain;
    margin: auto;
`;

export const ErrorPage: React.FC<ErrorPageProps> = ({ header, error, buttons }) => {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    useFocusOnMount<HTMLButtonElement>(buttonRef, {
        delay: THROTTLE_WAIT,
        prevent: !isSberBox(),
    });

    const buttonsToRender: React.ReactNode = React.useMemo(() => {
        if (typeof buttons === 'function') {
            return buttons(buttonRef);
        }

        if (React.isValidElement(buttons)) {
            return buttons;
        }

        return null;
    }, [buttons]);

    return (
        <StateLayout
            header={header}
            title={error.status}
            text={error.message}
            button={buttonsToRender}
            image={<StyledWarningIcon />}
        />
    );
};