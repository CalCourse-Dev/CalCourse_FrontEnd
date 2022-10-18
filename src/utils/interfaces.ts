export interface IAnalysisData {
  name: string;
  id: string;
  memorability: number;
  memory_rank: number;
  clarity: number;
  clarity_rank: number;
  emotion: number[];
  aois: IAOIs;
}

export interface IAOI {
  loc: number[];
  attention: number;
  memorability: number;
  name: string;
}

export interface IAOIs {
  [name: string]: IAOI;
}

export interface ProjectData {
  name: string;
  id: string;
  abtest: string[];
  analyses: string[];
  admin: string[];
}

export interface ImageObjectsData {
  uid: string;
  url: string;
  isSelected: boolean;
}

export interface UserData {
  id: string;
  credits: number;
  email: string;
  projects: string[];

  subscription_type: string;
  subscription_status: string;
  subscription_id: string;
  product_id: string;
  stripe_customer_id: string;
  trial_start_date: string;
  trial_remain: number;
}
