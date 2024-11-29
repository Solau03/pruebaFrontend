const sortByName = (products, ascending) => {
  return [...products].sort((a, b) => {
    if (ascending) {
      return a.name.localeCompare(b.name);
    }
    return b.name.localeCompare(a.name);
  });
};


  
export default sortByName; 
 