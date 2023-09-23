import { createBrowserRouter } from "react-router-dom";
import Studentlist from "./Components/studentList";
import AddStudents from "./Components/addStudents";
import App from "./App";

const router = createBrowserRouter([
    { path: '', element: <App/> },
    { path: 'list', element: <Studentlist/> },
    { path: 'add', element: <AddStudents/> },
]);

export default router;