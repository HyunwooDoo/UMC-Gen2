import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#181831] shadow-md  py-6 mt-12">
      <div className="container mx-auto text-center text-[#655C9E]">
        <p>
          &copy; {new Date().getFullYear()} UMC Lp Mission. All rights reserved.
        </p>
      </div>
      <div className="flex justify-center space-x-4 mt-4 text-[#655C9E]">
        <Link to="#">Privacy Policy</Link>
        <Link to="#">Terms of Service</Link>
        <Link to="#">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
