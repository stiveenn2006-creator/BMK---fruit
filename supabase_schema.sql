
-- ==========================================
-- إعداد قاعدة بيانات متجر BMK FRUITS الفاخر
-- ==========================================

-- 1. تفعيل الإضافات
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. إنشاء جدول المنتجات
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Dates', 'Nuts', 'Dried Fruits', 'Gift Boxes')),
    price NUMERIC NOT NULL,
    weight TEXT NOT NULL,
    image TEXT NOT NULL, 
    description TEXT,
    "bestSeller" BOOLEAN DEFAULT false,
    stock_quantity INTEGER DEFAULT 100,
    rating NUMERIC DEFAULT 0,
    "numReviews" INTEGER DEFAULT 0
);

-- 3. تفعيل الأمان
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public Read Access" ON public.products;
CREATE POLICY "Public Read Access" ON public.products FOR SELECT USING (true);

-- 4. تنظيف البيانات
TRUNCATE TABLE public.products;

-- 5. إدخال البيانات بالصور الفاخرة الجديدة والتقييمات
INSERT INTO public.products (name, category, price, weight, image, description, "bestSeller", rating, "numReviews")
VALUES
(
    'تمر مجهول ملكي فاخر', 
    'Dates', 
    55.00, 
    '1 كجم', 
    'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&q=80&w=800', 
    'تمر مجهول من نخب أول، يتميز بحجمه الملكي ومذاقه العسلي الفريد، منتقى بعناية من واحات تافيلالت.', 
    true,
    4.9,
    128
),
(
    'لوز أطلس محمص ومملح', 
    'Nuts', 
    38.00, 
    '500 غرام', 
    'https://images.unsplash.com/photo-1550917411-d88926245f71?auto=format&fit=crop&q=80&w=800', 
    'لوز بلدي فاخر محمص بالطريقة التقليدية مع لمسة خفيفة من ملح البحر الطبيعي.', 
    true,
    4.7,
    85
),
(
    'تين مجفف (شريحة) بلدي', 
    'Dried Fruits', 
    28.00, 
    '400 غرام', 
    'https://images.unsplash.com/photo-1628102491629-7785c1d79343?auto=format&fit=crop&q=80&w=800', 
    'تين مغربي مجفف طبيعياً غني بالفيتامينات والمعادن، وجبة صحية مثالية لكل الأوقات.', 
    false,
    4.8,
    64
),
(
    'مجموعة هدايا BMK الملكية', 
    'Gift Boxes', 
    145.00, 
    '2 كجم', 
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=800', 
    'صندوق فاخر يجمع بين أفضل تمورنا ومكسراتنا الفاخرة، هدية تليق بمن تحب وتقدم في أبهى حلة.', 
    true,
    5.0,
    12
),
(
    'جوز (كركاع) بلدي فاخر', 
    'Nuts', 
    42.00, 
    '250 غرام', 
    'https://images.unsplash.com/photo-1589135061474-04d3e813f56e?auto=format&fit=crop&q=80&w=800', 
    'لب الجوز المغربي الفاخر، يتميز بلونه الفاتح وقوامه المقرمش وطعمه الغني بالزيوت الطبيعية.', 
    false,
    4.6,
    53
),
(
    'مشمش مجفف ممتاز', 
    'Dried Fruits', 
    32.00, 
    '500 غرام', 
    'https://images.unsplash.com/photo-1616527582220-22c7104be663?auto=format&fit=crop&q=80&w=800', 
    'مشمش ذهبي منتقى من أفضل المزارع، مجفف بعناية للحفاظ على لونه ونكهته الطبيعية الحلوة.', 
    true,
    4.5,
    42
);
