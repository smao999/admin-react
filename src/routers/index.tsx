import { Navigate } from 'react-router-dom';

import { filterMenu } from '@/utils/getModuleList.ts';
import loginElements from '@/routers/loginPage.tsx';
import errorElements from '@/routers/errorPage.tsx';
import { AppRouteObject } from '@/types/router';
// import { CircleLoading } from '@/components/Loading';
import PageLayout from '@/layout';

const moduleList = filterMenu() as AppRouteObject[];

const otherRoutes: AppRouteObject = {
	path: '/',
	element: <PageLayout />,
	children: [
		{
			index: true,
			element: <Navigate to={'dashboard'} replace />,
		},
		...moduleList,
	],
};

const routes = [
	otherRoutes,
	loginElements,
	errorElements,
	{ path: '*', element: <Navigate to='/404' replace /> },
];

export default routes;
