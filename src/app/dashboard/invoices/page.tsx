import { Suspense } from 'react';
import { Metadata } from 'next';
import { InvoicesTableSkeleton } from '@/src/components/skeletons/skeletons';
import { CreateInvoice } from '@/src/components/invoices/buttons/buttons';
import { fetchInvoicesPages } from '@/src/app/lib/data';
import { lusitana } from '@/src/app/ui/fonts';
import Pagination from '@/src/components/pagination/pagination';
import Table from '@/src/components/invoices/invoices-table/invoices-table';
import Search from '@/src/components/search/search';

export const metadata: Metadata = {
  title: 'Invoices',
};
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string,
    page?: string,
  }>;
}): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}