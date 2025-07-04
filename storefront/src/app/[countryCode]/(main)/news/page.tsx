import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "News & Updates - Beijing Jianxindi Technology",
  description: "Stay updated with the latest news, industry insights, and technological advancements in industrial automation",
}

const newsArticles = [
  {
    id: 1,
    title: "Revolutionary Automation Solutions Transform Manufacturing Efficiency",
    excerpt: "Discover how our latest automation technologies are helping manufacturers achieve unprecedented levels of efficiency and sustainability across global operations.",
    content: "In today's rapidly evolving industrial landscape, automation has become the cornerstone of competitive manufacturing. Our cutting-edge solutions integrate seamlessly with existing infrastructure, delivering measurable improvements in productivity, quality, and operational efficiency. Recent implementations have shown up to 40% reduction in operational costs and 60% improvement in production throughput.",
    category: "Technology",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/imgs/abb.png",
    featured: true
  },
  {
    id: 2,
    title: "Strategic Partnership with Leading European Shipbuilding Industry",
    excerpt: "Beijing Jianxindi Technology announces major partnership expansion in European maritime sector, bringing advanced automation to shipbuilding operations.",
    content: "We are proud to announce our expanded partnership with leading European shipbuilding companies, providing state-of-the-art automation solutions that enhance precision, safety, and efficiency in maritime construction. This collaboration represents a significant milestone in our global expansion strategy.",
    category: "Partnership",
    date: "2024-01-10",
    readTime: "3 min read",
    image: "/imgs/honeywell.png",
    featured: false
  },
  {
    id: 3,
    title: "Sustainable Energy Solutions: Powering the Future of Industry",
    excerpt: "Explore our commitment to sustainable industrial practices through innovative electrification and renewable energy integration solutions.",
    content: "As industries worldwide shift towards sustainable practices, our electrification solutions are at the forefront of this transformation. We're helping companies reduce their carbon footprint while maintaining operational excellence through smart energy management and renewable integration technologies.",
    category: "Sustainability",
    date: "2024-01-05",
    readTime: "4 min read",
    image: "/imgs/siemens.png",
    featured: false
  },
  {
    id: 4,
    title: "Digital Transformation in Asian Textile Manufacturing",
    excerpt: "How digital automation is revolutionizing textile production across Asia, improving quality control and reducing waste in manufacturing processes.",
    content: "The textile industry in Asia is experiencing a digital revolution. Our advanced automation systems are helping manufacturers implement Industry 4.0 principles, resulting in improved quality control, reduced waste, and enhanced production flexibility. These innovations are setting new standards for the global textile industry.",
    category: "Industry Insights",
    date: "2023-12-28",
    readTime: "6 min read",
    image: "/imgs/company.png",
    featured: false
  },
  {
    id: 5,
    title: "Port Automation Excellence in South American Operations",
    excerpt: "Successful implementation of automated port systems in South America demonstrates the global reach and effectiveness of our industrial solutions.",
    content: "Our port automation solutions have successfully transformed shipping operations across South America, delivering enhanced efficiency, safety, and throughput. These implementations showcase our ability to adapt cutting-edge technology to diverse operational environments and cultural contexts.",
    category: "Case Study",
    date: "2023-12-20",
    readTime: "4 min read",
    image: "/imgs/warehouse.png",
    featured: false
  },
  {
    id: 6,
    title: "Innovation in Sugar Industry Automation",
    excerpt: "Advanced process control systems are transforming sugar production efficiency and quality standards across Asian markets.",
    content: "The sugar industry is embracing automation like never before. Our specialized process control systems are helping sugar producers achieve consistent quality, reduce energy consumption, and optimize production cycles. These innovations are particularly impactful in Asian markets where demand continues to grow.",
    category: "Technology",
    date: "2023-12-15",
    readTime: "5 min read",
    image: "/imgs/service_consulting.png",
    featured: false
  }
]

const categories = ["All", "Technology", "Partnership", "Sustainability", "Industry Insights", "Case Study"]

