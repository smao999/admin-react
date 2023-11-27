import {
	createBrowserRouter,
	RouteObject,
	RouterProvider,
} from 'react-router-dom';
import routes from './routers/index.tsx';

function App() {
	const route = createBrowserRouter(routes as RouteObject[]);

	return (
		<>
			<RouterProvider router={route} />
		</>
	);
}

export default App;
