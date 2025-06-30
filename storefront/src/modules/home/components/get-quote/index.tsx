"use client"

import { useState } from "react"

const GetQuote = () => {
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    }

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required'
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // 这里添加表单提交逻辑
      console.log('Form data:', formData)
      setIsModalOpen(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      })
      setErrors({
        name: '',
        email: '',
        message: ''
      })
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setErrors({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <>
      <div className="relative py-16 small:py-20 overflow-hidden">
        {/* Multi-layer gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-transparent to-red-50/20"></div>
        
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23e2e8f0' stroke-width='1' opacity='0.5'%3E%3Cpath d='M0 0h80v80H0z'/%3E%3Cpath d='M20 0v80M40 0v80M60 0v80M0 20h80M0 40h80M0 60h80'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top area decorations */}
          <div className="absolute top-12 left-16 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF000F]/10 to-transparent rotate-12 border border-[#FF000F]/10"></div>
          <div className="absolute top-8 right-20 w-16 h-16 rounded-full bg-gradient-to-bl from-slate-200/40 to-transparent"></div>
          
          {/* Center accent line */}
          <div className="absolute top-1/2 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent transform -translate-y-1/2"></div>
          
          {/* Bottom area decorations */}
          <div className="absolute bottom-16 left-12 w-20 h-20 rounded-full bg-gradient-to-tr from-blue-100/30 to-transparent"></div>
          <div className="absolute bottom-12 right-16 w-32 h-6 rounded-full bg-gradient-to-l from-[#FF000F]/8 to-transparent rotate-12"></div>
          
          {/* Subtle corner accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-[#FF000F]/20 rounded-tl-lg"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-slate-300/40 rounded-br-lg"></div>
        </div>

        {/* Soft light overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 pointer-events-none"></div>

        <div className="content-container relative z-10">
          <div className="grid grid-cols-1 large:grid-cols-2 gap-8 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="w-14 h-1.5 bg-gradient-to-r from-[#FF000F] to-[#CC0A0A] mb-6 shadow-lg shadow-[#FF000F]/20 rounded-full"></div>
              <h2 className="font-jxd-bold text-[#0F0F0F] text-3xl small:text-4xl leading-tight mb-6">
                Need a Custom Quote?
              </h2>
              <p className="font-jxd-light text-slate-700 leading-relaxed text-lg mb-4">
                Get competitive pricing for your industrial automation project. Our experts are ready to help you find the perfect solution.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-2 h-2 bg-[#FF000F] rounded-full"></div>
                <span>Quick response within 24 hours</span>
              </div>
            </div>

            {/* Right Side - CTA Button */}
            <div className="flex justify-center large:justify-end">
              <div className="relative">
                {/* Button glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF000F]/20 to-[#CC0A0A]/20 rounded-full blur-xl opacity-75"></div>
                
                <button
                  onClick={openModal}
                  className={`relative text-white font-jxd-bold text-sm rounded-full transition-all duration-300 px-12 py-5 flex items-center gap-3 shadow-2xl hover:shadow-[#FF000F]/25 transform hover:-translate-y-2 border border-white/20 ${
                    isButtonHovered ? 'scale-105' : 'scale-100'
                  }`}
                  style={{ 
                    background: isButtonHovered 
                      ? 'linear-gradient(135deg, #BB2924 0%, #FF000F 50%, #CC0A0A 100%)' 
                      : 'linear-gradient(135deg, #FF000F 0%, #CC0A0A 50%, #AA0808 100%)'
                  }}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                >
                  <span className="relative z-10">GET A FREE QUOTE</span>
                  <div className={`relative z-10 transition-transform duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="font-jxd-bold text-[#0F0F0F] text-2xl">
                Request a Quote
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-[#FF000F] transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="font-jxd-light text-[#0F0F0F] mb-6 leading-relaxed">
                Tell us about your project requirements and we'll get back to you with a competitive quote within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-jxd text-[#0F0F0F] text-sm mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 font-jxd focus:outline-none ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#FF000F]'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1 font-jxd">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block font-jxd text-[#0F0F0F] text-sm mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 font-jxd focus:outline-none ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-300 focus:border-[#FF000F]'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-jxd">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-jxd text-[#0F0F0F] text-sm mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF000F] focus:outline-none transition-colors duration-300 font-jxd"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label className="block font-jxd text-[#0F0F0F] text-sm mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 font-jxd resize-none focus:outline-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-300 focus:border-[#FF000F]'
                    }`}
                    placeholder="Tell us about your project requirements, quantities, and any specific products you need..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1 font-jxd">{errors.message}</p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-jxd-bold text-[#0F0F0F] text-sm mb-3">
                    Or contact us directly:
                  </h4>
                  <div className="flex flex-col small:flex-row gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF000F] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <span className="font-jxd text-[#0F0F0F] text-sm">+86 13436661375</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#FF000F] flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <span className="font-jxd text-[#0F0F0F] text-sm">della101@163.com</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-[#0F0F0F] font-jxd-regular rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white font-jxd-regular rounded-full transition-all duration-300 px-6 py-3 flex items-center justify-center hover:scale-105 shadow-lg hover:shadow-xl"
                    style={{ 
                      background: 'linear-gradient(135deg, #FF000F 0%, #CC0A0A 100%)'
                    }}
                  >
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default GetQuote