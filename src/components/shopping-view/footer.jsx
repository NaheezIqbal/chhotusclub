import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

function ShoppingFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              Chhotu's Club
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Your trusted destination for premium quality kids clothing. We
              bring style, comfort, and joy to your little ones.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-orange-500 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-pink-500 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-blue-400 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop/listing"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Shop Now
                </Link>
              </li>
              <li>
                <Link
                  to="/shop/account"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  My Account
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Wishlist
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-orange-400">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                <span className="leading-relaxed">
                  123 Kids Fashion Street
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
              <li className="flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-colors duration-300">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <a href="mailto:support@chhotusclub.com">
                  support@chhotusclub.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-bold mb-2">
                Subscribe to our Newsletter
              </h4>
              <p className="text-gray-400 text-sm">
                Get exclusive deals and updates straight to your inbox!
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-orange-400 focus:outline-none transition-colors duration-300 flex-1 md:w-64"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Chhotu's Club. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="hover:text-orange-400 transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" />{" "}
              for kids
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
