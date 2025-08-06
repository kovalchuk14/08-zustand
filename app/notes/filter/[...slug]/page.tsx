import {
  QueryClient,
} from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";


type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata>{
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `Notes in ${category} | Notes App`,
    description: `Browse and manage your notes in the "${category}" category. Stay organized and keep everything at hand`,
    openGraph: {
      title: `Notes in ${category} | Notes App`,
      description: `Discover and manage your personal notes categorized under "${category}". Access them anytime, anywhere.`,
      url: `https://08-zustand-mu-seven.vercel.app/notes/filter/${category}`,
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
}

async function App({ params}: Props) {
  const { slug } = await params;
  const category = slug[0] === 'All' ? undefined : slug[0];
  const searchQuery = "";
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery,category, currentPage ],
    queryFn: () => fetchNotes(searchQuery, category, currentPage),
  });
  const initData = queryClient.getQueryData<FetchHttpResponse>(["notes", searchQuery,category, currentPage]);
  return (
    <NotesClient initData={ initData} initialPage={currentPage} initialSearch={ searchQuery} tag={category} />
  );
}

export default App
