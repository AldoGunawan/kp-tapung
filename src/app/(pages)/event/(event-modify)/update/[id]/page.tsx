"use client"

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import styles from './Update.module.css';

/* eslint-disable @typescript-eslint/no-explicit-any */

const Page = ({
  params,
}: {
 params: Promise<{ id: string }>;
}) => {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [error, setError] = React.useState('')
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        if (!title || !content) {
            setError("Semua field harus diisi.");
            return;
        }

        setError('');

        await fetch('/api/post',{
        method: "PUT",
        headers: {
            'Content-Type': "application/json",
          },
          body: JSON.stringify({
            title, content, id: (await params).id
        })
    }).then((res) => {
        console.log(res)
    }).catch((e)  => {
        console.log(e)
    }) 

        router.push('/event');
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch('/api/post/' + (await params).id)
        const json = await res.json()

        if(!json){
        router.push('/404')
        return;
        }
        setTitle(json.post.title)
        setContent(json.post.content)
    }

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>Update Event</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Masukkan Judul"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Masukkan Konten"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          />
          <button type='submit' className={styles.submitButton}>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Page;