import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  image_path: string;
  cooking_time?: number;
  servings?: number;
  difficulty?: 'mudah' | 'sedang' | 'sulit';
  created_at: string;
  user: {
    id?: number;
    name: string;
    profile_photo_path: string | null;
  };
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
  ingredients?: {
    id: number;
    quantity: number;
    unit: string;
    notes?: string;
    ingredient: {
      id: number;
      name: string;
    };
  }[];
  steps?: {
    id: number;
    order: number;
    description: string;
    image_path: string | null;
  }[];
  _count?: {
    likes: number;
    comments?: number;
  };
  is_liked?: boolean;
  is_bookmarked?: boolean;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  created_at: string;
  user: {
    name: string;
    profile_photo_path: string | null;
  };
}
