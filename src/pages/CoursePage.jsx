import { useNavigate, useSearchParams } from "react-router-dom";
import { ChevronsLeftIcon } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

function CoursePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Pega o título, descrição, instrutor e ID do curso dos query params
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const instructorName = searchParams.get("author");
  const courseId = searchParams.get("id"); // ID do curso dinâmico

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmitPerson = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      return alert("Por favor, preencha o nome e o sobrenome.");
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/Person?name=" + firstName
      );
      const person = response.data[0];

      if (person) {
        // Atualiza o curso da pessoa existente
        const updatedCourses = person.courses
          ? [...person.courses, { id: courseId }]
          : [{ id: courseId }];

        await axios.patch(`http://localhost:3000/Person/${person.id}`, {
          courses: updatedCourses,
        });
        alert("Curso atualizado com sucesso para a pessoa existente!");
      } else {
        // Cria um novo registro de pessoa com o curso
        await axios.post("http://localhost:3000/Person", {
          name: firstName,
          courses: [{ id: courseId }],
        });
        alert("Nova pessoa cadastrada com sucesso!");
      }

      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error("Erro ao processar o cadastro", error);
      alert("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-500 p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6 text-slate-100">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0"
          >
            <ChevronsLeftIcon />
          </button>

          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes do Curso
          </h1>
        </div>

        <div className="bg-slate-200 p-4 rounded-md">
          <h2 className="text-xl font-bold text-slate-600">{title}</h2>
          <p className="text-slate-600">{description}</p>
          <p className="text-slate-600">{instructorName}</p>
        </div>

        <div className="space-y-4 p-6 bg-slate-200 rounded-md shadow flex flex-col">
          <input
            type="text"
            placeholder="Digite o seu Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Digite o seu Sobrenome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded-md"
          />

          <button
            onClick={handleSubmitPerson}
            className="bg-slate-500 text-white px-4 py-2 rounded-md font-medium"
          >
            Inscrever-se no Curso
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
