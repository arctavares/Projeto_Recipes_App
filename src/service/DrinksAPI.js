export async function filterDrinkByIngredient(ingredient) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function filterDrinkByName(name) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function filterDrinkByFirstLetter(firstLetter) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function filterDrinksByCategory(category) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function getDrinkById(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks[0];
}
