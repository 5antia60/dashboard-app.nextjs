import { Suspense } from 'react';
import { lusitana } from '@/src/app/ui/fonts';
import { CardsSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from '@/src/components/skeletons/skeletons';
import LatestInvoices from '@/src/components/dashboard/latest-invoices/latest-invoices';
import RevenueChart from '@/src/components/dashboard/revenue-chart/revenue-chart';
import CardWrapper from '@/src/components/dashboard/card-wrapper/card-wrapper';

export default async function DashboardPage() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`} data-testid="dashboard-title">
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}