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
import certificationsMarkdown from '@/assets/Free-Certifications.md?raw'
import './App.css'

const SECTION_CONFIG = [
  { heading: 'General', key: 'general', label: '綜合技術' },
  { heading: 'Security', key: 'security', label: '網路安全' },
  { heading: 'Databases', key: 'databases', label: '資料庫' },
  { heading: 'Project Management', key: 'projectManagement', label: '專案管理' },
  { heading: 'Marketing', key: 'marketing', label: '數位行銷' },
  { heading: 'Miscellaneous', key: 'miscellaneous', label: '其他領域' }
]

const stripMarkdown = (value = '') =>
  value
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/_/g, ' ')
    .replace(/`/g, '')
    .trim()

const extractLink = (cell = '') => {
  const match = cell.match(/\(([^)]+)\)/)
  return match ? match[1].trim() : ''
}

const normalizeExpiration = (value = '') => {
  const normalized = value.toLowerCase()
  if (normalized.includes('unlimited')) return '無限期'
  if (normalized.includes('limited')) return '限時'
  if (normalized.includes('unknown')) return '未知'
  return value.trim()
}

const parseCertificationMarkdown = (markdown) => {
  const result = Object.fromEntries(SECTION_CONFIG.map(({ key }) => [key, []]))
  const sectionPattern = /## (.+?)\n([\s\S]*?)(?=\n## |$)/g
  let match

  while ((match = sectionPattern.exec(markdown)) !== null) {
    const [, heading, body] = match
    const section = SECTION_CONFIG.find((cfg) => cfg.heading === heading.trim())
    if (!section) continue

    const lines = body
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.startsWith('|'))

    for (const line of lines) {
      const columns = line.split('|').slice(1, -1)
      const cleaned = columns.map((col) => stripMarkdown(col))
      if (!cleaned.length || ['Technology', 'Provider', '---'].includes(cleaned[0])) continue

      let title
      let provider
      let description
      let expiration
      let linkCellRaw

      if (cleaned.length >= 5) {
        title = cleaned[0]
        provider = cleaned[1]
        description = cleaned[2]
        expiration = cleaned[4] || ''
        linkCellRaw = columns[3]
      } else {
        title = cleaned[0]
        description = cleaned[1]
        expiration = cleaned[3] || ''
        provider = ''
        linkCellRaw = columns[2]
      }

      const link = extractLink(linkCellRaw)
      result[section.key].push({
        title,
        provider: provider || title,
        description,
        link,
        expiration: normalizeExpiration(expiration),
        category: section.label
      })
    }
  }

  return result
}

const certificationData = parseCertificationMarkdown(certificationsMarkdown)

const DEFAULT_TAB = SECTION_CONFIG[0].key

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB)
  const [filteredCerts, setFilteredCerts] = useState(certificationData[DEFAULT_TAB] || [])
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
        console.error('Vanta.js 載入失敗，使用替代效果', error)
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
      console.error('Rellax.js 初始化失敗', error)
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
      const keyword = searchTerm.toLowerCase()
      const filtered = currentData.filter((cert) => {
        const fields = [cert.title, cert.provider, cert.description, cert.category]
        return fields.some((field) => (field || '').toLowerCase().includes(keyword))
      })
      setFilteredCerts(filtered)
    } else {
      setFilteredCerts(currentData)
    }
  }, [searchTerm, activeTab])

  const getCategoryIcon = (category) => {
    const iconMap = {
      '綜合技術': <BookOpen className="w-4 h-4" />,
      '網路安全': <Shield className="w-4 h-4" />,
      '資料庫': <Database className="w-4 h-4" />,
      '專案管理': <Briefcase className="w-4 h-4" />,
      '數位行銷': <TrendingUp className="w-4 h-4" />,
      '其他領域': <Sparkles className="w-4 h-4" />,
      '雲端': <Globe className="w-4 h-4" />,
      'AI/ML': <Brain className="w-4 h-4" />,
      'API': <Code className="w-4 h-4" />,
      '身份管理': <Zap className="w-4 h-4" />
    }
    return iconMap[category] || <Award className="w-4 h-4" />
  }

  const getExpirationBadge = (expiration) => {
    if (!expiration) {
      return null
    }

    if (expiration === '無限期') {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">無限期</Badge>
    } else if (['有限時間', '限時'].includes(expiration)) {
      return <Badge variant="destructive">{expiration}</Badge>
    } else if (expiration === '未知') {
      return <Badge variant="outline" className="border-gray-300 text-gray-600">未知</Badge>
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
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12 bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
                {SECTION_CONFIG.map(({ key, label }) => (
                  <TabsTrigger key={key} value={key} className="flex items-center justify-center gap-2 rounded-xl transition-all duration-300 hover:scale-105">
                    {getCategoryIcon(label)}
                    {label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {SECTION_CONFIG.map(({ key }) => {
                const tabData = key === activeTab ? filteredCerts : certificationData[key] || []
                return (
                  <TabsContent key={key} value={key} className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tabData.map((cert, index) => (
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
                  
                  {key === activeTab && tabData.length === 0 && (
                    <div className="text-center py-16">
                      <div className="text-gray-400 mb-4">
                        <Search className="w-16 h-16 mx-auto mb-4" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">找不到相關課程</h3>
                      <p className="text-gray-500">請嘗試其他搜尋關鍵字或瀏覽其他分類</p>
                    </div>
                  )}
                </TabsContent>
                )
              })}
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
              {['雲端運算', '人工智慧', '網路安全', '資料科學', 'DevOps', '專案管理'].map((tech) => (
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
