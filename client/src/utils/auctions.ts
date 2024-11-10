import axios from "redaxios";
import { produce } from "immer";

type PickAsRequired<TValue, TKey extends keyof TValue> = Omit<TValue, TKey> &
  Required<Pick<TValue, TKey>>;

/* Types */
export interface Auction {
  id: string;
  title: string;
  user_id: number;
  start_time: Date;
  end_time: Date;
  description: string;
  category: Category[];
}

export interface Bid {
  auction_id: string;
  user_id: string;
  amount: number;
  id: string;
  timestamp: Date;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

// let invoices: Array<Invoice> = null!;
// let users: Array<User> = null!;

// let invoicesPromise: Promise<void> | undefined = undefined;
// let usersPromise: Promise<void> | undefined = undefined;
