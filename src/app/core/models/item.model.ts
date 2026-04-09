export type ItemStatus = 'Pending' | 'Approved' | 'Resolved';

export type ItemType = 'Lost' | 'Found';

export interface LostFoundItem {
  id: number;
  title: string;
  description: string;
  category: string;
  type: ItemType;
  status: ItemStatus;
  location?: string | null;
  contact_info?: string | null;
  image_url?: string | null;
  created_at?: string;
}

export interface NewItemPayload {
  title: string;
  description: string;
  category: string;
  type: ItemType;
  location?: string;
  contactInfo?: string;
  imageDataUrl?: string;
}
