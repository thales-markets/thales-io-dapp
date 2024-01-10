import { ReactComponent as DownIcon } from 'assets/images/down.svg';
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
    translationKey: string;
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
        <>
            <OutsideClickHandler onOutsideClick={() => handleDropdownOpening(false)}>
                <Container>
                    <Button
                        onClick={() => {
                            handleDropdownOpening(!dropdownIsOpen);
                        }}
                        isActive={dropdownIsOpen}
                    >
                        <InnerButton>
                            <FlexDiv>{t(`governance.${translationKey}.${activeOption}`)}</FlexDiv>
                            <StyledDownIcon />
                        </InnerButton>
                    </Button>
                    {dropdownIsOpen && (
                        <DropdownContainer>
                            <DropDown>
                                {options.map((options: string) => (
                                    <DropDownItem
                                        key={options}
                                        onClick={() => {
                                            onSelect(options);
                                            handleDropdownOpening(false);
                                        }}
                                    >
                                        <FlexDivCentered>
                                            <Name>{t(`governance.${translationKey}.${options}`)}</Name>
                                        </FlexDivCentered>
                                    </DropDownItem>
                                ))}
                            </DropDown>
                        </DropdownContainer>
                    )}
                </Container>
            </OutsideClickHandler>
        </>
    );
};

const Container = styled(FlexDivColumnCentered)`
    width: 140px;
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        width: 100%;
        min-width: 200px;
        margin-bottom: 10px;
    }
`;

const Button = styled.button<{ isActive: boolean }>`
    position: relative;
    width: 105px;
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
    }
`;

const InnerButton = styled(FlexDivRowCentered)`
    background: ${Colors.METALLIC_BLUE};
    border-radius: 8px;
    font-weight: 400;
    font-size: 13px;
    line-height: 36px;
    letter-spacing: 0.35px;
    color: ${Colors.GRAY};
    text-transform: capitalize;
    padding-left: 20px;
    padding-right: 20px;
`;

const DropdownContainer = styled.div`
    position: relative;
    z-index: 1000;
`;

const DropDown = styled(FlexDivColumn)`
    background: ${Colors.METALLIC_BLUE};
    border-radius: 8px;
    position: absolute;
    margin-top: 12px;
    margin-left: 2px;
    padding: 8px;
    width: 101px;
`;

const DropDownItem = styled(FlexDiv)`
    padding: 8px 12px;
    cursor: pointer;
    color: ${Colors.GRAY};
    &:hover {
        background: ${(props) => props.theme.background.primary};
        border-radius: 12px;
    }
`;

const Name = styled.div`
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    letter-spacing: 0.35px;
    color: ${Colors.GRAY};
    display: block;
    text-transform: capitalize;
`;

const StyledDownIcon = styled(DownIcon)`
    height: 15px;
    width: 15px;
    path {
        fill: ${(props) => props.theme.textColor.primary};
    }
`;

export default Dropdown;
