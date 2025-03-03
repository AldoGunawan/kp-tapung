"use client";

import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import styles from "./Contact.module.scss";

const ContactPage = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ success: false, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, message: "Semua field harus diisi!" });
      return;
    }

    if (!session?.user && !formData.email) {
      setStatus({ success: false, message: "Anda harus login untuk mengirim pesan!" });
      return;
    }

    setLoading(true);
    setStatus({ success: false, message: "Mengirim pesan..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Terjadi kesalahan.");
      }

      setStatus({ success: true, message: "Pesan berhasil dikirim!" });
      setFormData({ name: "", email: session?.user?.email || "", message: "" });
    } catch (error) {
      setStatus({ success: false, message: "" + error || "Gagal mengirim pesan." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <h1 className={styles.title}>Hubungi Kami</h1>
      <p className={styles.description}>
        Jika Anda memiliki pertanyaan, silakan isi formulir di bawah ini.
      </p>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Nama</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={!!session?.user}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message">Pesan</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>

        {status.message && (
          <p className={status.success ? styles.successMessage : styles.errorMessage}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPage;
