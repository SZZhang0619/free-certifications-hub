import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Search, ExternalLink, Star, Users, Award, BookOpen, Shield, Database, Briefcase, TrendingUp, Sparkles, Zap, Globe, Code, Brain } from 'lucide-react'
import * as THREE from 'three'
import p5 from 'p5'
import Rellax from 'rellax'
import './App.css'

// 認證資料結構
const certificationData = {
  general: [
    { title: "GitLab Certification", provider: "GitLab", description: "免費認證路徑和徽章", link: "https://about.gitlab.com/learn/", expiration: "無限期", category: "DevOps" },
    { title: "Oracle Cloud Infrastructure", provider: "Oracle", description: "Oracle 雲端基礎設施認證", link: "https://education.oracle.com/oracle-oci-certification", expiration: "無限期", category: "雲端" },
    { title: "Machine Learning with Python", provider: "freeCodeCamp", description: "免費機器學習課程與認證", link: "https://www.freecodecamp.org/learn/machine-learning-with-python/", expiration: "無限期", category: "AI/ML" },
    { title: "Data Visualization", provider: "freeCodeCamp", description: "免費資料視覺化課程與認證", link: "https://www.freecodecamp.org/learn/data-visualization/", expiration: "無限期", category: "資料科學" },
    { title: "AI Fundamentals", provider: "Databricks", description: "生成式 AI 基礎課程", link: "https://www.databricks.com/resources/learn/training/generative-ai-fundamentals", expiration: "無限期", category: "AI/ML" },
    { title: "Azure Developer Challenge", provider: "Microsoft", description: "學習在 Microsoft Azure 上設計、建構、測試和維護雲端應用程式", link: "https://docs.microsoft.com/en-us/learn/challenges", expiration: "有限時間", category: "雲端" },
    { title: "JumpCloud Core Certification", provider: "JumpCloud", description: "免費 JumpCloud 核心認證（價值 $150）", link: "https://jumpcloud.com/university/certifications/core", expiration: "有限時間", category: "身份管理" },
    { title: "AWS Cloud Quest", provider: "AWS", description: "AWS 雲端探索：雲端從業者", link: "https://explore.skillbuilder.aws/learn/course/11458/aws-cloud-quest-cloud-practitioner", expiration: "無限期", category: "雲端" },
    { title: "Postman API Fundamentals", provider: "Postman", description: "Postman API 基礎學生專家認證", link: "https://academy.postman.com/path/postman-api-fundamentals-student-expert", expiration: "無限期", category: "API" },
    { title: "Neo4j Certified Professional", provider: "Neo4j", description: "成為 Neo4j 認證專業人員", link: "https://neo4j.com/graphacademy/neo4j-certification/", expiration: "無限期", category: "資料庫" }
  ],
  security: [
    { title: "Ethical Hacking Certificate", provider: "Cisco", description: "思科道德駭客認證", link: "https://www.netacad.com/courses/ethical-hacker", expiration: "無限期", category: "網路安全" },
    { title: "Cybersecurity Operations Fundamentals", provider: "Cisco", description: "思科網路安全營運基礎（30 學分）", link: "https://u.cisco.com/path/32", expiration: "2023-11-16", category: "網路安全" },
    { title: "Certified in Cybersecurity", provider: "ISC²", description: "網路安全認證考試券（100% 免費）", link: "https://www.isc2.org/landing/1mcc", expiration: "2024-12-31", category: "網路安全" },
    { title: "Network Security Training", provider: "Fortinet", description: "Fortinet 免費網路安全訓練課程與認證", link: "https://www.fortinet.com/corporate/about-us/newsroom/press-releases/2020/fortinet-makes-all-online-cybersecurity-training-courses-available-for-free.html", expiration: "無限期", category: "網路安全" },
    { title: "Introduction to Cybersecurity", provider: "Cisco Networking Academy", description: "網路安全入門課程與徽章", link: "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity", expiration: "無限期", category: "網路安全" },
    { title: "ISO/IEC 27001 Information Security", provider: "SkillFront", description: "免費 ISO/IEC 27001 資訊安全助理認證", link: "https://www.skillfront.com/ISO-IEC-27001-Information-Security-Associate", expiration: "無限期", category: "資訊安全" },
    { title: "Foundations of Purple Teaming", provider: "AttackIQ", description: "紫隊基礎課程", link: "https://www.academy.attackiq.com/courses/foundations-of-purple-teaming", expiration: "無限期", category: "網路安全" },
    { title: "Security & Identity Fundamentals", provider: "Google Cloud", description: "Google Cloud 安全與身份基礎", link: "https://www.cloudskillsboost.google/course_templates/770", expiration: "無限期", category: "雲端安全" }
  ],
  databases: [
    { title: "MongoDB University", provider: "MongoDB", description: "12 門免費 MongoDB 課程與完成證明", link: "https://university.mongodb.com/courses/catalog", expiration: "無限期", category: "NoSQL" },
    { title: "CockroachDB Fundamentals", provider: "CockroachLab", description: "分散式資料庫核心概念與 CockroachDB 入門", link: "https://university.cockroachlabs.com/course/getting-started-with-cockroachdb", expiration: "無限期", category: "分散式資料庫" },
    { title: "Redis Certified Developer", provider: "Redis", description: "Redis 認證開發者專業認證計畫", link: "https://university.redis.com/certification/", expiration: "無限期", category: "記憶體資料庫" },
    { title: "Databricks Lakehouse Fundamentals", provider: "Databricks", description: "免費 Databricks 湖倉基礎訓練", link: "https://www.databricks.com/learn/training/lakehouse-fundamentals", expiration: "無限期", category: "大數據" },
    { title: "Neo4j Graph Academy", provider: "Neo4j", description: "免費考試認證和課程完成證書", link: "https://graphacademy.neo4j.com", expiration: "無限期", category: "圖形資料庫" },
    { title: "ArangoDB Certified Professional", provider: "ArangoDB", description: "ArangoDB 認證專業人員", link: "https://www.arangodb.com/learn/certification/", expiration: "無限期", category: "多模型資料庫" },
    { title: "CrateDB Academy", provider: "CrateDB", description: "開源多模型資料庫免費線上課程與認證", link: "https://learn.cratedb.com", expiration: "無限期", category: "時序資料庫" }
  ],
  projectManagement: [
    { title: "Scrum Foundations Professional Certificate", provider: "Certiprof", description: "免費 Scrum 基礎專業認證（使用代碼：COVID19Support）", link: "https://certiprof.com/pages/scrum-foundations-professional-certificate-sfpc-english", expiration: "無限期", category: "敏捷開發" },
    { title: "Six Sigma White Belt", provider: "Six Sigma Online", description: "免費六標準差白帶訓練與認證", link: "https://www.sixsigmaonline.org/six-sigma-white-belt-certification/", expiration: "無限期", category: "品質管理" },
    { title: "Project Management Essentials", provider: "OHSC", description: "牛津家庭學習中心免費專案管理課程與證書", link: "https://www.oxfordhomestudy.com/courses/project-management-courses-online/free-online-courses-with-certificates-in-project-management", expiration: "無限期", category: "專案管理" },
    { title: "Scrum Fundamentals Certified", provider: "ScrumStudy", description: "免費 Scrum 基礎認證訓練課程", link: "https://www.scrumstudy.com/certification/scrum-fundamentals-certified", expiration: "無限期", category: "敏捷開發" },
    { title: "Certified Associate In Scrum Fundamentals", provider: "SkillFront", description: "免費 Scrum 基礎助理認證", link: "https://www.skillfront.com/CASF-Certified-Associate-In-Scrum-Fundamentals", expiration: "無限期", category: "敏捷開發" }
  ],
  marketing: [
    { title: "Fundamentals of Digital Marketing", provider: "Google", description: "Google 數位行銷基礎免費課程與證書", link: "https://learndigital.withgoogle.com/digitalgarage/course/digital-marketing", expiration: "無限期", category: "數位行銷" },
    { title: "Microsoft Advertising Certification", provider: "Microsoft", description: "Microsoft 廣告認證與訓練", link: "https://about.ads.microsoft.com/en-us/resources/training/get-certified", expiration: "無限期", category: "廣告行銷" },
    { title: "HubSpot Academy", provider: "HubSpot", description: "免費行銷與銷售課程與認證", link: "https://academy.hubspot.com/courses", expiration: "無限期", category: "入站行銷" },
    { title: "SEMrush Academy", provider: "SEMrush", description: "免費線上數位行銷課程與考試", link: "https://www.semrush.com/academy/", expiration: "無限期", category: "SEO/SEM" },
    { title: "Meta Certified Digital Marketing Associate", provider: "Meta", description: "Meta 認證數位行銷助理", link: "http://www.facebook.com/business/learn/certification/exams/100-101-exam", expiration: "無限期", category: "社群媒體" }
  ]
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('general')
  const [filteredCerts, setFilteredCerts] = useState(certificationData.general)
  const threeRef = useRef()
  const p5Ref = useRef()
  const vantaRef = useRef()
  const rellaxRef = useRef()

  // Three.js 3D 背景動畫
  useEffect(() => {
    if (!threeRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    threeRef.current.appendChild(renderer.domElement)

    // 創建多種幾何體
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 32, 32),
      new THREE.ConeGeometry(0.7, 1.5, 32),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.8),
      new THREE.DodecahedronGeometry(0.6),
      new THREE.IcosahedronGeometry(0.7),
      new THREE.TorusGeometry(0.6, 0.2, 16, 100)
    ]

    const materials = [
      new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true, transparent: true, opacity: 0.6 }),
      new THREE.MeshBasicMaterial({ color: 0x84cc16, wireframe: true, transparent: true, opacity: 0.6 })
    ]

    const meshes = []
    for (let i = 0; i < 25; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)
      
      mesh.position.x = (Math.random() - 0.5) * 40
      mesh.position.y = (Math.random() - 0.5) * 40
      mesh.position.z = (Math.random() - 0.5) * 40
      
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.rotation.z = Math.random() * Math.PI
      
      scene.add(mesh)
      meshes.push(mesh)
    }

    camera.position.z = 20

    const animate = () => {
      requestAnimationFrame(animate)
      
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.003 + index * 0.0003
        mesh.rotation.y += 0.003 + index * 0.0003
        mesh.rotation.z += 0.002 + index * 0.0002
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002
        mesh.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.001
      })
      
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (threeRef.current && renderer.domElement) {
        threeRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  // p5.js 創意背景動畫
  useEffect(() => {
    if (!p5Ref.current) return

    const sketch = (p) => {
      let particles = []
      
      p.setup = () => {
        const canvas = p.createCanvas(window.innerWidth, window.innerHeight)
        canvas.parent(p5Ref.current)
        canvas.style('position', 'fixed')
        canvas.style('top', '0')
        canvas.style('left', '0')
        canvas.style('z-index', '1')
        canvas.style('pointer-events', 'none')
        
        // 創建粒子
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: p.random(p.width),
            y: p.random(p.height),
            vx: p.random(-1, 1),
            vy: p.random(-1, 1),
            size: p.random(2, 8),
            color: p.random(['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'])
          })
        }
      }
      
      p.draw = () => {
        p.clear()
        
        // 更新和繪製粒子
        particles.forEach(particle => {
          particle.x += particle.vx
          particle.y += particle.vy
          
          // 邊界檢測
          if (particle.x < 0 || particle.x > p.width) particle.vx *= -1
          if (particle.y < 0 || particle.y > p.height) particle.vy *= -1
          
          // 繪製粒子
          p.fill(particle.color + '40')
          p.noStroke()
          p.ellipse(particle.x, particle.y, particle.size)
          
          // 繪製連線
          particles.forEach(other => {
            const distance = p.dist(particle.x, particle.y, other.x, other.y)
            if (distance < 100) {
              p.stroke(particle.color + '20')
              p.strokeWeight(1)
              p.line(particle.x, particle.y, other.x, other.y)
            }
          })
        })
      }
      
      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight)
      }
    }

    const p5Instance = new p5(sketch)
    
    return () => {
      p5Instance.remove()
    }
  }, [])

  // Vanta.js 動態背景效果
  useEffect(() => {
    if (!vantaRef.current) return

    // 動態載入 Vanta.js
    const loadVanta = async () => {
      try {
        // 載入 Vanta.js 和 Three.js
        const vantaScript = document.createElement('script')
        vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js'
        
        vantaScript.onload = () => {
          if (window.VANTA && vantaRef.current) {
            const vantaEffect = window.VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x1e40af,
              shininess: 30.00,
              waveHeight: 15.00,
              waveSpeed: 0.75,
              zoom: 0.65
            })
            
            return () => {
              if (vantaEffect) vantaEffect.destroy()
            }
          }
        }
        
        document.head.appendChild(vantaScript)
      } catch (error) {
        console.log('Vanta.js 載入失敗，使用替代效果')
      }
    }

    loadVanta()
  }, [])

  // Rellax.js 視差滾動效果
  useEffect(() => {
    try {
      const rellax = new Rellax('.rellax', {
        speed: -7,
        center: false,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
      })
      
      rellaxRef.current = rellax
      
      return () => {
        if (rellaxRef.current) {
          rellaxRef.current.destroy()
        }
      }
    } catch (error) {
      console.log('Rellax.js 初始化失敗')
    }
  }, [])

  // Particles.js 粒子效果
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS('particles-js', {
          particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: '#3b82f6' },
            shape: { type: 'circle' },
            opacity: { value: 0.3, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
          },
          interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 } }
          },
          retina_detect: true
        })
      }
    }
    document.head.appendChild(script)
  }, [])

  // 搜尋功能
  useEffect(() => {
    const currentData = certificationData[activeTab] || []
    if (searchTerm) {
      const filtered = currentData.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredCerts(filtered)
    } else {
      setFilteredCerts(currentData)
    }
  }, [searchTerm, activeTab])

  const getCategoryIcon = (category) => {
    const iconMap = {
      'DevOps': <Sparkles className="w-4 h-4" />,
      '雲端': <Globe className="w-4 h-4" />,
      'AI/ML': <Brain className="w-4 h-4" />,
      '資料科學': <TrendingUp className="w-4 h-4" />,
      '網路安全': <Shield className="w-4 h-4" />,
      '資料庫': <Database className="w-4 h-4" />,
      '專案管理': <Briefcase className="w-4 h-4" />,
      '行銷': <TrendingUp className="w-4 h-4" />,
      'API': <Code className="w-4 h-4" />,
      '身份管理': <Zap className="w-4 h-4" />
    }
    return iconMap[category] || <Award className="w-4 h-4" />
  }

  const getExpirationBadge = (expiration) => {
    if (expiration === '無限期') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">無限期</Badge>
    } else if (expiration === '有限時間') {
      return <Badge variant="destructive">有限時間</Badge>
    } else {
      return <Badge variant="outline" className="border-orange-300 text-orange-600">{expiration}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Three.js 3D 背景 */}
      <div ref={threeRef} className="fixed inset-0 pointer-events-none z-0" />
      
      {/* p5.js 創意背景 */}
      <div ref={p5Ref} className="fixed inset-0 pointer-events-none z-1" />
      
      {/* Vanta.js 動態背景 */}
      <div ref={vantaRef} className="fixed inset-0 pointer-events-none z-2 opacity-30" />
      
      {/* Particles.js 背景 */}
      <div id="particles-js" className="fixed inset-0 pointer-events-none z-3"></div>
      
      {/* 主要內容 */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4 text-center rellax" data-rellax-speed="-3">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6 animate-fade-in rellax" data-rellax-speed="-2">
                免費認證課程大全
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-delay rellax" data-rellax-speed="-1">
                精選全球最優質的免費認證課程，涵蓋雲端運算、網路安全、資料庫管理、專案管理、數位行銷等熱門領域。
                立即開始您的學習之旅，提升專業技能，獲得國際認可的證書！
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12 rellax" data-rellax-speed="-1">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">100+ 免費課程</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold">國際認證</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">頂級品質</span>
              </div>
            </div>

            {/* 搜尋欄 */}
            <div className="max-w-2xl mx-auto relative rellax" data-rellax-speed="1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="搜尋認證課程、提供商或技術領域..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-2 border-white/50 bg-white/90 backdrop-blur-sm shadow-lg focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-300 hover:shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* 認證分類 */}
        <section className="py-16 px-4 rellax" data-rellax-speed="-2">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                <TabsTrigger value="general" className="flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-4 h-4" />
                  綜合技術
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <Shield className="w-4 h-4" />
                  網路安全
                </TabsTrigger>
                <TabsTrigger value="databases" className="flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <Database className="w-4 h-4" />
                  資料庫
                </TabsTrigger>
                <TabsTrigger value="projectManagement" className="flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <Briefcase className="w-4 h-4" />
                  專案管理
                </TabsTrigger>
                <TabsTrigger value="marketing" className="flex items-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                  <TrendingUp className="w-4 h-4" />
                  數位行銷
                </TabsTrigger>
              </TabsList>

              {Object.keys(certificationData).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCerts.map((cert, index) => (
                      <Card key={index} className="group hover:shadow-2xl transition-all duration-500 bg-white/95 backdrop-blur-sm border-0 shadow-lg hover:scale-105 hover:-translate-y-2 cursor-pointer animate-fade-in-up rellax" data-rellax-speed="-1">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(cert.category)}
                              <Badge variant="outline" className="text-xs transition-all duration-300 group-hover:scale-110">
                                {cert.category}
                              </Badge>
                            </div>
                            {getExpirationBadge(cert.expiration)}
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                            {cert.title}
                          </CardTitle>
                          <CardDescription className="text-sm font-medium text-blue-600 group-hover:text-purple-600 transition-colors duration-300">
                            {cert.provider}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                            {cert.description}
                          </p>
                          <Button 
                            asChild 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                          >
                            <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                              立即學習
                              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  {filteredCerts.length === 0 && (
                    <div className="text-center py-16">
                      <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto mb-4" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">找不到相關課程</h3>
                      <p className="text-gray-500">請嘗試其他搜尋關鍵字或瀏覽其他分類</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* 統計數據區塊 */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rellax" data-rellax-speed="-3">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="animate-fade-in-up rellax" data-rellax-speed="-1">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-lg opacity-90">免費課程</div>
              </div>
              <div className="animate-fade-in-up rellax" data-rellax-speed="-2">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg opacity-90">知名機構</div>
              </div>
              <div className="animate-fade-in-up rellax" data-rellax-speed="-1">
                <div className="text-4xl font-bold mb-2">5</div>
                <div className="text-lg opacity-90">主要領域</div>
              </div>
              <div className="animate-fade-in-up rellax" data-rellax-speed="-2">
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-lg opacity-90">學習機會</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-16 px-4 rellax" data-rellax-speed="-1">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 rellax" data-rellax-speed="-2">開始您的學習之旅</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto rellax" data-rellax-speed="-1">
              這些免費認證課程由全球頂尖的科技公司和教育機構提供，幫助您在競爭激烈的就業市場中脫穎而出。
              立即選擇適合您的課程，投資您的未來！
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 rellax" data-rellax-speed="-2">
              {['雲端運算', '人工智慧', '網路安全', '資料科學', 'DevOps', '專案管理'].map((tech, index) => (
                <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm hover:scale-110 transition-transform duration-300 cursor-pointer">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-gray-700">
              <p className="text-gray-400">
                © 2024 免費認證課程大全 | 資料來源：
                <a href="https://github.com/cloudcommunity/Free-Certifications" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 ml-1 transition-colors duration-300 hover:underline">
                  Cloud Community Free Certifications
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
