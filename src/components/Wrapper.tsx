import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ReactNode} from "react";

type Props = {
    children: ReactNode
}

const Wrapper = ({children}: Props ) =>
    (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    )
export default Wrapper