import { Container, CustomCircularProgress } from './styled-components';

type LoadingContainerProps = {
    isLoading: boolean;
    children: React.ReactNode;
};

const LoadingContainer: React.FC<LoadingContainerProps> = ({ isLoading, children }) => {
    return <Container>{isLoading ? <CustomCircularProgress /> : children}</Container>;
};

export default LoadingContainer;
