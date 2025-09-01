-- Insertar productos de ejemplo
INSERT INTO public.products (name, description, price, brand, category, color, images, is_active) VALUES
('Nike Air Max 270', 'Zapatillas deportivas con tecnología Air Max para máxima comodidad', 129.99, 'Nike', 'Deportivas', 'Negro', ARRAY['/placeholder.svg?height=400&width=400'], true),
('Adidas Ultraboost 22', 'Zapatillas de running con tecnología Boost para mayor retorno de energía', 149.99, 'Adidas', 'Running', 'Blanco', ARRAY['/placeholder.svg?height=400&width=400'], true),
('Converse Chuck Taylor', 'Zapatillas clásicas de lona, icónicas y versátiles', 59.99, 'Converse', 'Casual', 'Rojo', ARRAY['/placeholder.svg?height=400&width=400'], true),
('Vans Old Skool', 'Zapatillas skate clásicas con la icónica raya lateral', 69.99, 'Vans', 'Skate', 'Negro', ARRAY['/placeholder.svg?height=400&width=400'], true),
('Puma RS-X', 'Zapatillas retro-futuristas con diseño llamativo', 89.99, 'Puma', 'Lifestyle', 'Blanco', ARRAY['/placeholder.svg?height=400&width=400'], true),
('New Balance 990v5', 'Zapatillas premium hechas en USA con materiales de alta calidad', 179.99, 'New Balance', 'Lifestyle', 'Gris', ARRAY['/placeholder.svg?height=400&width=400'], true);

-- Insertar tallas para cada producto
DO $$
DECLARE
    product_record RECORD;
    size_array TEXT[] := ARRAY['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];
    size_item TEXT;
BEGIN
    FOR product_record IN SELECT id FROM public.products LOOP
        FOREACH size_item IN ARRAY size_array LOOP
            INSERT INTO public.product_sizes (product_id, size, stock_quantity, is_available)
            VALUES (product_record.id, size_item, FLOOR(RANDOM() * 20) + 5, true);
        END LOOP;
    END LOOP;
END $$;
