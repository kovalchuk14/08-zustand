import {
  QueryClient,
} from "@tanstack/react-query";
import { FetchHttpResponse, fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";


type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props){
  const { slug } = await params;
  const category = slug[0];
  return {
    title: `notes: ${category}`,
    description: `notes with category: ${category}`,
    openGraph: {
      title: `notes: ${category}`,
      description: `notes with category: ${category}`,
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
