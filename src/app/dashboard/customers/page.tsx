import { Metadata } from 'next';
import { fetchCustomersPages, fetchFormattedCustomersTable } from '@/src/app/lib/data';
import CustomersTable from '@/src/components/customers/customers-table/customers-table';
import Pagination from '@/src/components/pagination/pagination';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function CustomersPage(
  props: {
    searchParams?: Promise<{
      query?: string,
      page?: string,
    }>;
  }
): Promise<React.ReactNode> {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="flex flex-col">
      <CustomersTable query={query} currentPage={currentPage} />

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}