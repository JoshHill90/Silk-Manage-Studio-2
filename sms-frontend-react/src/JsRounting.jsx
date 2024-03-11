
import { createBrowserRouter, RouterProvider, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './componets/main/MainComp';
import GalleryPage from './componets/gallery/GalPageComp';

import Nav from './componets/nav/TreeNaveComp';

const router  = createBrowserRouter([
	{ path: "/", element: <MainPage />, errorElement: <div><h1>404 Page Not Found</h1></div> },
	{ path: "/gallery", element: <GalleryPage />}
])

function JSRounting (){
	const navigateTo = (path) => {
		router.navigate(path);
	};
	return(
		<>
			<Router>
				<Nav navigateTo={navigateTo} />
			</Router>
			<RouterProvider router={router} > </RouterProvider>
		</>
	)
}

export default JSRounting

