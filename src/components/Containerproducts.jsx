import "../styles/Containerproduct.css";
const ProductContainer = (props) => {
    return (
        <section className="products__section">
            <h1 className="products__title">Los productos</h1>
            <div className="products_container">
                {props.children}
            </div>
        </section>
    )
}

export default ProductContainer