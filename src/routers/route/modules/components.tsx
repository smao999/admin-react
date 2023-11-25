import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Iconify } from '@/components/Icon';
import { CircleLoading } from '@/components/Loading';
import type { AppRouteObject } from '@/types/router';

const Animate = lazy(() => import('@/pages/components/animate'));
const Chart = lazy(() => import('@/pages/components/chart'));

const components: AppRouteObject = {
	order: 3,
	path: 'components',
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: 'sys.menu.components',
		icon: (
			<Iconify
				icon='solar:widget-5-bold-duotone'
				className='ant-menu-item-icon'
				size='24'
			/>
		),
		key: '/components',
	},
	children: [
		{
			index: true,
			element: <Navigate to='icon' replace />,
		},
		{
			path: 'animate',
			element: <Animate />,
			meta: { label: 'sys.menu.animate', key: '/components/animate' },
		},
		{
			path: 'chart',
			element: <Chart />,
			meta: { label: 'sys.menu.chart', key: '/components/chart' },
		},
	],
};

export default components;
