const sortByPrice = (products, ascending) => {
    return [...products].sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      if (ascending) {
        return priceA - priceB;
      }
      return priceB - priceA;
    });
  };
  
  export default sortByPrice;