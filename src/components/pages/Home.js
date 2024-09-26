// import Base from "../Base";
// import NewFeed from "../NewFeed";

// const Home = () => {
//     return (
//         <Base>
//             <div>
//                 <p>Welcome </p>
//             </div>
//             <NewFeed />
//         </Base>
        
//     );
// };

// export default Home;

import React from 'react';
import Base from '../Base';
import HeroSection from '../HeroSection';
import NewFeed from '../NewFeed';

const Home = () => (
    <Base>
        <HeroSection />
        <NewFeed />
    </Base>
);

export default Home;
