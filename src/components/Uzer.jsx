import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Uzer = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');

        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();
        const todosData = await todosResponse.json();
        const albumsData = await albumsResponse.json();

        setUsers(usersData);
        setPosts(postsData);
        setTodos(todosData);
        setAlbums(albumsData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div class="loader"></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="heromain w-full">
        <div className="mt-50 mb-50 rounded-2xl h-200 bg-slate-700 w-full flex justify-center items-center gap-6 text-65 text-green-500">
          <h1>USERS</h1>
          <i className="bx bxs-user-circle"></i>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          {users.slice(0, Math.ceil(users.length * 0.7)).map(user => (
            <div key={user.id} className="card__1 bg-slate-700 text-lime-500 mb-10 rounded-2xl p-7 flex flex-col justify-between gap-5 text-25">
              <div className="border-b-4 border-indigo-500 flex items-center justify-between pb-3">
                <i className="text-lime-500 bx bxs-user-circle text-45"></i>
                <div className="relative">
                  {/* <button><i className="bx bx-cog"></i></button> */}
                  {/* <div className="hidden">
                    <button className="bg-slate-600 rounded-md hover:bg-lime-400 hover:text-white p-2">USER TODOS</button>
                    <button className="bg-slate-600 rounded-md hover:bg-lime-400 hover:text-white p-2">GALLERY</button>
                  </div> */}
                </div>
              </div>
              <p># ID: {user.id}</p>
              <p># NAME: {user.name}</p>
              <p># USER NAME: {user.username}</p>
              <div className="w-full flex justify-evenly user__btn">
                <button className="animated-button us__btn "><span>USER TODOS</span><span></span></button>
                <button className="animated-button us__btn uz__btn  "><span>GALLERY</span><span></span></button>
              </div>
            </div>
          ))}
        </div>
        <div className="card__2 col-md-5 ">
          {albums.slice(0, albums.length > 0 ? albums.length : 1).map(album => (
            <div key={album.id} className="bg-lime-500 p-20px flex w-full flex-col gap-5 p-4 rounded-xl" id={album.id}>
              <div className='cards'>
                <img src={`https://via.placeholder.com/600/92c952`} alt="img" className= " card__img rounded-lg " />
                <p><span className="inline-block text-gray-600"> album id</span>: {album.id}</p>
                <p><span className="inline-block text-gray-600">title</span>: {album.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Uzer;
