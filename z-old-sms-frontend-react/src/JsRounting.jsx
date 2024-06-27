
import { createBrowserRouter, RouterProvider, BrowserRouter as Router } from 'react-router-dom';
import MainPage from './componets/main/MainComp';
import GalleryPage from './componets/gallery/GalPageComp';
import UploadPage from './componets/upload/UploadPageComp';
import ImagePage from './componets/images/ImagePageComp';

import Nav from './componets/nav/TreeNaveComp';

const router  = createBrowserRouter([
	{ path: "/", element: <MainPage />, errorElement: <div><h1>404 Page Not Found</h1></div> },
	{ path: "/gallery", element: <GalleryPage />},
	{ path: "/images", element: <ImagePage />},
	{ path: "/upload", element: <UploadPage />}
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

