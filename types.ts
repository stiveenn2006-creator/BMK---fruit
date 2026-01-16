
export type Category = 'Dates' | 'Nuts' | 'Dried Fruits' | 'Gift Boxes';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  weight: string;
  image: string;
  description: string;
  bestSeller?: boolean;
  rating?: number;
  numReviews?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
