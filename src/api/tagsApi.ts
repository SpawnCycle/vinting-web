import type { Tag } from "@/types/Product/Tag";

export async function getTags(): Promise<Tag[]> {
  const res = await fetch("/api/tags", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}

export async function createTag(name: string): Promise<Tag> {
  const res = await fetch("/api/tags", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    if (res.status === 409) {
      throw new Error("Tag already exists");
    }

    throw new Error("Failed to create tag");
  }

  return res.json();
}
