export type ReportType = 'Lost' | 'Found';

export interface Report {
  id: number;
  title: string;
  description: string;
  type: ReportType;
  status?: string;
  location: string;
  created_at: string;
  image_path?: string | null;
  category_name?: string | null;
}
