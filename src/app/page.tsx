import FilterPanel from '@/components/filters/FilterPanel';
import InquiryDetail from '@/components/kanban/InquiryModal';
import KanbanBoard from '@/components/kanban/KanbanBoard';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-400 px-8 py-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Kanban Board
            </h1>
            <p className="text-sm font-medium text-slate-500">
              Event Management System
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-400 px-4 pt-4">
        <FilterPanel />
      </div>

      <section className="mx-auto max-w-400 p-4">
        <KanbanBoard />
      </section>

      <InquiryDetail />
    </main>
  );
}
