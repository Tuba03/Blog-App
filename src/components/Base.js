import { useEffect } from "react";
import CustomNavbar from "./CustomNavbar";
// import NewFeed from "./NewFeed";

const Base=({title="Welcome to my website",children})=>{
    useEffect(()=>{
        //load all the post from server
    },[])


    return(
        <div className="container-fluid p-0 m-0">
            <CustomNavbar />

            {children}

            {/* <NewFeed /> */}
        </div>
    );
};

export default Base;