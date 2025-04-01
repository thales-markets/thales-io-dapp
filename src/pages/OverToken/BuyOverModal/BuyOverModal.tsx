import SPAAnchor from 'components/SPAAnchor';
import { BUY_OVER_LINKS } from 'constants/currency';
import { Network } from 'enums/network';
import { ScreenSizeBreakpoint } from 'enums/ui';
import { Description } from 'pages/LandingPage/styled-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { FlexDivColumnCentered } from 'styles/common';
import { LinkArrow, List, ListItem, SectionContainer } from '../styled-components';

type BuyOverModalProps = {
    onClose: () => void;
};

export const defaultCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-48%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
        background: 'transparent',
        border: 'none',
        overflow: 'none',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(10px)',
        zIndex: 202,
    },
};

const BuyOverModal: React.FC<BuyOverModalProps> = ({ onClose }) => {
    const { t } = useTranslation();

    return (
        <ReactModal
            isOpen
            onRequestClose={() => onClose()}
            shouldCloseOnOverlayClick={false}
            style={defaultCustomStyles}
        >
            <Container>
                <CloseIcon className="thales-icon thales-icon--close" onClick={() => onClose()} />
                <Title>{t('over-token.buy-over-modal.title')}</Title>
                <Description>Use ParaSwap to buy $OVER on different blockchains</Description>
                <SectionContainer>
                    <List>
                        <ListItem>
                            {t('over-token.buy-over-modal.list.1')}
                            <SPAAnchor href={BUY_OVER_LINKS[Network.OptimismMainnet]}>
                                Optimism <LinkArrow />
                            </SPAAnchor>
                        </ListItem>
                        <ListItem>
                            {t('over-token.buy-over-modal.list.2')}
                            <SPAAnchor href={BUY_OVER_LINKS[Network.Arbitrum]}>
                                Arbitrum <LinkArrow />
                            </SPAAnchor>
                        </ListItem>
                        <ListItem>
                            {t('over-token.buy-over-modal.list.3')}
                            <SPAAnchor href={BUY_OVER_LINKS[Network.Base]}>
                                Base <LinkArrow />
                            </SPAAnchor>
                        </ListItem>
                    </List>
                </SectionContainer>
            </Container>
        </ReactModal>
    );
};

const Container = styled(FlexDivColumnCentered)`
    border: 1px solid ${(props) => props.theme.borderColor.primary};
    background: ${(props) => props.theme.background.primary};
    border-radius: 15px;
    align-items: start;
    padding: 35px 45px 15px 45px;
    width: 430px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: auto;
        height: auto;
        padding: 25px 35px 5px 35px;
    }
`;

const CloseIcon = styled.i`
    font-size: 16px;
    color: ${(props) => props.theme.textColor.tertiary};
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 14px 15px;
    cursor: pointer;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        right: 0px;
        top: 0px;
        padding: 12px 13px;
    }
`;

const Title = styled.span`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 20px;
    font-weight: 600;
    line-height: 32px;
    letter-spacing: 0.025em;
    text-align: center;
    width: 100%;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 18px;
        margin-top: 0px;
    }
`;

export default BuyOverModal;
