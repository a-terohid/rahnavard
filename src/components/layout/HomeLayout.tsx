
import Navbar from "@/module/Navbar";
import { Toaster } from "react-hot-toast";

/**
     * HomeLayout component wraps the page content with Navbar and Footer.
     * It conditionally hides Navbar and Footer on specific routes like login or password pages.
     * 
     * @param children - The main content to be rendered inside the layout.
     * @param role - The user role, used to customize the Navbar.
 */

const HomeLayout = ({ children }: { children: React.ReactNode; }) => {


    return (
        <body>
            <Navbar />
            
            {/* Render main page content */}
            <div className={``}>{children}</div>

            {/* { <Footer />} */}
            
            {/* Toast notifications container */}
            <Toaster />
        </body>
    );
};

export default HomeLayout;