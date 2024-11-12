import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Courses({ courses, onCourseClick }) {
  const navigate = useNavigate();

  function onSeeDetailsClick(course) {
    const query = new URLSearchParams();
    query.set("title", course.title);
    query.set("description", course.description);
    query.set("instructorName", course.instructorName);
    navigate(`/course?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {courses.map((course) => (
        <li key={course.id} className="flex gap-2">
          <button
            onClick={() => onCourseClick(course.id)}
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md ${
              course.isCompleted && "line-through"
            }`}
          >
            {course.title}
          </button>
          <button
            onClick={() => onSeeDetailsClick(course)}
            className="bg-slate-400 p-2 rounded-md text-white"
          >
            <ChevronRightIcon />
          </button>

          <button
            onClick={() => onDeleteCourseClick(course.id)}
            className="bg-slate-400 p-2 rounded-md text-white"
          >
            <TrashIcon />
          </button>
        </li>
      ))}
    </ul>
  );
}
export default Courses;
