import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import NotFoundPage from "./pages/error/NotFound";
import MainPage from "./pages/index";
import UploadPage from "./pages/upload/page";
import UploadedFiles from "./pages/uploaded-files/page";
import { uploadedFilesData } from "./stores";

export const PAGES = {
  main: "/",
  upload: "/upload",
  uploadedFiles: "/uploaded-files",
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: PAGES.main,
        element: <MainPage />,
      },
      {
        path: PAGES.upload,
        element: <UploadPage />,
      },
      {
        path: PAGES.uploadedFiles,
        element: <UploadedFiles {...uploadedFilesData} />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
