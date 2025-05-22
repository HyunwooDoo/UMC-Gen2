import Navbar from "./components/Navbar";
import MainLayout from "./Layouts/MainLayout";
import "./index.css";

function App() {
  return (
    <MainLayout>
      <Navbar />
      <div className="text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Page</h1>
        <p className="text-lg">contents area</p>
      </div>
    </MainLayout>
  );
}

export default App;
