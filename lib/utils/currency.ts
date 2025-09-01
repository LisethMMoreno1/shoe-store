/**
 * Formatea un precio en pesos colombianos (COP)
 * @param price - El precio en centavos o como número
 * @returns El precio formateado como string
 */
export function formatPriceCOP(price: number): string {
  // Asegurar que el precio sea un número
  const numericPrice = typeof price === 'number' ? price : parseFloat(price.toString());
  
  // Formatear con separadores de miles usando punto (formato colombiano)
  const formatted = numericPrice.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'decimal'
  });
  
  return `$${formatted} COP`;
}

/**
 * Formatea un precio sin el símbolo de moneda
 * @param price - El precio en centavos o como número
 * @returns El precio formateado como string sin símbolo de moneda
 */
export function formatPriceNumber(price: number): string {
  const numericPrice = typeof price === 'number' ? price : parseFloat(price.toString());
  
  return numericPrice.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: 'decimal'
  });
}
