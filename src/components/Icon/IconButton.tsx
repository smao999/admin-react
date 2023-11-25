import { CSSProperties, FC, ReactNode } from 'react';
import { ButtonProps } from 'antd';

export interface IConButton extends ButtonProps {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

const ConButton: FC<IConButton> = ({ children, className, style, onClick }) => {
	return (
		<button
			style={style}
			className={`flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-hover ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default ConButton;
