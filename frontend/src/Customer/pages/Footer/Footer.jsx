import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-sm leading-relaxed">
            Welcome to <strong>Aura Salon</strong>, your one-stop destination
            for premium salon services. Book appointments with ease and
            experience luxury at your fingertips.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {["Home", "Services", "Book Appointment", "About Us", "Contact"].map((item, index) => (
              <li key={index}>
                <a href="/" className="hover:text-gray-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <i className="fas fa-phone-alt mr-2"></i> +91 83588 22234
            </li>
            <li>
              <i className="fas fa-envelope mr-2"></i> support@Aura.com
            </li>
            <li>
              <i className="fas fa-map-marker-alt mr-2"></i> 123 Aura Street, City, Country
            </li>
          </ul>
          <div className="mt-4 flex space-x-4 text-lg">
            {[
              { icon: "facebook-f", url: "/" },
              { icon: "twitter", url: "/" },
              { icon: "instagram", url: "/" },
              { icon: "linkedin-in", url: "/" },
            ].map(({ icon, url }, index) => (
              <a
                key={index}
                href={url}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        &copy; 2025 Aura Salon. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
