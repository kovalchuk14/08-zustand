"use client";
import css from "./notes.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Link from "next/link";

interface NotesClientProps {
  initData: FetchHttpResponse | undefined,
  initialSearch: string,
  initialPage: number,
  tag: string|undefined,
}


export default function NotesClient({initData, initialSearch,initialPage,tag}:NotesClientProps) {
    const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);

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



  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox handleChange={handleChange} value={searchQuery} />}
        {data && data?.totalPages > 1 &&
          <Pagination totalPages={ data.totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} />}
        {<Link href = "/notes/action/create" className={css.button} >Create note +</Link>}
      </header>
      {(data && data?.notes.length > 0) ? (<NoteList notes={data.notes}/>) : (<p>No notes, try again later</p>)}
     
    </div>
  );
}