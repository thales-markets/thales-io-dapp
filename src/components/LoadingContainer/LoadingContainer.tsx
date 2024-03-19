import { CustomCircularProgress, LoaderContainer } from './styled-components';

type LoadingContainerProps = {
    isLoading: boolean;
    children: React.ReactNode;
};

const LoadingContainer: React.FC<LoadingContainerProps> = ({ isLoading, children }) => {
    return (
        <>
            {isLoading ? (
                <LoaderContainer>
                    <CustomCircularProgress />
                </LoaderContainer>
            ) : (
                children
            )}
        </>
    );
};

export default LoadingContainer;
