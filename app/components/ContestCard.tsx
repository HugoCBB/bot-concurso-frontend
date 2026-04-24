import Link from "next/link";

export type Contest = {
  orgao: string;
  info: string;
  cargo: string;
  nivel: string;
  data_limite: string;
  link: string;
};

function StateBadge({ escopo }: { escopo: string }) {
  const isNacional = escopo.toLowerCase().includes("nacional");
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
        ${
          isNacional
            ? "bg-violet-100 text-violet-700"
            : "bg-blue-100 text-blue-700"
        }`}
    >
      <svg
        className="w-3 h-3"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      {escopo}
    </span>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 text-sm text-gray-600">
      <span className="mt-0.5 shrink-0 text-gray-400">{icon}</span>
      <div>
        <p className="text-xs font-semibold text-gray-500 leading-none mb-0.5">
          {label}
        </p>
        <p className="text-gray-700 leading-snug">{value}</p>
      </div>
    </div>
  );
}

const BriefcaseIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
);

const GraduationIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-3.5 h-3.5 inline-block ml-1.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function ContestCard({ contest }: { contest: Contest }) {
  const infoParts = contest.info?.split(" - ") || [];
  const escopo = infoParts.length > 1 ? infoParts[0] : "Local";
  const vagasSalario = infoParts.length > 1 ? infoParts.slice(1).join(" - ") : (contest.info || "Não informado");

  return (
    <article className="relative flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />

      <div className="flex flex-col gap-4 p-5 flex-1">
        {/* badge */}
        <StateBadge escopo={escopo} />

        {/* title */}
        <h2 className="text-base font-bold text-gray-900 leading-snug line-clamp-3">
          {contest.orgao}
        </h2>

        {/* info rows */}
        <div className="flex flex-col gap-3">
          <InfoRow icon={<BriefcaseIcon />} label="Cargo" value={contest.cargo} />
          <InfoRow icon={<GraduationIcon />} label="Nível" value={contest.nivel} />
          <InfoRow
            icon={<CalendarIcon />}
            label="Vagas e Salário"
            value={vagasSalario}
          />
        </div>

        {/* deadline */}
        <p className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 shrink-0" />
          Até: {contest.data_limite}
        </p>
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <Link
          href={contest.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          aria-label={`Ver edital de ${contest.orgao}`}
        >
          Ver Edital
          <ExternalLinkIcon />
        </Link>
      </div>
    </article>
  );
}