export default function NewsPage() {
  const featuredArticle = newsArticles.find(article => article.featured)
  const regularArticles = newsArticles.filter(article => !article.featured)

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <div className="max-w-4xl">
            <div className="w-16 h-2 mx-auto mb-8 bg-[#FF000F] shadow-lg shadow-red-500/50"></div>
            <h1 className="font-jxd-bold text-white text-5xl large:text-6xl leading-tight mb-6">
              News & Updates
            </h1>
            <p className="text-white font-jxd-light text-xl max-w-2xl mx-auto">
              Stay informed with the latest developments in industrial automation and our global impact
            </p>
          </div>
        </div>
      </div>

      {/* Featured Article Section */}
      {featuredArticle && (
        <div className="bg-white py-24 large:py-32 relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
          
          <div className="content-container relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
                <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                  FEATURED STORY
                </span>
                <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
              </div>
            </div>

            {/* Featured Article */}
            <div className="grid grid-cols-1 large:grid-cols-2 gap-16 items-center">
              {/* Article Image */}
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-full h-full border-2 border-[#FF000F]/10 rounded-2xl"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#FF000F] text-white font-jxd-bold text-sm px-4 py-2 rounded-full">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  {/* Article Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="font-jxd-light">{new Date(featuredArticle.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="font-jxd-light">{featuredArticle.readTime}</span>
                  </div>
                  
                  {/* Article Title */}
                  <h2 className="font-jxd-bold text-[#0F0F0F] text-3xl large:text-4xl leading-tight">
                    {featuredArticle.title}
                  </h2>
                  
                  {/* Article Excerpt */}
                  <p className="font-jxd-light text-gray-600 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                {/* Read More Button */}
                <div className="pt-4">
                  <button className="group font-jxd-bold bg-[#FF000F] hover:bg-[#BB2924] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-3">
                    <span>Read Full Article</span>
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* News Grid Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-24 large:py-32 relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FF000F]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="content-container relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
              <span className="font-jxd-bold text-gray-500 text-sm tracking-[0.2em] uppercase">
                LATEST NEWS
              </span>
              <div className="w-3 h-3 bg-[#FF000F] rotate-45"></div>
            </div>
            <h2 className="font-jxd-bold text-[#0F0F0F] text-4xl large:text-5xl leading-tight mb-6">
              Industry <span className="text-[#FF000F]">Insights</span>
            </h2>
            <p className="font-jxd-light text-gray-600 text-lg max-w-3xl mx-auto">
              Explore our latest developments, partnerships, and technological breakthroughs 
              that are shaping the future of industrial automation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`font-jxd-regular px-6 py-3 rounded-full transition-all duration-300 ${
                  index === 0 
                    ? 'bg-[#FF000F] text-white shadow-lg' 
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 medium:grid-cols-2 large:grid-cols-3 gap-8">
            {regularArticles.map((article, index) => (
              <div key={article.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                {/* Article Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-[#FF000F] font-jxd-bold text-xs px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 space-y-4">
                  {/* Article Meta */}
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="font-jxd-light">{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span className="font-jxd-light">{article.readTime}</span>
                  </div>
                  
                  {/* Article Title */}
                  <h3 className="font-jxd-bold text-[#0F0F0F] text-xl leading-tight group-hover:text-[#FF000F] transition-colors duration-300">
                    {article.title}
                  </h3>
                  
                  {/* Article Excerpt */}
                  <p className="font-jxd-light text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <button className="group/btn font-jxd-bold text-[#FF000F] hover:text-[#BB2924] text-sm flex items-center space-x-2 transition-colors duration-300">
                      <span>Read More</span>
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-16">
            <button className="font-jxd-bold bg-white hover:bg-gray-50 text-[#0F0F0F] border-2 border-[#FF000F] hover:border-[#BB2924] px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
              Load More Articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 py-24 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="content-container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-2 mx-auto mb-8 bg-[#FF000F] shadow-lg shadow-red-500/50"></div>
            <h2 className="font-jxd-bold text-white text-4xl large:text-5xl leading-tight mb-6">
              Stay <span className="text-[#FF000F]">Connected</span>
            </h2>
            <p className="text-white font-jxd-light text-lg mb-12">
              Subscribe to our newsletter and be the first to know about our latest innovations, 
              industry insights, and technological breakthroughs.
            </p>
            
            {/* Newsletter Form */}
            <div className="flex flex-col medium:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 font-jxd-light px-6 py-4 rounded-full border-2 border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:border-[#FF000F] transition-colors duration-300"
              />
              <button className="font-jxd-bold bg-[#FF000F] hover:bg-[#BB2924] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}