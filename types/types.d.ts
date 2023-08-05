import { Category, Image, Color } from "@prisma/client";

declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    NEXT_AUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
  }
}

export type CategoryColumnProps = {
  id: string;
  name: string;
  createdAt: string;
};

export type ColorColumnProps = {
  id: string;
  colorName: string;
  colorValue: string;
  createdAt: string;
};

export type ProductColumnProps = {
  id: string;
  name: string;
  price: string;
  category: string;
  color?: string;
  colorValue?: string;
  createdAt: string;
  isArchived: boolean;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  color: Color;
  images: Image[];
};

export type OrderColumnProps = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  products: string;
  totalPrice: string;
  createdAt: string;
};
