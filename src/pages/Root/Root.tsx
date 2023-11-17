import { Store } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

interface RootProps {
    store: Store;
}

const Root: React.FC<RootProps> = ({ store }) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default Root;
