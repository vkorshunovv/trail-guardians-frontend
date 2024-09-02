export const formatLocation = (location: string) => {
  return location[0].toUpperCase() === location[0]
    ? location
    : location[0].toUpperCase() + location.slice(1);
};
