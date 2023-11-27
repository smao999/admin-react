import { lazy, Suspense } from 'react';
import { AppRouteObject } from '@/types/router';
import { CircleLoading } from '@/components/Loading';
import { Outlet } from 'react-router-dom';

const Page404 = lazy(() => import('@/pages/system/404.tsx'));

const errorElements: AppRouteObject = {
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	children: [{ path: '404', element: <Page404 /> }],
};

export default errorElements;
