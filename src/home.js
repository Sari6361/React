import { useSelector } from "react-redux";
import Header from "./header";

const Home = () => {
    const user=useSelector(s=>s.user.user)
    return <>
        <Header />
        <div className="contaier home"><div className="homee">ברוכים הבאים
            </div> </div>
        {user? <div className="homee">שלום {user.Name}</div>:null}
       


    </>
}
export default Home;