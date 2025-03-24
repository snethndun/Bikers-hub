import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import Logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <img src={Logo} alt="Biker's Hub Logo" className="h-12 mb-4" />{" "}
            {/* Replace with your actual logo */}
            <p className="text-sm text-gray-500 text-center sm:text-left">
              Biker's Hub is your go-to place for everything related to biking!
              We provide resources, services, and community connections for
              passionate bikers.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-400">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-yellow-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter section with plain input box */}
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-lg font-semibold mb-4">
              Subscribe to Our Newsletter
            </h3>
            <div className="flex items-center w-full max-w-md mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-greay-500"
              />
              <button className="bg-black text-white font-semibold p-2 rounded-md ml-2 hover:bg-gray-500">
                Subscribe
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-500">
                <BsFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-500">
                <BsInstagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-500">
                <BsTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-500">
                <BsGithub size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-500">
                <BsDribbble size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Biker's Hub. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
