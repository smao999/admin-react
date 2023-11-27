import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import type { AppRouteObject } from '@/types/router';
import { CircleLoading } from '@/components/Loading';
import { SvgIcon } from '@/components/Icon';

const Analysis = lazy(() => import('@/pages/dashboard/analysis'));
const Workbench = lazy(() => import('@/pages/dashboard/workbench'));

const components: AppRouteObject = {
	order: 1,
	path: 'dashboard',
	element: (
		<Suspense fallback={<CircleLoading />}>
			<Outlet />
		</Suspense>
	),
	meta: {
		label: 'sys.menu.dashboard',
		key: '/dashboard',
		icon: (
			<SvgIcon
				icon='ic-analysis'
				className='ant-menu-item-icon'
				size='24'
			/>
		),
	},
	children: [
		{
			index: true,
			element: <Navigate to='/dashboard/workbench' replace />,
		},
		{
			path: 'analysis',
			element: <Analysis />,
			meta: {
				label: 'sys.menu.analysis',
				key: '/dashboard/analysis',
			},
		},
		{
			path: 'workbench',
			element: <Workbench />,
			meta: {
				label: 'sys.menu.workbench',
				key: '/dashboard/workbench',
			},
		},
	],
};

export default components;
