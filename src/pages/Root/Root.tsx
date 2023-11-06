import { Store } from 'redux';
import App from './App';

interface RootProps {
    store: Store;
}

const Root: React.FC<RootProps> = () => {
    return <App />;
};

export default Root;
