
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// BMK Fruits Premium - Gateway Credentials
const supabaseUrl = 'https://imqsifnommxrgwvkoiqj.supabase.co';
const supabaseAnonKey = 'sb_publishable_QEB6SehOh6jsj4MAe37bIg_KCGtA9Yu';

// Initialize Supabase with global headers for the gateway
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    headers: { 'x-application-name': 'bmk-fruits-premium-v9' },
  }
});

/**
 * Validates connectivity specifically to the products table.
 * If 404 is returned or 'not found' is in the message, it flags a missing table.
 */
export const testSupabaseConnection = async () => {
  try {
    const { data, error, status } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (error) {
      const msg = error.message.toLowerCase();
      // Expanded detection for missing tables or empty schema caches
      const isMissingTable = 
        status === 404 || 
        msg.includes('schema cache') || 
        msg.includes('not found') ||
        msg.includes('does not exist');
      
      console.group('BMK Connection Diagnosis');
      console.log('Status Code:', status);
      console.log('Message:', error.message);
      console.log('Is Missing Table:', isMissingTable);
      console.groupEnd();

      return { 
        connected: false, 
        error: error.message,
        isMissingTable,
        hint: isMissingTable 
          ? 'Table "products" is missing. Use the SQL editor in Supabase to create it.' 
          : error.hint,
        status 
      };
    }
    return { connected: true, status };
  } catch (err: any) {
    return { connected: false, error: err.message || 'Critical system failure' };
  }
};

/**
 * Fetches products from the database with mapping.
 */
export const fetchProductsFromDb = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    
    return (data || []).map(product => ({
      ...product,
      image: product.image_url || product.image,
      name: product.name_ar || product.name,
      description: product.description_ar || product.description
    }));
  } catch (err: any) {
    throw new Error(err.message || 'Database access failed');
  }
};
