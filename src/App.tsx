import { useEffect, useState } from "react";
import AddCourse from "./components/AddCourse";
import { v4 as uuidv4 } from "uuid";
import Courses from "./components/Courses";
import SearchCourse from "./components/SearchCourse";
import React from "react";
import PostList from "./pages/PostList";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import { CornerDownLeft } from "lucide-react";
// Definindo a interface para os cursos
interface Course {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

interface CourseX {
  id: string;
  title: string;
  author: string;
}

function App() {
  // Lista de cursos com tipo definido
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  function onCourseClick(courseId: string) {
    const newCourses = courses.map((course) => {
      if (course.id === courseId) {
        return { ...course, isCompleted: !course.isCompleted };
      }
      return course;
    });
    setCourses(newCourses);
  }
  function onSeeDetailsClick(course) {
    const query = new URLSearchParams();
    query.set("title", course.title);
    query.set("description", course.content);
    query.set("author", course.author);
    navigate(`/course?${query.toString()}`);
  }
  function onAddCourseSubmit(
    title: string,
    description: string,
    author: string
  ) {
    const newCourse: Course = {
      id: uuidv4(),
      title,
      description,
      isCompleted: false,
    };
    setCourses([...courses, newCourse]);
  }

  const onSearchCourseClick = (coursex: CourseX) => {
    onSeeDetailsClick(coursex);
    console.log(coursex);
  };

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Cursos
        </h1>
        <SearchCourse onSearchCourseClick={onSearchCourseClick} />
        <div className=" bg-slate-500  justify-center ">
          <Link to="/PostList">
            <button className="navigate-button">Adicionar novos cursos</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
