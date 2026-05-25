import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Catering from './pages/Catering';
import Placeholder from './pages/Placeholder';

// Admin Pages
import Overview from './pages/admin/Overview';
import AdminRequests from './pages/admin/AdminRequests';
import AdminProducts from './pages/admin/AdminProducts';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Site */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen bg-warm-ivory text-espresso-text">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/product/:slug" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/catering" element={<Catering />} />
                  <Route path="/about" element={<Placeholder title="About HoneyMarve" />} />
                  <Route path="/contact" element={<Placeholder title="Contact Us" />} />
                  <Route path="/checkout" element={<Placeholder title="Checkout" />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin Site – separate layout, no public Navbar/Footer */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="orders" element={<AdminRequests />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
