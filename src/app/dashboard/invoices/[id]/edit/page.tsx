import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchCustomers, fetchInvoiceById } from '@/src/app/lib/data';
import Breadcrumbs from '@/src/components/invoices/breadcrumbs/breadcrumbs';
import Form from '@/src/components/invoices/edit-form/edit-form';

export const metadata: Metadata = {
  title: 'Update Invoices',
};
 
export default async function Page(props: { params: Promise<{ id: string }> }): Promise<React.ReactNode> {
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}