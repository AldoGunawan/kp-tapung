"use client";

import "./Create.css";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      setError("Semua field harus diisi, termasuk gambar.");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageUrl", imageUrl);

    const res = await fetch("/api/post", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/event");
    } else {
      const errorData = await res.json();
      setError(`Gagal menambahkan event: ${errorData.message}`);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="textarea"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="file-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
