import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vagas Abertas | Concursos Online",
  description:
    "Acompanhe os principais concursos públicos disponíveis e garanta a sua aprovação.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
