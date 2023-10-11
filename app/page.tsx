'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaFolder, FaFileAlt } from 'react-icons/fa'
import { Space, Col } from 'antd'

import Terminal from '../components/Terminal'

import image from 'public/photo-1519681393784-d120267933ba.jpg'

const Home: FC = () => {
  const [showHeader, setShowHeader] = useState(false)
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowHeader(true)
      } else {
        setShowHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const messageQueue = [
      'Hi! Welcome to Branden Dunbar\'s website',
      'Here you can learn more about me, where I\'ve worked, and what I\'ve done.',
      'Use the links in the header to navigate or the icons floating about',
      'Type "about" to learn more about me, "blog" to see my blog posts, "github" to see my github, or "linkedin" to see my linkedin',
    ]

    const intervalId = setInterval(() => {
      if (messageQueue.length > 0) {
        const message = messageQueue.shift() as string
        setMessages((prevMessages) => [...prevMessages, message])
      } else {
        clearInterval(intervalId)
      }
    }, 3000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <div
      style={{
        height: '100vh',
        overflow: 'hidden',
        // background: `url(${image.src}) no-repeat center center fixed`,
        // backgroundSize: 'cover',
      }}
    >
      {showHeader && (
        <header
          style={{
            backgroundColor: 'white',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '10px 20px',
            zIndex: 1,
          }}
        >
          <Space>
            <Link href="/about">About</Link>
            <Link href="/cv">CV</Link>
            <Link href="/blog">
                Blog
            </Link>
            <a href="https://github.com/bcdunbar" style={{ marginLeft: '10px' }}>
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/brandendunbar/" style={{ marginLeft: '10px' }}>
              <FaLinkedin size={24} />
            </a>
          </Space>
        </header>
      )}
      <div
        style={{
          height: 'calc(100vh - 4%)',
          display: 'flex'
        }}
      >
        <Col span={4}>
          <div
            style={{
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10%',
              minWidth: '100px',
              padding: '20px'
            }}
          >
            <a href="https://github.com/bcdunbar" style={{ marginBottom: '20px' }}>
              <FaGithub size={48} color='black' />
            </a>
            <a href="https://www.linkedin.com/in/brandendunbar/" style={{ marginBottom: '20px' }}>
              <FaLinkedin size={48} color='black' />
            </a>
            <Link href="/blog" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <FaFolder size={48} color='black' />
                <span style={{ color: 'black' }}>Blog</span>
              </div>
            </Link>
            <Link href="/cv.pdf">
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'  }}>
                <FaFileAlt size={48} color='black' />
                <span style={{ color: 'black' }}>CV</span>
              </div>
            </Link>
          </div>
        </Col>
        <Col span={20}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Terminal messages={messages} />
          </div>
        </Col>
      </div>   
      <footer style={{ height: '4%', backgroundColor: 'black' }}>
        {/* Your footer content */}
        TEST
      </footer>
    </div>
  )
}

export default Home