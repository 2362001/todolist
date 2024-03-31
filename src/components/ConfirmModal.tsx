import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../slices/todoSlice";
import styles from "../styles/modules/modal.module.scss";

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
    setModalOpen(false)
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
            <form className={styles.form}>
              <label htmlFor="title">
                Are you sure you want to delete this?
              </label>
              <div className={styles.btn}>
                <div
                  className={styles.childbtn}
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  Yes
                </div>
                <div
                  className={styles.childbtn}
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  No
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
