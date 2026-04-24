import { Suspense } from "react";
import ContestCard, { type Contest } from "@/app/components/ContestCard";
import Pagination from "@/app/components/Pagination";
import { ContestGridSkeleton } from "@/app/components/CardSkeleton";

const ITEMS_PER_PAGE = 9;

interface ApiResponse {
  items: Contest[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

async function getContests(page: number): Promise<ApiResponse> {
  const res = await fetch(
    `${process.env.BASE_URL}/api/contests?page=${page}&size=${ITEMS_PER_PAGE}`);

  if (!res.ok) {
    console.error("Falha ao buscar concursos (Next API):", res.status);
    return { items: [], total: 0, page: 1, size: ITEMS_PER_PAGE, pages: 0 };
  }

  return res.json();
}

interface ContestListProps {
  page: number;
}

async function ContestList({ page }: ContestListProps) {
  const data = await getContests(page);
  const totalPages = Math.max(1, data.pages || Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
  const contests: Contest[] = data.items ?? [];

  if (contests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
        <svg
          className="w-16 h-16 text-gray-300"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p className="text-lg font-medium">Nenhum concurso encontrado</p>
        <p className="text-sm">Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        aria-label="Lista de concursos públicos"
      >
        {contests.map((contest, index) => (
          <li key={contest.link || index}>
            <ContestCard contest={contest} />
          </li>
        ))}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} />
    </>
  );
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Vagas Abertas
          </h1>
          <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
            Acompanhe os principais concursos públicos disponíveis e garanta a
            sua aprovação.
          </p>
        </header>

        {/* Contest grid with streaming */}
        <Suspense fallback={<ContestGridSkeleton />}>
          <ContestList page={page} />
        </Suspense>
      </div>
    </main>
  );
}