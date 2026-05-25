import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-warm-ivory text-espresso-text">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Placeholder title="Our Menu" />} />
            <Route path="/cart" element={<Placeholder title="Your Cart" />} />
            <Route path="/checkout" element={<Placeholder title="Checkout" />} />
            <Route path="/catering" element={<Placeholder title="Catering & Events" />} />
            <Route path="/about" element={<Placeholder title="About HoneyMarve" />} />
            <Route path="/contact" element={<Placeholder title="Contact Us" />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Placeholder title="Admin Dashboard" />} />
            <Route path="/admin/orders" element={<Placeholder title="Manage Orders" />} />
            <Route path="/admin/products" element={<Placeholder title="Manage Products" />} />
            <Route path="/admin/analytics" element={<Placeholder title="Analytics" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
