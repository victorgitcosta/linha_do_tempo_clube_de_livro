import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="header">
            <div className="header-dot"></div>
            <img src={logo} alt="E Fora dos Stories" className="header-logo" />
            <div className="header-dot"></div>
        </header>
    );
};

export default Header;