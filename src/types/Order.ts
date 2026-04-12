export type OrderGetDto = {
  id: number;
  created_at: string;
  modified_at: string;
  user_id: number;
  ammount: number;
  arrived_at: string | null;
  product: {
    id: number;
    created_at: string;
    modified_at: string;
    name: string;
    description: string;
    price: number;
    size: string;
    brand: string | null;
    condition: "New" | "Like new" | "Used" | "Heavily used";
    sex: "Male" | "Female" | "Unisex";
    available_stock: number;
    has_stock: boolean;
    user: {
      id: number;
      created_at: string;
      modified_at: string;
      name: string;
      email: string;
    };
    categories: {
      id: number;
      created_at: string;
      modified_at: string;
      name: string;
    }[];
    tags: {
      id: number;
      created_at: string;
      modified_at: string;
      name: string;
    }[];
    images: {
      created_at: string;
      id: number;
      modified_at: string;
      url: string;
      user_id: number;
    }[];
  };
};
