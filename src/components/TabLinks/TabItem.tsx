import SPAAnchor from 'components/SPAAnchor';
import Tooltip from 'components/Tooltip';
import React from 'react';
import { FlexDivCentered } from 'styles/common';
import { Item, ItemTitle } from './styled-components';

export type NavItemType = {
    href?: string;
    title: string;
    active?: boolean;
    deprecated?: string;
    children?: NavItemType[];
};

type NavItemProps = {
    item: NavItemType;
};

const TabItem: React.FC<NavItemProps> = ({ item }) => {
    const active = item.active || !!item?.children?.find((child) => child.active);
    return (
        <SPAAnchor href={item.href}>
            <FlexDivCentered>
                <Item active={active} deprecated={!!item.deprecated} title={item.deprecated}>
                    <ItemTitle>
                        <span>{item.title}</span>
                        {item?.deprecated && (
                            <Tooltip
                                overlay={<span>{item?.deprecated}</span>}
                                iconFontSize={14}
                                marginLeft={3}
                                top={2}
                            />
                        )}
                    </ItemTitle>
                </Item>
            </FlexDivCentered>
        </SPAAnchor>
    );
};

export default TabItem;
