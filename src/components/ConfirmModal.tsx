import { AnimatePresence, motion } from "framer-motion";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import styles from "../styles/modules/modal.module.scss";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import toast from "react-hot-toast";
import { Button } from "antd";

interface ConfirmModalProps {
  modalOpen?: boolean;
  setModalOpen: (open: boolean) => void;
  todo?: {
    id: number;
    title: string;
    status: string;
    time: string;
    dayofWeek: string;
  };
}

const ConfirmModal = (props: ConfirmModalProps) => {
  const { modalOpen, setModalOpen, todo } = props;
  const dispatch = useDispatch();

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

  const handleDelete = () => {
    dispatch(deleteTodo(todo?.id));
    toast.success("Todo Deleted Successfully");
  };

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
              // onKeyDown={() => setModalOpen(false)}
              // onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>
            <div
              className={styles.icon}
              onClick={() => handleDelete()}
              onKeyDown={() => handleDelete()}
              tabIndex={0}
              role="button"
            >
              <MdDelete />
            </div>
            <div className={styles.buttonContainer}>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
