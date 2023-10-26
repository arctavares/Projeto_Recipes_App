export async function filterByIngredient(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function filterByName(name) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function filterByFirstLetter(firstLetter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function filterByCategory(category) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}
