import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

interface Course {
  id: string;
  title: string;
  author: string;
}
interface SearchCourseProps {
  onSearchCourseClick: (course: Course) => void;
}

const SearchCourse: React.FC<SearchCourseProps> = ({ onSearchCourseClick }) => {
  const [searchCourse, setSearchCourse] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (searchCourse.length === 0) {
      setFilteredCourses([]);
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3000/courses"
        );
        const filtered = response.data.filter((course) => {
          // Verifique se title e author são definidos e se são strings
          const title =
            course.title && typeof course.title === "string"
              ? course.title.toLowerCase()
              : "";
          const author =
            course.author && typeof course.author === "string"
              ? course.author.toLowerCase()
              : "";

          return (
            title.includes(searchCourse.toLowerCase()) ||
            author.includes(searchCourse.toLowerCase())
          );
        });
        setFilteredCourses(filtered);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, [searchCourse]);

  return (
    <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
      <input
        className="border border-slate-300 outline-slate-400 px-4 py-2 rounded-md"
        type="search"
        id="searchbar"
        placeholder="Pesquisar por título ou autor"
        value={searchCourse}
        onChange={(e) => setSearchCourse(e.target.value)}
      />

      {searchCourse && filteredCourses.length > 0 && (
        <ul className="mt-2 space-y-2">
          {filteredCourses.map((course) => (
            <li
              key={course.id}
              className="cursor-pointer px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:shadow-md transition duration-200 ease-in-out"
              onClick={() => onSearchCourseClick(course)}
            >
              <span className="text-lg font-semibold text-gray-800">
                {course.title}
              </span>
              <span className="text-sm text-gray-600 ml-2">
                by {course.author}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCourse;
