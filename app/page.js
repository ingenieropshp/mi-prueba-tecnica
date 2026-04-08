"use client";
import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';

export default function Home() {
  const { user, login, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Escuchar cambios en Firestore en tiempo real
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return () => unsubscribe();
  }, [user]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    await addDoc(collection(db, "tasks"), {
      text: newTask,
      userId: user.uid,
      createdAt: new Date()
    });
    setNewTask("");
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Prueba Técnica: Task Manager</h1>
        <button onClick={login} className="bg-blue-500 text-white px-6 py-2 rounded">
          Entrar con Google
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold">Hola, {user.displayName}</h2>
        <button onClick={logout} className="text-red-500 text-sm">Salir</button>
      </div>

      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input 
          className="border p-2 flex-grow rounded"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nueva tarea..."
        />
        <button className="bg-green-500 text-white px-4 rounded">+</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between border-b py-2">
            {task.text}
            <button onClick={() => deleteTask(task.id)} className="text-xs bg-gray-200 px-2 rounded">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}