import { PacmanLoader } from "react-spinners";


export const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
        <PacmanLoader color="#0F52BA" size={70}></PacmanLoader>
    </div>
  )
}

const styles = {
    loaderContainer: {
        display: "flex",
        justifyContent : "center",
        alignItems: "center", 
        height: "100vh", // Full screen height
    }
}

