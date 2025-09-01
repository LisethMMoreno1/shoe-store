-- Verificar que las imágenes se estén guardando correctamente en la tabla products
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Verificar la estructura de la tabla products
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns 
WHERE table_name = 'products' 
ORDER BY ordinal_position;

-- Verificar los productos existentes y sus imágenes
SELECT 
  id,
  name,
  images,
  array_length(images, 1) as image_count
FROM public.products
ORDER BY created_at DESC;

-- Verificar que el campo images sea un array
SELECT 
  id,
  name,
  images,
  pg_typeof(images) as images_type
FROM public.products
LIMIT 3;

-- Actualizar productos con imágenes más realistas (opcional)
-- Descomenta las siguientes líneas si quieres actualizar las imágenes

/*
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop'
]
WHERE name = 'Nike Air Max 270';

UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
]
WHERE name = 'Adidas Ultraboost 22';
*/

-- Verificar que las políticas RLS permitan ver las imágenes
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'products';
