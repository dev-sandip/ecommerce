export interface IUser {
  email: string;
  fname: string;
  isAdmin: boolean;
  lname: string;
  __v: number;
  _id: string;
}
export interface SessionResponse {
  user: IUser;
  message?: string;
}

export interface IFile {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
}

export interface IProduct {
  _id: string;
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