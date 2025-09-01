-- Agregar productos con ofertas especiales
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Crear tabla de ofertas especiales (opcional, para futuras implementaciones)
CREATE TABLE IF NOT EXISTS public.special_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed', '2x1', '3x2')),
  discount_value DECIMAL(10,2),
  discount_percentage INTEGER,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de productos en oferta
CREATE TABLE IF NOT EXISTS public.product_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  offer_id UUID REFERENCES public.special_offers(id) ON DELETE CASCADE,
  original_price DECIMAL(10,2) NOT NULL,
  offer_price DECIMAL(10,2) NOT NULL,
  discount_percentage INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(product_id)
);

-- Insertar ofertas especiales
INSERT INTO public.special_offers (title, description, discount_type, discount_percentage, valid_until) VALUES
('2x1 en Zapatillas Deportivas', 'Lleva dos pares de zapatillas deportivas por el precio de una', '2x1', 50, NOW() + INTERVAL '30 days'),
('Descuento del 30% en Running', 'Todas las zapatillas de running con 30% de descuento', 'percentage', 30, NOW() + INTERVAL '30 days'),
('3x2 en Zapatillas Casuales', 'Compra 3 pares de zapatillas casuales y paga solo 2', '3x2', 33, NOW() + INTERVAL '30 days'),
('Ofertas Flash - 24h', 'Ofertas especiales que solo duran 24 horas', 'percentage', 40, NOW() + INTERVAL '1 day');

-- Insertar productos en oferta (ejemplo con productos existentes)
-- Primero, obtener algunos productos para aplicar ofertas
DO $$
DECLARE
    product_record RECORD;
    offer_record RECORD;
    discount_percentage INTEGER;
BEGIN
    -- Para cada producto, crear una oferta aleatoria
    FOR product_record IN SELECT id, price FROM public.products LIMIT 6 LOOP
        -- Seleccionar una oferta aleatoria
        SELECT * INTO offer_record FROM public.special_offers ORDER BY RANDOM() LIMIT 1;
        
        -- Calcular descuento basado en el tipo de oferta
        CASE offer_record.discount_type
            WHEN 'percentage' THEN
                discount_percentage := offer_record.discount_percentage;
            WHEN '2x1' THEN
                discount_percentage := 50;
            WHEN '3x2' THEN
                discount_percentage := 33;
            ELSE
                discount_percentage := 25;
        END CASE;
        
        -- Insertar oferta del producto
        INSERT INTO public.product_offers (
            product_id, 
            offer_id, 
            original_price, 
            offer_price, 
            discount_percentage
        ) VALUES (
            product_record.id,
            offer_record.id,
            product_record.price,
            product_record.price * (1 - discount_percentage::DECIMAL / 100),
            discount_percentage
        );
    END LOOP;
END $$;

-- Verificar las ofertas creadas
SELECT 
    po.id,
    p.name as product_name,
    p.price as original_price,
    po.offer_price,
    po.discount_percentage,
    so.title as offer_title,
    so.discount_type
FROM public.product_offers po
JOIN public.products p ON po.product_id = p.id
JOIN public.special_offers so ON po.offer_id = so.id
WHERE po.is_active = true
ORDER BY po.created_at DESC;

-- Habilitar RLS en las nuevas tablas
ALTER TABLE public.special_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_offers ENABLE ROW LEVEL SECURITY;

-- Políticas para special_offers
CREATE POLICY "Anyone can view active special offers" ON public.special_offers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage special offers" ON public.special_offers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para product_offers
CREATE POLICY "Anyone can view active product offers" ON public.product_offers
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage product offers" ON public.product_offers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
