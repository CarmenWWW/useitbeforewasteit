// Search item.name && item.category => recommendation
// Salad for all greens
// BBQ for all meats
// Egg: stir fry, steam egg, omelet
// Dairy: bottom up
// Any fancy ideas...

const lookupRecipe = (item) => {
  const keyword2Recipes = {
    egg: ['stir fry', 'steam egg', 'omelet'],
    meat: ['BBQ'],
    seafood: ['BBQ'],
    dairy: ['just drink it'],
    milk: ['just drink it'],
    vegetable: ['just eat it', 'salad'],
    fruit: ['just eat it', 'salad', 'juice'],
    default: ['just finish it'],
  };

  const name = item.name.toLowerCase();
  const category = item.category.toLowerCase();

  for (let keyword of Object.keys(keyword2Recipes)) {
    const recipes = keyword2Recipes[keyword];
    if (name.includes(keyword) || category.includes(keyword)) {
      return recipes[Math.floor(Math.random() * recipes.length)];
    }
  }

  return keyword2Recipes['default'][0];
};

export const Recommendation = ({ item }) => {
  const recipe = lookupRecipe(item);

  return (
    <div>
      For {item.name}, maybe you can try <strong>{recipe}</strong>.
    </div>
  );
};
