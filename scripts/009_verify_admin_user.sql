-- Verificar y corregir el rol del usuario administrador
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Primero, verificar qué usuarios existen y sus roles
SELECT 
  id,
  email,
  full_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- Verificar el usuario actual (ejecutar esto mientras estés logueado)
SELECT 
  auth.uid() as current_user_id,
  p.email,
  p.full_name,
  p.role
FROM public.profiles p
WHERE p.id = auth.uid();

-- Si el usuario actual no tiene rol de admin, actualizarlo
-- Reemplaza 'tu-email@ejemplo.com' con tu email real
UPDATE public.profiles 
SET role = 'admin'
WHERE email = 'tu-email@ejemplo.com';

-- O si prefieres usar el ID del usuario:
-- UPDATE public.profiles 
-- SET role = 'admin'
-- WHERE id = 'tu-user-id-aqui';

-- Verificar que el cambio se aplicó
SELECT 
  id,
  email,
  full_name,
  role,
  updated_at
FROM public.profiles
WHERE role = 'admin';
