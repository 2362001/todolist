import { AnimatePresence, motion, Variants } from "framer-motion";
import { useSelector } from "react-redux";
import styles from "../styles/modules/app.module.scss";
import TodoItem from "./TodoItem";
import { RootState } from "../redux/store";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const filterStatus = useSelector(
    (state: RootState) => state.todo.filterStatus
  );

  const sortedTodoList = [...todoList];
  sortedTodoList.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  function handleOnDragEnd(result: A) {
    console.log(result);
    
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
  }

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredTodoList && filteredTodoList.length > 0 ? (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {filteredTodoList.map((todo, index) => (
                    <Draggable draggableId={todo.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <motion.div key={todo.id} variants={childVariants}>
                            <div style={{ padding: "5px 0" }}>
                              <TodoItem todo={todo} />
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <motion.p variants={childVariants} className={styles.emptyText}>
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
