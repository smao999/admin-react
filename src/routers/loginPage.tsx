import { lazy } from 'react';
import { AppRouteObject } from '@/types/router';

const LoginPage = lazy(() => import('@/pages/system/login.tsx'));

const loginElements: AppRouteObject = {
	path: 'login',
	element: <LoginPage />,
};

export default loginElements;
