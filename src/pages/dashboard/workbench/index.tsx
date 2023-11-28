import { FC } from 'react';

export interface IWorkbench {}

const Workbench: FC<IWorkbench> = () => {
	return (
		<>
			<div className={'w-56 h-56 bg-cyan-400'}>页面</div>
		</>
	);
};

export default Workbench;
