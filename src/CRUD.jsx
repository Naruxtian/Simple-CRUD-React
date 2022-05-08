import react from "react";
import { useState } from "react";
import { nanoid } from "nanoid";

function CRUD() {
  const [tarea, setTarea] = react.useState("");
  const [tareas, setTareas] = react.useState([]);
  const [modoEdicion, setModoEdicion] = react.useState(false);
  const [id, setId] = react.useState("");
  const [error, setError] = react.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();
    //Validar si esta vacio o no
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo por favor");
      return;
    }
    console.log(tarea);

    setTareas([...tareas, { id: nanoid(10), nombreTarea: tarea }]);

    //Limpiar el input mediante el value asignado
    setTarea("");
    setError(null);
  };

  const eliminarTarea = (id) => {
    //Agregamos a un nuevo array todas las tareas excepto la que tenga el id que vamos a eliminar
    const arrayFiltrado = tareas.filter((item) => item.id !== id);
    //Establecemos como las tareas el array filtrado que excluye la eliminada, de esta manera desaparece
    setTareas(arrayFiltrado);
  };

  const editar = (item) => {
    setModoEdicion(true);
    setTarea(item.nombreTarea);
    setId(item.id);
  };

  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Elemento vacio");
      setError("Escriba algo por favor");
      return;
    }

    //En este nuevo array guardamos nuevamente todos los items pero en el que el id sea igual al que
    //le estamos pasando para editar, toma el valor del input y lo añade con ese id, de esa manera remplazando
    //el contenido de este
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id: id, nombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setModoEdicion(false);
    setTarea("");
    setId("");
    setError(null);
  };

  return (
    <div className="container m-5">
      <h1 className="text-center">CRUD Simple</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {tareas.length === 0 ? (
              <li className="list-group-item" y>
                No hay tareas
              </li>
            ) : (
              tareas.map((item) => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">{item.nombreTarea}</span>
                  <button
                    className="btn btn-danger btn-sm float-end mx-2"
                    onClick={() => eliminarTarea(item.id)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-end"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar tarea" : "Agregar tarea"}
          </h4>
          <form
            className="d-grid gap-2"
            onSubmit={modoEdicion ? editarTarea : agregarTarea}
          >
            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            {modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">
                Editar
              </button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">
                Agregar
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CRUD;
