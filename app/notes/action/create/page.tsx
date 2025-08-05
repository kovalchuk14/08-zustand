import { Metadata } from "next";
import ClientCreateNote from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create Note",
  description: "page with form for new note",
  openGraph: {
    title: "Create Note",
  description: "page with form for new note",
    url: "?",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Notes picture"
      },
    ]
  }
};

export default function CreateNote() {

    return (
        <ClientCreateNote>
            
        </ClientCreateNote>
    )
}
