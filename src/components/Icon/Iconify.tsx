import { Icon } from '@iconify/react';
import styled from 'styled-components';

import type { IconProps } from '@iconify/react';

interface IProps extends IconProps {
	size: IconProps['width'];
}

const StyledIconify = styled.div`
	display: inline-block;
	vertical-align: middle;
	svg {
		display: inline-block;
	}
`;

export default function Iconify({
	icon,
	size = '1em',
	className = '',
	...other
}: IProps) {
	return (
		<StyledIconify className='anticon'>
			<Icon
				icon={icon}
				width={size}
				height={size}
				className={`m-auto ${className}`}
				{...other}
			/>
		</StyledIconify>
	);
}
