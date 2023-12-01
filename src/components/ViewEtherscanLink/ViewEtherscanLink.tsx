import { ReactComponent as ArrowHyperlinkIcon } from 'assets/images/arrow-hyperlink.svg';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getNetworkId } from 'redux/modules/wallet';
import { RootState } from 'redux/rootReducer';
import styled from 'styled-components';
import { getEtherscanTxLink, truncateAddress } from 'thales-utils';

type ViewEtherscanLinkProps = {
    isDisabled?: boolean;
    showAddress?: boolean;
    hash: string;
};

const ViewEtherscanLink: React.FC<ViewEtherscanLinkProps> = ({ hash, showAddress }) => {
    const { t } = useTranslation();
    const networkId = useSelector((state: RootState) => getNetworkId(state));

    return (
        <StyledLink href={getEtherscanTxLink(networkId, hash)} target="_blank" rel="noreferrer">
            {showAddress ? truncateAddress(hash) : t('common.transaction.view')}
            <ArrowIcon width="8" height="8" />
        </StyledLink>
    );
};

const StyledLink = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    &:hover {
        text-decoration: underline;
    }
`;

const ArrowIcon = styled(ArrowHyperlinkIcon)`
    margin-left: 5px;
    ${StyledLink} {
        fill: ${(props) => props.theme.link.textColor.secondary};
    }
    ${StyledLink}:hover & path {
        text-decoration: underline;
    }
`;

export default ViewEtherscanLink;
