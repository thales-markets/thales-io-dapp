import { Network } from 'enums/network';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSelector } from 'react-redux';
import { getNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';

type PeriodDropdownProps = {
    period: number;
    setPeriod: React.Dispatch<React.SetStateAction<number>>;
    allPeriods: number[];
};

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ period, setPeriod, allPeriods }) => {
    const { t } = useTranslation();
    const networkId = useSelector((state: RootState) => getNetworkId(state));
    const [open, setOpen] = useState(false);

    return (
        <OutsideWrapper>
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <Wrapper onClick={() => setOpen(!open)} shadow={open}>
                    {open ? (
                        allPeriods.map((periodLocal, index) => {
                            if (periodLocal >= 0) {
                                return (
                                    <Container
                                        selected={periodLocal === period}
                                        onClick={setPeriod.bind(this, periodLocal)}
                                        key={index}
                                    >
                                        <Text>
                                            {t('staking.leaderboard.time-left.round')}{' '}
                                            {networkId === Network.Base ? periodLocal + 1 : periodLocal}
                                        </Text>
                                    </Container>
                                );
                            }
                        })
                    ) : (
                        <Container alone={true}>
                            <Text>
                                {t('staking.leaderboard.time-left.round')}{' '}
                                {networkId === Network.Base ? period + 1 : period}
                            </Text>
                            <Icon className={open ? `icon icon--caret-up` : `icon icon--caret-down`} />
                        </Container>
                    )}
                </Wrapper>
            </OutsideClickHandler>
        </OutsideWrapper>
    );
};

const OutsideWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const Wrapper = styled.div<{ shadow?: boolean }>`
    position: absolute;
    top: -38px;
    z-index: 1000;
    background: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    width: 100%;
    box-shadow: ${(props) => (props.shadow ? '0px 10px 15px -5px rgba(0,0,0,0.46)' : '')};
`;

const Text = styled.p`
    font-family: Nunito;
    font-size: 13px;
    font-style: normal;
    line-height: 110%;
    color: ${(props) => props.theme.textColor.tertiary};
`;

const Container = styled.div<{ selected?: boolean; alone?: boolean }>`
    height: 36px;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    &:hover {
        background: ${(props) => (props.alone ? props.theme.background.tertiary : props.theme.background.quaternary)};
    }
    background: ${(props) =>
        props.alone ? props.theme.background.tertiary : props.selected ? props.theme.background.quaternary : ''};
    cursor: pointer;
`;

const Icon = styled.i`
    font-size: 12px;
    color: ${(props) => props.theme.textColor.tertiary};
`;

export default PeriodDropdown;
