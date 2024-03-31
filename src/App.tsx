import { Toaster } from "react-hot-toast";
import Content from "./components/Content";
import Header from "./components/Header";
import styles from "./styles/modules/app.module.scss";
import Title from "./components/Title";

function App() {
  return (
    <>
      <div className="container">
        <Title>TODO List</Title>
        <div className={styles.app__wrapper}>
          <Header />
          <Content />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
