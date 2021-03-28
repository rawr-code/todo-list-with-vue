export const formatDate = (date: Date): string =>
  date.toISOString().substr(0, 10);

export const Today = (): string => formatDate(new Date());
