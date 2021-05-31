import React from 'react';
import styled, { css } from 'styled-components';
import { Carousel, CarouselCol, Col, Row } from '@salutejs/plasma-ui';
import { HeaderProps } from '@salutejs/plasma-ui/components/Header/Header';
import { mediaQuery } from '@salutejs/plasma-ui/utils';

import { Header } from '../../components';
import { useRemoteHandlers } from '../../hooks';

import { CartItem } from './components/CartItem/CartItem';
import { CartOrder } from './components/CartOrder/CartOrder';
import { useCart } from './hooks/useCart';
import { Order } from './types';
import { useCartAssistantState } from './hooks/useCartAssistantState';

interface CartPageProps<ID = string | number> {
    header?: HeaderProps;
    name?: string;
    emptyCart?: React.ReactElement;
    onMakeOrder: (order: Order<ID>) => void;
}

const StyledCarouselGridWrapper = styled.div`
    height: calc(100vh - 5rem);

    ${mediaQuery(
        'M',
        2,
    )(
        css`
            height: calc(100vh - 4.5rem);
        `,
    )}
`;

export const CartPage: React.FC<CartPageProps> = ({ header, name, emptyCart, onMakeOrder }) => {
    const { items, currency, minDeliveryPrice = 0 } = useCart();

    const [currentCartItem] = useRemoteHandlers({
        initialIndex: 0,
        axis: 'y',
        min: 0,
        max: items.length ? items.length - 1 : 0,
        repeat: false,
    });

    const handleMakeOrder = React.useCallback(() => onMakeOrder({ items, currency, minDeliveryPrice }), [
        onMakeOrder,
        items,
        currency,
        minDeliveryPrice,
    ]);

    useCartAssistantState(items, name);

    const price = items.reduce((amount, item) => amount + item.price * item.quantity, 0);

    return (
        <>
            <Header title="Корзина" {...header} />
            {!items.length && emptyCart ? (
                emptyCart
            ) : (
                <Row>
                    <Col sizeXL={6} sizeM={4}>
                        <StyledCarouselGridWrapper>
                            <Carousel
                                axis="y"
                                as={Row}
                                index={currentCartItem}
                                scrollAlign="center"
                                scrollSnapType="mandatory"
                                paddingEnd="50%"
                            >
                                {items.map((item, index) => (
                                    <CarouselCol key={item.id} scrollSnapAlign="center">
                                        <CartItem item={item} currency={currency} active={currentCartItem === index} />
                                    </CarouselCol>
                                ))}
                            </Carousel>
                        </StyledCarouselGridWrapper>
                    </Col>
                    <Col sizeXL={3.5} offsetXL={2.5} sizeM={2}>
                        <CartOrder
                            price={price}
                            minDeliveryPrice={minDeliveryPrice}
                            currency={currency}
                            disabled={!items.length}
                            onMakeOrder={handleMakeOrder}
                        />
                    </Col>
                </Row>
            )}
        </>
    );
};