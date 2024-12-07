import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import logo from '../assets/logo.svg';
import './Header.css';
const Header = () => {
    return (_jsx("header", { className: "header", children: _jsxs("div", { className: "header-content", children: [_jsx("img", { src: logo, alt: "Logo", className: "logo" }), _jsx("h1", { children: "Fsort" })] }) }));
};
export default Header;
