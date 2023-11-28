import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface IGlobalStore {
	role: { num: number; big: number };
	name: string;
	setRole: () => void;
}

const store = create<IGlobalStore>()(
	immer(set => ({
		role: {
			num: 0,
			big: 4,
		},
		name: 'b',
		setRole: () =>
			set(state => {
				state.role.num++;
			}),
	})),
);

export default store;
