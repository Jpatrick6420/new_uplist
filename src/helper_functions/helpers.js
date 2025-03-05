export const titleCase = (name) => {
  const words = name.split(" ");
  const capitalized = words.map((word) => {
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalized.join(" ");
};
