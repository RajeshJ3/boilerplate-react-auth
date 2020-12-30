import { useEffect, useState } from "react";
import Routes from "./routes";
import Layout from "./components/Layout";

function App(props) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const local_token = localStorage.getItem("token");
    if (local_token){
      setToken(token);
      setIsAuthenticated(true);
    }
  }, [token])
  return (
    <Layout>
      <Routes {...props} isAuthenticated={isAuthenticated} />
    </Layout>
  );
}

export default App;
