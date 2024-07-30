export interface SheetOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface SheetParams {
  options: SheetOption[];
  title?: string;
}
