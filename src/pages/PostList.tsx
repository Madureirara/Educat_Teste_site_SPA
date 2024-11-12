import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id?: number;
  title: string;
  content: string;
  author: string;
}

const PostList: React.FC = () => {
  const [courses, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState<Post>({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "http://localhost:3000/courses"
        );
        setPosts(response.data);
      } catch (err) {
        setError("Erro ao carregar courses");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Post>(
        "http://localhost:3000/courses",
        newPost
      );
      setPosts([...courses, response.data]);
      setNewPost({ title: "", content: "", author: "" });
    } catch (err) {
      setError("Erro ao adicionar post");
    }
  };

  const deleteCourse = async (id?: Number) => {
    try {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      setPosts(courses.filter((p) => p.id !== id));
    } catch (error) {
      console.log("Erro ao excluir curso", error);
    }
  };
  return (
    <div className="post-list">
      <h1>Cursos</h1>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={newPost.title}
          onChange={handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Descrição"
          value={newPost.content}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={newPost.author}
          onChange={handleInputChange}
        />
        <button type="submit">Adicionar Cursos</button>
      </form>

      {loading ? <p>Carregando...</p> : null}
      {error ? <p>{error}</p> : null}

      <ul className="post-items">
        {courses.map((post) => (
          <li key={post.id} className="post-item">
            <h2>Nome do curso: {post.title}</h2>
            {<p>Descrição do curso: {post.content}</p>}
            {<p>Ator do curso: {post.author}</p>}
            <button onClick={async () => await deleteCourse(post?.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
