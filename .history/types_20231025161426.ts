
export interface BillboardBlog {
    id: string;
    label: string;
    imageUrl: string;
  };
  
  export interface CategoryBlog {
    id: string;
    name: string;
    billboard: BillboardBlog;
  };

  export interface SubCategoryBlog {
    id: string;
    name: string;
    billboard: BillboardBlog;
    categoryBlog:CategoryBlog;
  };


  export interface Blogarticle {
    id: string;
    category?: CategoryBlog;
    title: string;
    description?: string;
    imageUrl?: string;
    price?:Float32Array;
    isFeatured: boolean;
    
  };