import { THALES_CURRENCY } from 'constants/currency';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FlexDivColumn, FlexDivStart } from 'styles/common';
import { formatCurrencyWithKey } from 'thales-utils';

type FeeTooltipProps = {
    baseFee: number;
    protocolFee: number;
};

const FeeTooltip: React.FC<FeeTooltipProps> = ({ baseFee, protocolFee }) => {
    const { t } = useTranslation();

    return (
        <Container>
            <ContentContainer>
                <Label>{t('bridge.base-fee-label')}:</Label>
                <Value>{baseFee > 0 ? formatCurrencyWithKey(THALES_CURRENCY, baseFee) : '-'}</Value>
            </ContentContainer>
            <ContentContainer>
                <Label>{t('bridge.protocol-fee-label')}:</Label>
                <Value>{baseFee > 0 ? formatCurrencyWithKey(THALES_CURRENCY, protocolFee) : '-'}</Value>
            </ContentContainer>
            <Text>{t('bridge.base-fee-info')}</Text>
            <Text>{t('bridge.protocol-fee-info')}</Text>
        </Container>
    );
};

const Container = styled(FlexDivColumn)`
    width: 100%;
`;

const ContentContainer = styled(FlexDivStart)``;

const Label = styled.span`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-right: 5px;
`;

const Value = styled.span`
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
`;

const Text = styled.p`
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    margin-top: 10px;
`;

export default FeeTooltip;
