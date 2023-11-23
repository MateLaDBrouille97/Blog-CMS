
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
    isPublished: Boolean;
    subcategory: SubCategoryBlog;
    author?: Author;
    chapters: Chapter[];
    attachments: Attachment[];
    
  };

  export interface Attachment{
    id:string;
    name:string;
    url:string;
  }

  export  interface Chapter{
    id:string;
    title:string;
    descriptin?:string;
    videoUrl?:string;
    imageUrl?:string;
    position: string;
    isPublished: boolean;
    isFree: boolean;
    href: string;
    muxData?: MuxData;
  }

  export interface MuxData{
id:string;
assetId:string;
playbackId:string;
  }