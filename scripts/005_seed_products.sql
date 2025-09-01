-- Insertando productos de ejemplo para la tienda de zapatos
INSERT INTO public.products (name, description, price, brand, category, color, images, is_active) VALUES
('Nike Air Max 270', 'Zapatillas deportivas con tecnología Air Max para máxima comodidad', 159.99, 'Nike', 'Deportivas', 'Negro', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true),
('Adidas Ultraboost 22', 'Zapatillas de running con tecnología Boost para mayor retorno de energía', 189.99, 'Adidas', 'Running', 'Blanco', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true),
('Converse Chuck Taylor', 'Zapatillas clásicas de lona, perfectas para uso casual', 79.99, 'Converse', 'Casual', 'Rojo', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true),
('Vans Old Skool', 'Zapatillas skate clásicas con diseño icónico', 89.99, 'Vans', 'Skate', 'Negro', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true),
('Puma RS-X', 'Zapatillas retro-futuristas con diseño llamativo', 129.99, 'Puma', 'Lifestyle', 'Blanco', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true),
('New Balance 990v5', 'Zapatillas premium hechas en USA con materiales de alta calidad', 199.99, 'New Balance', 'Premium', 'Gris', ARRAY['/zapato-frontal.png', '/zapato-lateral.png'], true);

-- Insertar tallas para cada producto
DO $$
DECLARE
    product_record RECORD;
    sizes TEXT[] := ARRAY['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
    size_text TEXT;
BEGIN
    FOR product_record IN SELECT id FROM public.products LOOP
        FOREACH size_text IN ARRAY sizes LOOP
            INSERT INTO public.product_sizes (product_id, size, stock_quantity, is_available) 
            VALUES (product_record.id, size_text, FLOOR(RANDOM() * 20) + 5, true);
        END LOOP;
    END LOOP;
END $$;
