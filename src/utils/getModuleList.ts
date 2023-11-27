// 根据routers下的route文件动态生成路由
import { AppRouteObject } from '@/types/router';

export const getModuleList = () => {
	const res: AppRouteObject[] = [];
	const modules = import.meta.glob('../routers/route/**/*.tsx', {
		eager: true,
	});
	Object.values(modules).forEach(val => {
		if ((val as any).default) {
			res.push((val as any).default);
		}
	});
	console.log('------>', res);
	return res;
};

const defaultAuthList = ['/'];

// 根据权限动态生成路由
export const filterMenu = (
	authList = defaultAuthList,
	allModuleList = getModuleList(),
) => {
	// 权限为 / 时，返回所有路由
	if (authList.length > 0 && authList[0] === '/') {
		return allModuleList;
	}
	return allModuleList
		.filter(
			item => authList.includes(item.meta?.key as string) || item.index,
		)
		.map(item => {
			if (item.children) {
				const filteredChildren = filterMenu(
					authList,
					item.children,
				) as AppRouteObject[];
				if (filteredChildren?.length) {
					return {
						...item,
						children: filteredChildren,
					};
				}
			} else {
				return item;
			}
		});
};
