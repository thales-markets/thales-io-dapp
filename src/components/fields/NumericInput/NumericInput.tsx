import MuiTooltip from '@material-ui/core/Tooltip';
import { ReactComponent as BalanceIcon } from 'assets/images/balance-icon.svg';
import InlineLoader from 'components/InlineLoader';
import Tooltip from 'components/Tooltip';
import { ScreenSizeBreakpoint } from 'enums/ui';
import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDivCentered } from 'styles/common';
import { DEFAULT_TOKEN_DECIMALS } from 'thales-utils/src/constants/defaults';
import { FieldContainer, FieldLabel, Input } from '../common';

type NumericInputProps = {
    value: string | number;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    step?: string;
    max?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>, value: string) => void;
    showValidation?: boolean;
    validationMessage?: string;
    currencyComponent?: any;
    currencyLabel?: string;
    tooltip?: string;
    onMaxButton?: any;
    maxButtonDisabled?: boolean;
    balance?: string;
    isBalanceLoading?: boolean;
    info?: string;
    inputPadding?: string;
    margin?: string;
    inputFontSize?: string;
    width?: string;
    height?: string;
    enableCurrencyComponentOnly?: boolean;
    containerWidth?: string;
};

const INVALID_CHARS = ['-', '+', 'e'];

const NumericInput: React.FC<NumericInputProps> = ({
    value,
    label,
    placeholder,
    disabled,
    step,
    max,
    onChange,
    showValidation,
    validationMessage,
    currencyComponent,
    currencyLabel,
    tooltip,
    onMaxButton,
    maxButtonDisabled,
    balance,
    isBalanceLoading,
    info,
    inputPadding,
    margin,
    inputFontSize,
    width,
    height,
    enableCurrencyComponentOnly,
    containerWidth,
    ...rest
}) => {
    const { t } = useTranslation();

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        let trimmedValue = value;
        if (value.indexOf('.') > -1) {
            const numberOfDecimals = value.split('.')[1].length;
            if (numberOfDecimals > DEFAULT_TOKEN_DECIMALS) {
                trimmedValue = value.substring(0, value.length - 1);
            }
        }

        onChange(e, trimmedValue.replace(/,/g, '.').replace(/[e+-]/gi, ''));
    };

    return (
        <ValidationTooltip open={showValidation} title={validationMessage || ''} placement="bottom">
            <FieldContainer margin={margin} width={containerWidth}>
                {label && (
                    <FieldLabel>
                        {label}
                        {tooltip && <Tooltip iconFontSize={12} overlay={tooltip} />}
                    </FieldLabel>
                )}
                {balance && (
                    <BalanceContainer>
                        <StyledBalanceIcon />
                        {isBalanceLoading ? <InlineLoader /> : balance}
                    </BalanceContainer>
                )}
                {info && (
                    <InfoWrapper>
                        <InfoText>{info}</InfoText>
                    </InfoWrapper>
                )}
                <StyledInput
                    {...rest}
                    value={value}
                    type="number"
                    onChange={handleOnChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={showValidation ? 'error' : ''}
                    onKeyDown={(e) => {
                        if (INVALID_CHARS.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    min="0"
                    max={max || 'any'}
                    step={step || 'any'}
                    title=""
                    padding={inputPadding}
                    fontSize={inputFontSize}
                    width={width}
                    height={height}
                />
                <RightContainer>
                    {currencyLabel && (
                        <CurrencyLabel className={disabled ? 'currency-label disabled' : 'currency-label'}>
                            {currencyLabel}
                        </CurrencyLabel>
                    )}
                    {onMaxButton && (
                        <MaxButton disabled={disabled || maxButtonDisabled} onClick={onMaxButton}>
                            {t('common.max')}
                        </MaxButton>
                    )}

                    {currencyComponent && (
                        <CurrencyComponentContainer
                            className={disabled && !enableCurrencyComponentOnly ? 'disabled' : ''}
                            hasSeparator={onMaxButton}
                        >
                            {currencyComponent}
                        </CurrencyComponentContainer>
                    )}
                </RightContainer>
            </FieldContainer>
        </ValidationTooltip>
    );
};

const StyledInput = styled(Input)<{ padding?: string }>`
    padding: ${(props) => props.padding || '5px 120px 5px 10px'};
`;

const RightContainer = styled(FlexDivCentered)`
    position: absolute;
    right: 6px;
    bottom: 7px;
`;

const CurrencyLabel = styled.label<{ hasSeparator?: boolean }>`
    border-left: ${(props) => (props.hasSeparator ? `2px solid ${props.theme.borderColor.primary}` : 'none')};
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    color: ${(props) => props.theme.textColor.primary};
    padding-left: 5px;
    padding-right: 5px;
    pointer-events: none;
    &.disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const MaxButton = styled.button`
    background: transparent;
    border: none;
    border-radius: 3px;
    font-size: 13px;
    line-height: 20px;
    background: ${(props) => props.theme.button.background.tertiary};
    color: ${(props) => props.theme.button.textColor.tertiary};
    text-transform: uppercase;
    cursor: pointer;
    padding: 0 10px;
    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const ValidationTooltip = styled((props) => (
    <MuiTooltip PopperProps={{ disablePortal: true }} classes={{ popper: props.className }} {...props} />
))`
    & .MuiTooltip-tooltip {
        margin: -10px 0 0 0;
        padding: 2px 4px;
        font-weight: 600;
        font-size: 13px;
        line-height: 15px;
        color: ${(props) => props.theme.error.textColor.primary};
        background: linear-gradient(
            180deg,
            ${(props) => props.theme.background.quaternary} 50%,
            ${(props) => props.theme.background.primary} 50%
        );
        text-align: center;
        max-width: 320px;
    }
`;

const BalanceContainer = styled(FlexDivCentered)`
    position: absolute;
    right: 0;
    bottom: 40px;
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: ${(props) => props.theme.textColor.secondary};
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        font-size: 12px;
    }
`;

const StyledBalanceIcon = styled(BalanceIcon)`
    height: 13px;
    margin: 0 5px 1px 0;
    path {
        fill: ${(props) => props.theme.textColor.secondary};
    }
    @media (max-width: ${ScreenSizeBreakpoint.SMALL}px) {
        display: none;
    }
`;

const CurrencyComponentContainer = styled(FlexDivCentered)<{ hasSeparator?: boolean }>`
    ${(props) => (props.hasSeparator ? `border-left: 2px solid ${props.theme.borderColor.primary};` : '')}
    line-height: 15px;
    padding-right: 2px;
    &.disabled {
        opacity: 0.4;
        cursor: default;
    }
`;

const InfoWrapper = styled.div`
    position: absolute;
    top: -8px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    background: ${(props) => props.theme.background.primary};
    padding: 0 5px;
    z-index: 1;
`;

const InfoText = styled.span`
    font-size: 13px;
    line-height: 16px;
    color: ${(props) => props.theme.textColor.secondary};
    text-transform: uppercase;
`;

export default NumericInput;
