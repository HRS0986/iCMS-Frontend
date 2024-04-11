
export interface TabItem {
  title: string;
  img: string;
}

export interface Content {
  title?: string;
  subtitle?: string;
}

export interface SettingContent{
  title: string;
  content: any;
}

export interface item {
  id?: string;
  keyword?: string;
  alerttype?: string;
  threshold?: string;
  min?: number;
  max?: number;
}