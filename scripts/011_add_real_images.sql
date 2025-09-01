-- Agregar imágenes reales a los productos existentes
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Actualizar Nike Air Max 270 con imágenes reales
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop'
]
WHERE name = 'Nike Air Max 270';

-- Actualizar Adidas Ultraboost 22
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
]
WHERE name = 'Adidas Ultraboost 22';

-- Actualizar Converse Chuck Taylor
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
]
WHERE name = 'Converse Chuck Taylor';

-- Actualizar Vans Old Skool
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
]
WHERE name = 'Vans Old Skool';

-- Actualizar Puma RS-X
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop'
]
WHERE name = 'Puma RS-X';

-- Actualizar New Balance 990v5
UPDATE public.products 
SET images = ARRAY[
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop'
]
WHERE name = 'New Balance 990v5';

-- Verificar que las imágenes se hayan actualizado
SELECT 
  name,
  images,
  array_length(images, 1) as image_count
FROM public.products
ORDER BY created_at DESC;
