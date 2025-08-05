"use client"

import css from "./Create.Note.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import { useRouter } from "next/navigation";

export default function ClientCreateNote() {

    const router = useRouter();
    const onClose = () => router.push('/notes/filter/All');

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm onClose={onClose} >      
                </NoteForm>
            </div>
        </main>
    );
}