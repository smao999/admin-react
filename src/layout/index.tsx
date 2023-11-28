import { FC, Suspense } from 'react';
import SiderNav from '@/layout/SiderNav.tsx';
import { CircleLoading } from '@/components/Loading/CircleLoading.tsx';
import { Outlet } from 'react-router-dom';

export interface IPageLayout {}

const PageLayout: FC<IPageLayout> = () => {
	return (
		<div
			className='flex h-screen overflow-hidden'
			style={{
				transition:
					'color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
			}}>
			<Suspense fallback={<CircleLoading />}>
				<div className='z-50 hidden h-full flex-shrink-0 md:block'>
					<SiderNav />
				</div>
				<Outlet />
			</Suspense>
		</div>
	);
};

export default PageLayout;
