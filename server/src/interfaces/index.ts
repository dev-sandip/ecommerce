export interface IFile {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: IFile;
  images: IFile[];
}
