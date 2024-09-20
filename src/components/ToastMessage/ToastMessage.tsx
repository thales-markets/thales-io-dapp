import React, { ReactText } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, ToastPosition, TypeOptions } from 'react-toastify';
import styled from 'styled-components';
import { FlexDivColumn, FlexDivRowCentered } from 'styles/common';

type ToastMessageProps = { id?: ReactText; type: TypeOptions; message: string };

const ToastMessage: React.FC<ToastMessageProps> = ({ id, type, message }) => {
    const { t } = useTranslation();

    const isDefaultType = type === 'default';
    const title = !isDefaultType ? t('common.status.' + type) : '';

    return (
        <Container hasTitle={!!title}>
            {!isDefaultType && <Icon className={`icon icon--${type}`} />}
            <FlexDivColumn>
                {title && <Title>{title}</Title>}
                <Message isLargeFont={!title}>{message}</Message>
            </FlexDivColumn>
            {id !== undefined && <CloseIcon className="icon icon--x-sign" onClick={() => toast.dismiss(id)} />}
        </Container>
    );
};

const Container = styled(FlexDivRowCentered)<{ hasTitle: boolean }>`
    color: ${(props) => props.theme.toastMessages.error.textColor.primary};
    ${(props) => (props.hasTitle ? 'margin-top: -6px;' : '')}
`;

const Icon = styled.i`
    color: ${(props) => props.theme.toastMessages.error.textColor.primary};
    font-size: 28px;
    margin-right: 12px;
`;

const Title = styled.span`
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    text-transform: uppercase;
`;

const Message = styled.span<{ isLargeFont?: boolean }>`
    font-weight: 400;
    font-size: ${(props) => (props.isLargeFont ? '18px' : '13px')};
    @media (max-width: 600px) {
        line-height: ${(props) => (props.isLargeFont ? '18px' : '13px')};
    }
`;

const CloseIcon = styled.i`
    position: absolute;
    top: 12px;
    right: 15px;
    font-size: 12px;
    line-height: 12px;
    cursor: pointer;
    color: ${(props) => props.theme.toastMessages.error.textColor.primary};
`;

const toastBasicProperties = {
    position: 'top-right' as ToastPosition,
    autoClose: 4000, // 4s
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    isLoading: false,
    closeButton: false,
};

export const getSuccessToastOptions = (message: string, id?: ReactText) => {
    return {
        ...toastBasicProperties,
        toastId: id,
        type: 'success' as TypeOptions,
        render: message, // not relevant on ToastOptions, only on UpdateOptions
    };
};

export const getErrorToastOptions = (message: string, id?: ReactText) => {
    return {
        ...toastBasicProperties,
        toastId: id,
        type: 'error' as TypeOptions,
        render: message, // not relevant on ToastOptions, only on UpdateOptions
    };
};

export const getLoadingToastOptions = () => {
    return {
        ...toastBasicProperties,
        isLoading: true,
        className: 'info',
    };
};

export const getDefaultToastContent = (message: string) => {
    return <ToastMessage type="default" message={message} />;
};

export const getSuccessToastContent = (message: string) => {
    return <ToastMessage type="success" message={message} />;
};

export const getErrorToastContent = (message: string) => {
    return <ToastMessage type="error" message={message} />;
};
