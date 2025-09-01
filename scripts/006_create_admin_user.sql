-- Crear un usuario administrador de ejemplo
-- NOTA: Esto es solo para desarrollo/testing. En producción, usa el registro normal.

-- Insertar usuario en auth.users (requiere permisos de servicio)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'perfil@tienda.com',
  crypt('admin123', gen_salt('bf')), -- Contraseña: admin123
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Crear perfil de administrador
INSERT INTO public.profiles (id, email, full_name, role)
SELECT 
  id,
  'perfil@tienda.com',
  'Administrador',
  'admin'
FROM auth.users 
WHERE email = 'perfil@tienda.com'
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  full_name = 'Administrador';
