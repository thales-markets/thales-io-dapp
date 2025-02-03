import { ScreenSizeBreakpoint } from 'enums/ui';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import {
    Colors,
    FlexDiv,
    FlexDivCentered,
    FlexDivColumn,
    FlexDivColumnCentered,
    FlexDivRowCentered,
} from 'styles/common';

type DropdownProps = {
    options: any;
    activeOption: any;
    onSelect: any;
    translationKey?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ options, activeOption, onSelect, translationKey }) => {
    const { t } = useTranslation();
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    const handleDropdownOpening = (isOpen: boolean) => {
        if (!isOpen && !dropdownIsOpen) {
            return;
        }
        setDropdownIsOpen(isOpen);
    };

    return (
        <OutsideClickHandler onOutsideClick={() => handleDropdownOpening(false)}>
            <Container>
                <Button
                    onClick={() => {
                        handleDropdownOpening(!dropdownIsOpen);
                    }}
                    isActive={dropdownIsOpen}
                    fullWidth={translationKey == 'leaderboard'}
                >
                    <InnerButton>
                        <FlexDiv>
                            {translationKey == 'leaderboard' || translationKey == 'ammlp'
                                ? t(`dropdown.${translationKey}.round`, { roundNumber: activeOption })
                                : t(`dropdown.${translationKey}.${activeOption.toLowerCase()}`)}
                        </FlexDiv>
                        <StyledDownIcon className={dropdownIsOpen ? `icon icon--caret-up` : `icon icon--caret-down`} />
                    </InnerButton>
                </Button>
                {dropdownIsOpen && (
                    <DropdownContainer>
                        <DropDown fullWidth={translationKey == 'leaderboard'}>
                            {options.map((option: string) => (
                                <DropDownItem
                                    key={option}
                                    onClick={() => {
                                        onSelect(option);
                                        handleDropdownOpening(false);
                                    }}
                                >
                                    <FlexDivCentered>
                                        <Name>
                                            {translationKey == 'leaderboard' || translationKey == 'ammlp'
                                                ? t(`dropdown.${translationKey}.round`, { roundNumber: Number(option) })
                                                : t(`dropdown.${translationKey}.${option.toLowerCase()}`)}
                                        </Name>
                                    </FlexDivCentered>
                                </DropDownItem>
                            ))}
                        </DropDown>
                    </DropdownContainer>
                )}
            </Container>
        </OutsideClickHandler>
    );
};

const Container = styled(FlexDivColumnCentered)`
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        min-width: 120px;
        margin-bottom: 10px;
    }
`;

const Button = styled.button<{ isActive: boolean; fullWidth: boolean }>`
    position: relative;
    width: ${(props) => (props.fullWidth ? '100%' : '170px')};
    height: 30px;
    border: none;
    background: transparent;
    padding: 2px;
    border-radius: 8px;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        padding: 0px;
    }
`;

const InnerButton = styled(FlexDivRowCentered)`
    background: ${(props) => props.theme.background.quinary};
    border-radius: 8px;
    font-weight: 400;
    font-size: 13px;
    line-height: 36px;
    letter-spacing: 0.35px;
    color: ${(props) => props.theme.textColor.tertiary};
    padding-left: 20px;
    padding-right: 20px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        padding-left: 15px;
        padding-right: 15px;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    z-index: 1000;
`;

const DropDown = styled(FlexDivColumn)<{ fullWidth: boolean }>`
    background: ${(props) => props.theme.background.primary};
    border-radius: 8px;
    position: absolute;
    margin-top: 12px;
    margin-left: 2px;
    padding: 8px;
    width: ${(props) => (props.fullWidth ? '100%' : '170px')};
    box-shadow: 0px 4px 31px 3px rgba(0, 0, 0, 0.45);
    max-height: 250px;
    overflow-y: auto;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
    }
`;

const DropDownItem = styled(FlexDiv)`
    padding: 8px 12px;
    cursor: pointer;
    color: ${(props) => props.theme.textColor.tertiary};
    &:hover {
        background: ${Colors.YANKEES_BLUE};
        border-radius: 12px;
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

const Name = styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0.35px;
    color: ${(props) => props.theme.textColor.tertiary};
    display: block;
    text-transform: capitalize;
    &:hover {
        color: ${(props) => props.theme.textColor.secondary};
    }
`;

const StyledDownIcon = styled.i`
    color: ${(props) => props.theme.textColor.primary};
    font-size: 13px;
    margin-left: 10px;
`;

export default Dropdown;
