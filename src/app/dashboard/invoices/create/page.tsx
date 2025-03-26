import { Metadata } from 'next';
import CreateForm from '@/src/components/invoices/create-form/create-form';
import Breadcrumbs from '@/src/components/invoices/breadcrumbs/breadcrumbs';
import { fetchCustomers } from '@/src/app/lib/data';
 
export const metadata: Metadata = {
  title: 'Create Invoices',
};

export default async function Page(): Promise<React.ReactNode> {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <CreateForm customers={customers} />
    </main>
  );
}