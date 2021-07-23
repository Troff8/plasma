import { AssistantAppStateItem, useAssistantAppState } from '@salutejs/plasma-temple';

export const useAssistantState = ({
    screen,
    items = [],
    ...rest
}: {
    screen: string;
    items?: AssistantAppStateItem[];
    [key: string]: unknown;
}) => {
    useAssistantAppState({
        screen,
        item_selector: { items },
        ...rest,
    });
};
