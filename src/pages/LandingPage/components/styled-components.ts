import styled from 'styled-components';

export const CollapseContainer = styled.div<{ hideLine?: boolean }>`
    margin-bottom: 20px;
    border-bottom: 1px solid ${(props) => (props.hideLine ? 'transparent' : props.theme.borderColor.quaternary)};
`;

export const CollapseIcon = styled.i`
    padding-left: 3px;
    font-size: 13px;
`;
