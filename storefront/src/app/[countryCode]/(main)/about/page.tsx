import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our company",
}

export default function AboutPage() {
  return (
    <div className="content-container py-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            We are a leading B2B technology company committed to helping businesses succeed 
            through innovative solutions and exceptional service.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to empower businesses with cutting-edge technology solutions 
            that drive growth, efficiency, and success in today's competitive marketplace.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Innovation and Excellence</li>
            <li>Customer-Centric Approach</li>
            <li>Integrity and Transparency</li>
            <li>Continuous Improvement</li>
            <li>Collaborative Partnerships</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
          <p className="mb-6">
            With years of experience in the industry, we understand the unique challenges 
            businesses face. Our team of experts is dedicated to providing tailored solutions 
            that meet your specific needs and exceed your expectations.
          </p>
        </div>
      </div>
    </div>
  )
} 