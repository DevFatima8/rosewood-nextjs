"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import Link from "next/link";

type GalleryImage = { id: number; title: string; altText: string; imageUrl: string; createdAt: string };

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editing, setEditing] = useState<GalleryImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [preview, setPreview] = useState("");

  const loadImages = useCallback(async () => {
    setLoading(true);
    try { const res = await fetch("/api/gallery", { cache: "no-store" }); if (!res.ok) throw new Error(); setImages(await res.json()); }
    catch { setNotice("Gallery could not be loaded. Check the database connection."); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void loadImages(); }, [loadImages]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setSaving(true); setNotice("");
    const form = event.currentTarget;
    try {
      const res = await fetch(editing ? `/api/gallery/${editing.id}` : "/api/gallery", { method: editing ? "PUT" : "POST", body: new FormData(form) });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Request failed.");
      setNotice(editing ? "Image updated successfully." : "Image uploaded successfully.");
      setEditing(null); setPreview(""); form.reset(); await loadImages();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Something went wrong."); }
    finally { setSaving(false); }
  }

  async function remove(image: GalleryImage) {
    if (!window.confirm(`Delete “${image.title}”? This cannot be undone.`)) return;
    setNotice("");
    try { const res = await fetch(`/api/gallery/${image.id}`, { method: "DELETE" }); const result = await res.json(); if (!res.ok) throw new Error(result.error); setNotice("Image deleted."); if (editing?.id === image.id) setEditing(null); await loadImages(); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Delete failed."); }
  }

  function choosePreview(file?: File) { if (file) { if (preview.startsWith("blob:")) URL.revokeObjectURL(preview); setPreview(URL.createObjectURL(file)); } }

  return <main className="admin-shell">
    <header className="admin-header"><Link href="/"><img src="/logo.png" alt="rosewood Hotel" /></Link><div><Link href="/gallery" target="_blank">View public gallery ↗</Link><span>Gallery administration</span></div></header>
    <section className="admin-title"><div><span>rosewood CONTENT MANAGER</span><h1>Gallery <em>studio.</em></h1><p>Upload, edit and curate every image shown on the public gallery.</p></div><div className="image-count"><b>{images.length}</b><span>Images live</span></div></section>
    <section className="admin-layout">
      <form className="admin-form" onSubmit={submit} key={editing?.id ?? "new"}>
        <div className="form-heading"><div><span>{editing ? "EDIT IMAGE" : "NEW IMAGE"}</span><h2>{editing ? "Update photograph" : "Add to gallery"}</h2></div>{editing && <button type="button" className="text-button" onClick={() => { setEditing(null); setPreview(""); }}>Cancel</button>}</div>
        <label className="upload-zone">
          {(preview || editing?.imageUrl) ? <img src={preview || editing?.imageUrl} alt="Upload preview" /> : <div><b>＋</b><strong>Choose an image</strong><small>JPG, PNG, WEBP or GIF · Maximum 8 MB · Cloudinary storage</small></div>}
          <input type="file" name="image" accept="image/jpeg,image/png,image/webp,image/gif" required={!editing} onChange={e => choosePreview(e.target.files?.[0])} />
          {(preview || editing?.imageUrl) && <span>Click to replace</span>}
        </label>
        <label>Display title<input name="title" required maxLength={120} defaultValue={editing?.title} placeholder="e.g. Deluxe King Room" /></label>
        <label>Image description <small>(for accessibility)</small><input name="altText" maxLength={180} defaultValue={editing?.altText} placeholder="Describe what is visible in the image" /></label>
        <button className="admin-submit" disabled={saving}>{saving ? "Saving..." : editing ? "Save changes" : "Upload image"}<span>→</span></button>
        {notice && <p className="admin-notice">{notice}</p>}
      </form>

      <div className="admin-library"><div className="library-head"><div><span>MEDIA LIBRARY</span><h2>Published images</h2></div><button onClick={() => void loadImages()}>Refresh ↻</button></div>
        {loading ? <p className="admin-empty">Loading gallery...</p> : images.length === 0 ? <p className="admin-empty">No images yet. Upload the first photograph.</p> : <div className="admin-image-grid">{images.map(image => <article key={image.id}><img src={image.imageUrl} alt={image.altText} /><div><h3>{image.title}</h3><p>{image.altText}</p><span>{new Date(image.createdAt).toLocaleDateString()}</span></div><nav><button onClick={() => { setEditing(image); setPreview(""); window.scrollTo({ top: 100, behavior: "smooth" }); }}>Edit</button><button className="delete" onClick={() => void remove(image)}>Delete</button></nav></article>)}</div>}
      </div>
    </section>
  </main>;
}
