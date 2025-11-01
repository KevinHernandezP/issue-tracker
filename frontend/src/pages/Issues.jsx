import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useIssuesManager } from "../hooks/useIssuesManager";

export default function Issues({ token, project }) {
  const {
    form,
    loading,
    error,
    grouped,
    columnsOrder,
    setForm,
    handleSubmit,
    onDragEnd,
  } = useIssuesManager(token, project);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
        🧾 Issues Tracker –{" "}
        <span className="text-green-600">{project.name}</span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 p-4 rounded-md shadow-sm mb-6 flex flex-col md:flex-row gap-3"
      >
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-green-400"
          placeholder="Título"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 rounded-md p-2 flex-1 focus:ring-2 focus:ring-green-400"
          placeholder="Descripción"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          Crear
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 text-center italic">
          Cargando incidencias...
        </p>
      ) : error ? (
        <p className="text-red-500 text-center font-semibold">{error}</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columnsOrder.map((col) => (
              <Droppable key={col} droppableId={col}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-3 rounded-lg min-h-[300px] transition-all ${
                      snapshot.isDraggingOver ? "bg-green-50" : "bg-gray-50"
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      {col}
                    </h3>

                    {grouped[col]?.map((i, index) => (
                      <Draggable
                        key={i.id}
                        draggableId={String(i.id)}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white p-3 mb-3 rounded-md shadow-sm border border-gray-200 transition ${
                              snapshot.isDragging
                                ? "shadow-lg ring-2 ring-green-300"
                                : "hover:shadow-md"
                            }`}
                          >
                            <p className="font-semibold text-gray-800">
                              Title: <span className="font-light">{i.title}</span>
                            </p>
                            <p className="font-semibold text-gray-800">
                              Description:{" "}
                              <span className="font-light">
                                {i.description}
                              </span>
                            </p>

                            {i?.tags && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {(Array.isArray(i.tags)
                                  ? i.tags
                                  : JSON.parse(i.tags || "[]")
                                ).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}
