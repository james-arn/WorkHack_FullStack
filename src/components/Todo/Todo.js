//firebase
import { auth, db } from "../../config/firebase/firebase";
import { uid } from "uid";
import { set, ref, remove, update } from "firebase/database";
//components
import { Navbar } from "../Navbar/Navbar";
//react icons
import { IoIosAddCircle } from "react-icons/io";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";

const Todo = ({
  todo,
  setTodo,
  todos,
  isEdit,
  setIsEdit,
  tempUidd,
  setTempUidd,
}) => {
  //CREATE
  //logs typed input for todo
  const handleToDoChange = (e) => {
    setTodo(e.target.value);
  };

  // firebase funcitons - set creates object to database. ref is what refering to (just imported db).
  // npm library uid is the auto inc key which we refer to when deleting.
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });
    setTodo("");
  };

  //UPDATE
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  //DELETE
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-400 font-mono">
      <div className="bg-white p-8 rounded shadow-2xl w-680px">
        <Navbar />
        <div>
          <div className="w-full flex justify-between">
            <input
              className="text-xl w-full border-2 border-grey-200 mb-1 p-3 rounded-lg outline-none focus:border-purple-500"
              type="text"
              placeholder="Add a new task here..."
              value={todo}
              onChange={handleToDoChange}
            />
            {isEdit ? (
              <>
                <button className="ml-2" onClick={handleEditConfirm}>
                  <TiTick
                    size={40}
                    className="fill-green-700 hover:fill-green-500"
                    data-testid="tick-button"
                  />
                </button>
                <button
                  onClick={() => {
                    setIsEdit(false);
                    setTodo("");
                  }}
                >
                  <ImCross
                    size={20}
                    className="fill-red-700 hover:fill-red-500 mr-1"
                    data-testid="cross-button"
                  />
                </button>
              </>
            ) : (
              <button className="ml-2" onClick={writeToDatabase}>
                <IoIosAddCircle
                  size={60}
                  className="fill-green-700 hover:fill-green-500"
                  data-testid="add-button"
                  aria-labelledby="add-button"
                />
              </button>
            )}
          </div>
          <div className="divide-y divide-purple-200">
            {todos.map((todo) => (
              <div className="flex space-y-2 items-baseline">
                <li className="w-full text-xl" key={todos.uidd}>
                  {todo.todo}
                </li>
                <button
                  onClick={() => handleUpdate(todo)}
                  data-testid="fill-button"
                  aria-labelledby="fill-button"
                  id="fill-button"
                >
                  <AiFillEdit
                    size={30}
                    className="fill-purple-700 hover:fill-purple-500"
                  />
                </button>
                <button
                  id="delete-button"
                  onClick={() => handleDelete(todo.uidd)}
                >
                  <AiOutlineDelete
                    size={30}
                    className="fill-neutral-500 hover:fill-purple-400"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
