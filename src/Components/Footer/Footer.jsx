import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💞</span>
              <span className="text-lg font-bold tracking-tight text-gray-900">
                SoulConnect AI
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Redefining human connection through ethical AI and deep compatibility mapping. Find your person, not just a profile.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-rose-500 transition-colors">AI Matching</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Safety Center</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Verify Profile</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-rose-500 transition-colors">Our Mission</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">AI Ethics</a></li>
              <li><a href="#" className="hover:text-rose-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
            <h4 className="text-sm font-bold text-rose-900 mb-2">Join our Newsletter</h4>
            <p className="text-xs text-rose-700/70 mb-4">The latest on AI and dating psychology.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full text-xs px-3 py-2 rounded-lg border border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-400 bg-white"
              />
              <button className="bg-rose-500 text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-rose-600 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 text-[13px] font-medium text-gray-400">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Cookie Policy</a>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-[13px] text-gray-400">
              © {new Date().getFullYear()} SoulConnect AI. Made with ❤️ for human connection.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;