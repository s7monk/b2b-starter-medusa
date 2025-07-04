import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with our team",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="content-container py-12">
        <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Business Street<br />
                  Business District<br />
                  City, State 12345
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Email</h3>
                <p className="text-gray-600">contact@company.com</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">Send us a Message</h2>
            
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:border-transparent transition-colors duration-200"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:border-transparent transition-colors duration-200"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#FF000F] text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors duration-300 font-medium shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}