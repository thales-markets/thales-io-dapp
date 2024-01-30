import styled from 'styled-components';
import { FlexDiv } from 'styles/common';
import { SectionHeader } from '../styled-components';

export const ContentContainer = styled(FlexDiv)`
    width: 100%;
    flex-direction: column;
`;

export const Icon = styled.i`
    font-size: 24px;
    padding-right: 3px;
`;

export const Header = styled(SectionHeader)`
    margin-bottom: 15px;
    flex-direction: row;
    padding: 0;
`;
