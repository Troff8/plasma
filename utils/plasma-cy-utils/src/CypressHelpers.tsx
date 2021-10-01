import React, { FC } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// plasma-web
import { web } from '@salutejs/plasma-tokens-web/typo';
import { light } from '@salutejs/plasma-tokens-web/themes';
// plasma-ui
import { darkSber } from '@salutejs/plasma-tokens/themes';

// TODO: better naming
const TypoThemeStyle = createGlobalStyle(web);
const ColorThemeStyle = createGlobalStyle(light);

const ThemeStyle = createGlobalStyle(darkSber);

export const getComponent = (componentName: string) => {
    // eslint-disable-next-line
    // @ts-ignore
    const pkgName = Cypress.env('package');

    if (!pkgName) {
        throw new Error('Add package env to your Cypress config');
    }

    const check = (component: {}) => {
        if (!component) {
            throw new Error(`Library ${pkgName} has no ${componentName}`);
        }
    };

    if (pkgName === 'plasma-ui') {
        // eslint-disable-next-line
        const pkg = require('../../../packages/plasma-ui');
        const component = pkg[componentName];

        check(component);

        return component;
    }

    if (pkgName === 'plasma-web') {
        // eslint-disable-next-line
        const pkg = require('../../../packages/plasma-web');
        const component = pkg[componentName];

        check(component);

        return component;
    }

    throw new Error(`Library ${pkgName} is not required in plasma-core/CypressHelpers:getComponent`);
};

export const CypressTestDecorator: FC = ({ children }) => {
    // eslint-disable-next-line
    // @ts-ignore
    const pkgName = Cypress.env('package');

    if (pkgName === 'plasma-ui') {
        const DeviceThemeProvider = getComponent('DeviceThemeProvider');

        return (
            <DeviceThemeProvider>
                <ThemeStyle />
                {children}
            </DeviceThemeProvider>
        );
    }

    if (pkgName === 'plasma-web') {
        return (
            <>
                <TypoThemeStyle />
                <ColorThemeStyle />
                {children}
            </>
        );
    }

    return <>{children}</>;
};

export const Padme = styled.div`
    padding: 5px;
`;

export const SpaceMe = styled.span`
    padding: 5px;
`;