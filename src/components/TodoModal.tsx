import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import styles from "../styles/modules/modal.module.scss";
import Button from "./Button";
import { AiOutlineHeart } from "react-icons/ai";
import { v4 as uuid } from "uuid";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

interface TodoModalProps {
  type: "add" | "update";
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  todo?: {
    title: string;
    status: string;
    dayofWeek: string;
  };
}

const TodoModal: React.FC<TodoModalProps> = ({
  type,
  modalOpen,
  setModalOpen,
  todo,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [dayofWeek, setDayofWeek] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [isClickHeart, setIsClickHeart] = useState(false);

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please enter a title");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            dayofWeek,
            isClickHeart,
            time: format(new Date(), "p, MM/dd/yyyy"),
          })
        );
        toast.success("Task added successfully");
      }
      if (type === "update") {
        if (todo?.title !== title || todo?.status !== status) {
          dispatch(updateTodo({ ...todo, title, status }));
          toast.success("Task Updated successfully");
        } else {
          toast.error("No changes made");
          return;
        }
      }
      setModalOpen(false);
    }
  };

  const optionDayofWeek = [
    {
      label: "Monday",
      value: "Monday",
    },
    {
      label: "Tuesday",
      value: "Tuesday",
    },
    {
      label: "Wednesday",
      value: "Wednesday",
    },
    {
      label: "Thusday",
      value: "Thusday",
    },
    {
      label: "Friday",
      value: "Friday",
    },
    {
      label: "Saturday",
      value: "Saturday",
    },
    {
      label: "Sunday",
      value: "Sunday",
    },
  ];

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <div className={styles.hdtitle}>
                <h1 className={styles.formTitle}>
                  {type === "add" ? "Add" : "Update"} TODO
                </h1>
                <h1>
                  {!isClickHeart ? (
                    <AiOutlineHeart onClick={() => setIsClickHeart(true)} />
                  ) : (
                    <AiOutlineHeart
                      style={{ color: "red" }}
                      onClick={() => setIsClickHeart(false)}
                    />
                  )}
                </h1>
              </div>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="title">
                Day of the week
                <select
                  id="type"
                  value={dayofWeek}
                  onChange={(e) => setDayofWeek(e.target.value)}
                >
                  {optionDayofWeek.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === "add" ? "Add Task" : "Update Task"}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TodoModal;
