import { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation, useMatches, useNavigate } from 'react-router-dom';
import { Menu, MenuProps } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';

import Scrollbar from '@/components/ScrollBar';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { NAV_COLLAPSED_WIDTH, NAV_WIDTH } from './config';
import { AppRouteObject } from '@/types/router';
import { filterMenu } from '@/utils/getModuleList.ts';

export interface ISiderNav {}

const moduleList = filterMenu() as AppRouteObject[];

const SiderNav: FC<ISiderNav> = () => {
	const matches = useMatches();
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [collapsed, setCollapsed] = useState(false);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>(['']);

	const useRouteToMenu = (items: AppRouteObject[]) => {
		return items
			.filter(item => !item.meta?.hideMenu)
			.map(item => {
				const menuItem: any = {};
				const { meta, children } = item;
				if (meta) {
					const { key, label, icon, disabled, suffix } = meta;
					menuItem.key = key;
					menuItem.disabled = disabled;
					menuItem.label = (
						<div
							className={`inline-flex w-full items-center ${
								collapsed ? 'justify-start' : 'justify-between'
							} `}>
							<div className=''>{label}</div>
							{suffix}
						</div>
					);
					if (icon) {
						menuItem.icon = icon;
					}
				}
				if (children) {
					menuItem.children = useRouteToMenu(children);
				}
				return menuItem as ItemType;
			});
	};

	const onOpenChange: MenuProps['onOpenChange'] = keys => {
		console.log('------>', keys);
		const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
		if (latestOpenKey) {
			setOpenKeys(keys);
		} else {
			setOpenKeys([]);
		}
	};

	useEffect(() => {
		const openKeys = matches
			.filter(item => item.pathname !== '/')
			.map(item => item.pathname);
		setOpenKeys(openKeys);
		setSelectedKeys([pathname]);
	}, [pathname, matches, collapsed]);

	return (
		<div
			className={
				'flex h-full flex-col border-r border-gray-200 border-dashed'
			}
			style={{ width: collapsed ? NAV_COLLAPSED_WIDTH : NAV_WIDTH }}>
			<div
				className={
					'relative flex h-20 items-center justify-center py-4'
				}>
				<NavLink to={'/'} replace>
					<div>LOGO</div>
					<div
						className={
							'absolute right-0 top-7 z-50 hidden h-6 w-6 translate-x-1/2 cursor-pointer select-none rounded-full text-center !text-gray md:block'
						}
						onClick={() => setCollapsed(!collapsed)}>
						{collapsed ? (
							<MenuUnfoldOutlined size={20} />
						) : (
							<MenuFoldOutlined size={20} />
						)}
					</div>
					<Scrollbar
						style={{
							height: 'calc(100vh - 70px)',
						}}>
						<Menu
							className='h-full !border-none'
							mode='inline'
							items={useRouteToMenu(moduleList)}
							defaultOpenKeys={openKeys}
							openKeys={openKeys}
							defaultSelectedKeys={selectedKeys}
							selectedKeys={selectedKeys}
							inlineCollapsed={collapsed}
							onOpenChange={onOpenChange}
							onClick={({ key }) => navigate(key)}
						/>
					</Scrollbar>
				</NavLink>
			</div>
		</div>
	);
};

export default SiderNav;
