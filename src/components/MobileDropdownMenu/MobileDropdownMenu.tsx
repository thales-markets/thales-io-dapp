import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Arrow, FiltersButton, Item, PositionWrapper, Wrapper } from './styled-components';

type ItemProps = {
    active: boolean;
    onClick: (args: any | undefined) => void;
    title: any;
    sortable?: boolean;
    sortableIndex?: number;
    isSortedDesc?: boolean;
    clearSort?: () => void;
};

type DropdownMenuProps = {
    buttonTitle: string;
    dropdownTitle?: string;
    items: Array<ItemProps> | Array<any>;
    forceOpenDropdown?: boolean;
};

const processSort = (item: ItemProps) => {
    if (item.sortableIndex == 0) {
        item.sortableIndex = 1;
        item.onClick(undefined);
        return;
    }

    if (item.sortableIndex == 1) {
        item.sortableIndex = 2;
        item.onClick(1);
        return;
    }

    if (item.sortableIndex == 2) {
        item.sortableIndex = 0;
        item.clearSort ? item.clearSort() : '';
        return;
    }
};

const MobileDropdownMenu: React.FC<DropdownMenuProps> = ({ buttonTitle, items, forceOpenDropdown }) => {
    const [showDropdown, setDropdownVisibility] = useState<boolean>(false);

    return (
        <>
            <FiltersButton visible={true} onClick={() => setDropdownVisibility(!showDropdown)}>
                {buttonTitle}
            </FiltersButton>
            {(showDropdown || forceOpenDropdown) && (
                <PositionWrapper>
                    <Wrapper visible={showDropdown}>
                        <OutsideClickHandler onOutsideClick={() => setDropdownVisibility(false)}>
                            {items &&
                                items.map((item: any, index: number) => {
                                    return item.title ? (
                                        <Item
                                            active={item.active ? true : false}
                                            key={index}
                                            onClick={() => {
                                                !item.sortable ? item.onClick() : processSort(item);
                                            }}
                                        >
                                            {item.title}
                                            {item.sortable ? (
                                                <Arrow
                                                    className={`thales-icon ${
                                                        item.sortable
                                                            ? item.sortableIndex == 0
                                                                ? 'thales-icon--double-arrow'
                                                                : item.sortableIndex == 1
                                                                ? 'thales-icon--arrow-up'
                                                                : item.sortableIndex == 2
                                                                ? 'thales-icon--arrow-down'
                                                                : ''
                                                            : ''
                                                    }`}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </Item>
                                    ) : (
                                        <>{item}</>
                                    );
                                })}
                        </OutsideClickHandler>
                    </Wrapper>
                </PositionWrapper>
            )}
        </>
    );
};

export default MobileDropdownMenu;
