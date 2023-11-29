import YourTransactions from './Transactions';
import { Bottom, Container, Top } from './styled-components';

const LPStaking: React.FC = () => {
    return (
        <>
            <Container>
                <Top></Top>
                <Bottom></Bottom>
            </Container>
            <YourTransactions width="60%" />
        </>
    );
};

export default LPStaking;
