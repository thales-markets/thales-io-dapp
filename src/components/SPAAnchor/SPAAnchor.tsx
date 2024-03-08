import React, { CSSProperties, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { navigateTo } from '../../utils/routes';

type FieldValidationMessageProps = {
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    style?: CSSProperties;
    href?: string;
    simpleOnClick?: boolean;
    scrollTop?: boolean;
};

const ifIpfsDeployment = process.env.REACT_APP_IPFS_DEPLOYMENT === 'true';

const SPAAnchor: React.FC<FieldValidationMessageProps> = ({
    onClick,
    children,
    href,
    style,
    className,
    simpleOnClick,
    scrollTop,
}) => {
    if (!href) {
        return <>{children}</>;
    }
    return (
        <>
            {ifIpfsDeployment ? (
                <Anchor className={className} style={style} href={href}>
                    {children}
                </Anchor>
            ) : (
                <Anchor
                    className={className}
                    style={style}
                    href={href}
                    onClick={
                        simpleOnClick
                            ? onClick
                            : async (event) => {
                                  event.preventDefault();
                                  onClick && onClick(event);
                                  if (!href.includes('http')) {
                                      navigateTo(href, undefined, scrollTop);
                                  } else {
                                      window.open(href);
                                  }
                              }
                    }
                >
                    {children}
                </Anchor>
            )}
        </>
    );
};

const Anchor = styled.a`
    color: ${(props) => props.theme.link.textColor.secondary};
    display: contents;
`;

export default SPAAnchor;
