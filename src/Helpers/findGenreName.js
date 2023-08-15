export const findGenreName = (genreList, id) => {
  let genre_name;
  genreList.map((genre) => {
    if (genre.id === id) {
      genre_name = genre.name;
    }
    return genre_name;
  });
  return genre_name;
};
