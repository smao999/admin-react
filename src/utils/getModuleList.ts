import { AppRouteObject } from '@/types/router';

// 根据routers下的route文件动态生成所有路由
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
	return res;
};

// 数据库返回，暂时硬编码
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
	// 父元素的key无权限则整个子元素都无权限不进行判断
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
