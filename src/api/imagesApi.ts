export async function uploadImage(file: File): Promise<number> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Image upload failed");
  }

  const data = await res.json();
  return data.id;
}
