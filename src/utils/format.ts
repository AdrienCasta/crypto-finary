export const toEuro = (number: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(
    number
  );

export const ddmmyyyy = (
  date: Date,
  seperator: "-" | undefined = undefined
) => {
  const dateString = date.toLocaleDateString();

  return seperator ? dateString.replace(/\//g, seperator) : dateString;
};

export const yyyymmdd = (date: Date) => date.toISOString().substring(0, 10);
