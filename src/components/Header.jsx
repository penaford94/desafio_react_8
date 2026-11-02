import headerImage from "../assets/Header.jpg";


const Header = () => {
  return (
    <header
      className="pizza-header"
      style={{ backgroundImage: `url(${headerImage})` }}
    >
      <div className="header-content">
        <h1 className="h1 fw-bold mb-2">¡Pizzería Mamma Mia!</h1>
        <p>¡Tenemos las mejores pizzas que podrás encontrar!</p>
      </div>
    </header>
  );
};

export default Header;