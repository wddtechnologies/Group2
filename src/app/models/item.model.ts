export type ItemType = 'Lost' | 'Found';
export type ItemStatus = 'Pending' | 'Approved' | 'Resolved';

export type LostFoundItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  type: ItemType;
  status: ItemStatus;
  createdAt: string;
  location?: string;
  contactInfo?: string;
  imagePath?: string;
};

export type NewItemPayload = {
  title: string;
  description: string;
  category: string;
  type: ItemType;
  location?: string;
  contactInfo?: string;
  imageDataUrl?: string;
};
