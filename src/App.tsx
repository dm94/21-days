import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Theory from "./pages/Theory";
import { usePageTracking } from "./lib/page-tracking";

function App() {
  usePageTracking();

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/theory" element={<Theory />} />
            </Routes>
          </main>
        </div>
      </Router>
    </I18nextProvider>
  );
}

export default App;
