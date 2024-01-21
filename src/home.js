import { useSelector } from "react-redux";
import Header from "./header";

const Home = () => {
    const user = useSelector(s => s.user.user)
    return <>
        <Header />
        <div className="contaier home">
            
            {user ? <>
                <div className="homee">שלום {user.Name}</div>
                <div className="homee">שמחים לפגוש אותך:)</div>
            </>
             :<div className="homee">ברוכים הבאים </div> }
        </div>



    </>
}
export default Home;