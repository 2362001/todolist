export const getClasses = (classes: string[]): string => {
    return classes.filter((item) => item !== '').join(' ').trim();
  };