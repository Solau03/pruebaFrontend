import "./App.css";
import { useState, useEffect } from "react";
import ProductContainer from "./components/Containerproducts";
import { Product } from "./components/Product";
import Search from "./components/Search";
import sortByName from "./ordename";
import sortByPrice from "./ordenum";
import fetchData from "./fetchData";

const App = () => {
  const [products, setProducts] = useState([]); // Todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [categories, setCategories] = useState([]); // Todas las categorías
  const [cart, setCart] = useState([]); // Productos en el carrito
  const path = "./pueba_frontend.json";

  // Cargar productos y categorías desde la ruta configurada
  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchData(path); // Llama a la función fetchData
      if (data) {
        // Procesar precios al cargar productos
        const processedProducts = data.products.map((product) => ({
          ...product,
          price: parseFloat(product.price.replace(/\./g, "")), // Convierte precios
        }));
        setProducts(processedProducts);
        setFilteredProducts(processedProducts); // Inicializa con todos los productos
        setCategories(data.categories);
      }
    };
    loadProducts();
  }, [path]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  // Función para incrementar la cantidad de un producto
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para decrementar la cantidad de un producto
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  // Filtrar y ordenar productos
  const handleSearch = (query) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handlePriceFilter = (priceRange) => {
    const results = products.filter((product) => {
      const price = product.price;
      return priceRange.min <= price && price <= priceRange.max;
    });
    setFilteredProducts(results);
  };

  const handlebestFilter = () => {
    const results = products.filter((product) => product.best_seller === true);
    setFilteredProducts(results);
  };

  const handleagotadoFilter = () => {
    const results = products.filter((product) => product.available === false);
    setFilteredProducts(results);
  };

  const handleadispoFilter = () => {
    const results = products.filter((product) => product.available === true);
    setFilteredProducts(results);
  };

  const handleCategory = (categoryId) => {
    const results = products.filter((product) =>
      product.categories.some((id) => id === categoryId)
    );
    setFilteredProducts(results);
  };

  const handleSortByName = (ascending) => {
    const sorted = sortByName(filteredProducts, ascending);
    setFilteredProducts([...sorted]); // Actualizar el estado con los productos ordenados
  };

  const handleSortByPrice = (ascending) => {
    const sorted = sortByPrice(filteredProducts, ascending);
    setFilteredProducts([...sorted]); // Actualizar el estado con los productos ordenados
  };

  const resetFilters = () => {
    setFilteredProducts(products);
  };

  return (
    <div>
      {/* Barra de búsqueda */}
      <Search
        onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        onagotadoFilter={handleagotadoFilter}
        onbestFilter={handlebestFilter}
        ondispoFilter={handleadispoFilter}
      />

      {/* Botones de categorías */}
      <div className="categorias">
        <h2>Categorías</h2>
        {categories.map((category) => (
          <button
            key={category.categori_id}
            onClick={() => handleCategory(category.categori_id)}
            className="btn-categorias"
          >
            {category.name}
            <span></span>
          </button>
        ))}
        <button onClick={resetFilters} className="btn-categorias">
          Mostrar Todos<span></span>
        </button>
        <div className="orden">
          <button className="btn-orden" onClick={() => handleSortByName(true)}>
            A-Z
          </button>
          <button className="btn-orden" onClick={() => handleSortByName(false)}>
            Z-A
          </button>
          <button className="btn-orden" onClick={() => handleSortByPrice(true)}>
            Menor a Mayor
          </button>
          <button className="btn-orden" onClick={() => handleSortByPrice(false)}>
            Mayor a Menor
          </button>
        </div>
      </div>

      {/* Contenedor de productos */}
      <ProductContainer>
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            price={`${product.price.toLocaleString("es-CO")}`}
            press={() =>
              handleAddToCart({
                id: product.id,
                name: product.name,
                price: product.price,
              })
            }
          />
        ))}
      </ProductContainer>

      {/* Mostrar el carrito */}
      <div className="master-container">
        <div className="card cart">
          <label className="title">Your cart</label>
          <div className="products">
            {cart.map((item) => (
              <div key={item.id} className="product">

                <img src={item.image} alt={item.name} width="60" height="60" />

                <div>
                  <span>{item.name}</span>
                  <p>Precio unitario: ${item.price.toLocaleString("es-CO")}</p>
                  <p>Subtotal: ${item.quantity * item.price}</p>

                  {/* Botones para incrementar o decrementar cantidad */}
                  <div className="quantity">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M20 12L4 12"></path>
                      </svg>
                    </button>
                    <label>{item.quantity}</label>
                    <button onClick={() => increaseQuantity(item.id)}>
                      <svg fill="none" viewBox="0 0 24 24" height="14" width="14" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.5" stroke="#47484b" d="M12 4V20M20 12H4"></path>
                      </svg>
                    </button>
                  </div>
                </div>


              </div>
            ))}
          </div>
        </div>

        <div className="card checkout">
          <label className="title">Checkout</label>
          <div className="details">
            <span>Your cart subtotal:</span>
            <span>${total.toLocaleString("es-CO")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
