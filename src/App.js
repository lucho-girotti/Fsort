import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from './components/Header';
import FolderChooser from './components/FolderChooser';
import './App.css';
const App = () => {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx("main", { style: { padding: '20px' }, children: _jsx(FolderChooser, {}) })] }));
};
export default App;
