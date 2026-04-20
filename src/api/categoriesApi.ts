export interface CategoryDto {
  id: number;
  name: string;
}

export async function getCategories(): Promise<CategoryDto[]> {
  const res = await fetch("/api/categories");
  return res.json();
}
