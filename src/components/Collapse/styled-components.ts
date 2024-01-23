import styled from 'styled-components';

export const CollapseContainer = styled.div<{ hideLine?: boolean; marginBottom?: string }>`
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '20px')};
    border-bottom: 1px solid ${(props) => (props.hideLine ? 'transparent' : props.theme.borderColor.quaternary)};
`;

export const CollapseIcon = styled.i`
    padding-left: 3px;
    font-size: 13px;
`;

export const Highlight = styled.div<{ marginBottom?: string; cursor?: string; fontSize?: string; fontFamily?: string }>`
    cursor: ${(props) => (props.cursor ? props.cursor : 'default')};
    color: white;
    font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'MontserratBold')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '17px')};
    font-style: normal;
    margin-bottom: ${(props) => (props.marginBottom ? props.marginBottom : '0px')};
    line-height: 140%;
`;
