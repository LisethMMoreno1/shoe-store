-- Actualizar precios de productos a Pesos Colombianos (COP)
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Tasa de cambio aproximada: 1 USD = 4,000 COP
-- Actualizar precios de productos existentes
UPDATE public.products 
SET price = CASE 
  WHEN name = 'Nike Air Max 270' THEN 639960  -- 159.99 USD * 4000
  WHEN name = 'Adidas Ultraboost 22' THEN 759960  -- 189.99 USD * 4000
  WHEN name = 'Converse Chuck Taylor' THEN 319960  -- 79.99 USD * 4000
  WHEN name = 'Vans Old Skool' THEN 359960  -- 89.99 USD * 4000
  WHEN name = 'Puma RS-X' THEN 519960  -- 129.99 USD * 4000
  WHEN name = 'New Balance 990v5' THEN 799960  -- 199.99 USD * 4000
  ELSE price * 4000  -- Para cualquier otro producto
END
WHERE price < 1000; -- Solo actualizar precios que parezcan estar en USD

-- Verificar los precios actualizados
SELECT 
  name,
  price,
  CASE 
    WHEN price > 100000 THEN 'COP'
    ELSE 'USD (necesita actualización)'
  END as currency_status
FROM public.products
ORDER BY price DESC;

-- Actualizar precios en la tabla product_offers si existe
-- (Esto se ejecutará solo si la tabla product_offers existe)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'product_offers') THEN
    UPDATE public.product_offers 
    SET 
      original_price = original_price * 4000,
      offer_price = offer_price * 4000
    WHERE original_price < 1000;
  END IF;
END $$;

-- Verificar que los precios se vean correctos en pesos colombianos
SELECT 
  name,
  price,
  CONCAT('$', TO_CHAR(price, 'FM999,999,999'), ' COP') as formatted_price
FROM public.products
ORDER BY price DESC;
