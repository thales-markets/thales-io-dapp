import SPAAnchor from 'components/SPAAnchor';
import ROUTES from 'constants/routes';
import { SpaceKey } from 'enums/governance';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getIsMobile } from 'redux/modules/ui';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { FlexDiv } from 'styles/common';

console.log('ROUTES ', ROUTES);

const BreadcrumbsMenu: React.FC = () => {
    const { t } = useTranslation();
    const isMobile = useSelector((state: RootState) => getIsMobile(state));
    const location = useLocation();

    const splittedPath = location.pathname !== '/' ? location.pathname.split('/').filter((item) => item) : [];

    return isMobile && splittedPath.length ? (
        <Wrapper>
            <SPAAnchor href="/">
                <Icon className="icon icon--house" />
            </SPAAnchor>
            {splittedPath.map((item, index) => {
                const formattedItem =
                    item == SpaceKey.TIPS
                        ? t('governance.nav.tips').toLowerCase()
                        : item == SpaceKey.COUNCIL
                        ? t('governance.nav.elections').toLowerCase()
                        : item;
                return (
                    <>
                        <Arrow className="thales-icon thales-icon--right" />
                        <SPAAnchor href={`/${item}`} key={index}>
                            <Item>{formattedItem}</Item>
                        </SPAAnchor>
                    </>
                );
            })}
        </Wrapper>
    ) : (
        <></>
    );
};

const Wrapper = styled(FlexDiv)`
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: flex-start;
`;

const Item = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => props.theme.textColor.primary};
`;

const Icon = styled.i`
    font-size: 20px;
    color: ${(props) => props.theme.textColor.primary};
    padding-right: 5px;
`;

const Arrow = styled(Icon)`
    font-size: 13px;
`;

export default BreadcrumbsMenu;
