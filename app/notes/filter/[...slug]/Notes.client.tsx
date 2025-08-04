"use client";
import css from "./notes.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";

interface NotesClientProps {
  initData: FetchHttpResponse | undefined,
  initialSearch: string,
  initialPage: number,
  tag: string|undefined,
}


export default function NotesClient({initData, initialSearch,initialPage,tag}:NotesClientProps) {
    const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = useDebouncedCallback(
    (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },
    1000
  );

  const { data } = useQuery({
    queryKey: ["notes",searchQuery, tag, currentPage],
    queryFn: () => fetchNotes(searchQuery, tag, currentPage),
    placeholderData: keepPreviousData,
    initialData: initData
  });


  function modalClose() {
    setIsModalOpen(false);
  }
  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox handleChange={handleChange} value={searchQuery} />}
        {data && data?.totalPages > 1 &&
          <Pagination totalPages={ data.totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {<button className={css.button} onClick={()=>setIsModalOpen(true)}>Create note +</button>}
      </header>
      {(data && data?.notes.length > 0) ? (<NoteList notes={data.notes}/>) : (<p>No notes, try again later</p>)}
      {isModalOpen && <Modal onClose={modalClose}>
        <NoteForm onClose={modalClose} queryKey={["notes",searchQuery,tag, currentPage]}/>
      </Modal>
      }
    </div>
  );
}