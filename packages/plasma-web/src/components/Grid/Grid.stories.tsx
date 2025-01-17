import React from 'react';
import { Meta } from '@storybook/react';
import { Filler } from '@salutejs/plasma-sb-utils';

import { InSpacingDecorator } from '../../helpers';

import { Container, Row, Col } from '.';

export default {
    title: 'Layout/Grid',
    decorators: [InSpacingDecorator],
} as Meta;

export const Default = () => (
    <Container>
        <Row>
            <Col sizeS={1} sizeM={2} sizeL={3} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>1</Filler>
            </Col>
            {/* Допустимо указывать fallback-значение ширины для остальных разрешений */}
            <Col size={2} sizeXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>2</Filler>
            </Col>
        </Row>
        <Row>
            <Col size={3} offsetS={1} offsetM={2} offsetL={3} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>3 offset 1</Filler>
            </Col>
            {/* Допустимо указывать fallback-значение отступа для остальных разрешений */}
            <Col size={6} offset={2} offsetXL={4}>
                <Filler style={{ marginBottom: '1rem' }}>6 offset 2</Filler>
            </Col>
        </Row>
    </Container>
);
