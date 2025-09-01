-- Crear bucket de almacenamiento para imágenes de productos
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Crear el bucket para almacenar imágenes de productos
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880, -- 5MB límite por archivo
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Crear políticas de acceso público para el bucket de productos
-- Permitir que cualquiera pueda ver las imágenes
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'products');

-- Permitir que solo los usuarios autenticados puedan subir imágenes
CREATE POLICY "Authenticated users can upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

-- Permitir que solo los usuarios autenticados puedan actualizar imágenes
CREATE POLICY "Authenticated users can update images" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

-- Permitir que solo los usuarios autenticados puedan eliminar imágenes
CREATE POLICY "Authenticated users can delete images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'products' 
  AND auth.role() = 'authenticated'
);

