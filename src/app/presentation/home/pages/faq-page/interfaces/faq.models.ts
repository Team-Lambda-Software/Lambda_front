export interface ItemFAQ {
  category: string;
  items: Item[]
}

export type Item = {
  label: string,
  content: string,
  expanded: boolean
}