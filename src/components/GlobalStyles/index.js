import "./GlobalStyles.scss";
import PropTypes from "prop-types";

const GlobalStyle = ({ children }) => {
    return children;
};

GlobalStyle.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GlobalStyle;
