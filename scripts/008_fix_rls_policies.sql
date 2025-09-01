-- Corregir políticas de Row Level Security para la tabla products
-- Este script debe ejecutarse en el SQL Editor de Supabase

-- Primero, eliminar las políticas existentes que pueden estar causando conflictos
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Crear políticas más específicas y claras

-- Política para que cualquiera pueda ver productos activos
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = true);

-- Política para que los admins puedan ver todos los productos (activos e inactivos)
CREATE POLICY "Admins can view all products" ON public.products
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Política para que los admins puedan crear productos
CREATE POLICY "Admins can insert products" ON public.products
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Política para que los admins puedan actualizar productos
CREATE POLICY "Admins can update products" ON public.products
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Política para que los admins puedan eliminar productos
CREATE POLICY "Admins can delete products" ON public.products
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Verificar que el usuario actual tenga el rol de admin
-- Puedes ejecutar esta consulta para verificar tu rol:
-- SELECT role FROM public.profiles WHERE id = auth.uid();
