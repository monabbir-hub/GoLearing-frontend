import Footer from "../../_App/Footer";
import Footer2 from "../../_App/Footer2";
import Navbar from "../../_App/Navbar";

export default function AdminPage({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer2 />
    </>
  );
}
