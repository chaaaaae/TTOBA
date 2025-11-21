// src\pages\Index.tsx
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Index() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(31, 60, 136, 0.08)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '1.2rem 3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.3rem',
            fontWeight: '700',
            color: 'var(--primary-blue)'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
            }}>
              🎯
            </div>
            <span>AI 면접 코치</span>
          </div>

          <ul style={{
            display: 'flex',
            gap: '2.5rem',
            listStyle: 'none',
            margin: 0,
            padding: 0
          }}>
            {[
              { label: '기능', href: '#features' },
              { label: '데모', href: '#demo' },
              { label: '후기', href: '#testimonials' },
              { label: 'FAQ', href: '#pricing' }
            ].map((item) => (
              <li key={item.label}>
                <a href={item.href} style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.95rem',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/login" style={{  // /dashboard → /login 으로 변경
            padding: '0.85rem 1.8rem',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s',
            textDecoration: 'none',
            background: 'transparent',
            color: 'var(--primary-blue)',
            border: '2px solid var(--primary-blue)',
            fontSize: '0.95rem'
          }}>
            로그인
          </Link>
            <Link to="/signup" style={{
              padding: '0.85rem 1.8rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              textDecoration: 'none',
              background: 'var(--accent-mint)',
              color: 'var(--primary-blue)',
              border: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 12px rgba(72, 226, 179, 0.2)'
            }}>
              시작하기
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '12rem 3rem 8rem',
        background: 'linear-gradient(135deg, #0F1828 0%, #1F3C88 50%, #2C4DF7 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '1000px',
          height: '1000px',
          background: 'radial-gradient(circle, rgba(72, 226, 179, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <div>
            <h1 style={{
              fontSize: '4.2rem',
              fontWeight: '900',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: 'white',
              letterSpacing: '-0.03em'
            }}>
              면접 실력,<br />
              <span style={{
                background: 'linear-gradient(135deg, var(--accent-mint), var(--accent-lime))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                데이터로 성장
              </span>
              하세요
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '2.5rem',
              lineHeight: '1.8'
            }}>
              AI가 표정·시선·음성·답변을 실시간 분석하고, 전문 멘토가 성장 가이드를 제공합니다.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
              <Link to="/signup" style={{
                padding: '1.2rem 2.5rem',
                background: 'var(--accent-mint)',
                color: 'var(--primary-blue)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(72, 226, 179, 0.2)',
                transition: 'all 0.3s',
                display: 'inline-block'
              }}>
                지금 바로 시작하기 →
              </Link>
              <a href="#demo" style={{
                padding: '1.2rem 2.5rem',
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}>
                샘플 보기
              </a>
            </div>

            <div style={{ display: 'flex', gap: '3rem' }}>
              {[
                { number: '50+', label: '기관 파트너십' },
                { number: '10K+', label: '면접 분석 완료' },
                { number: '95%', label: '만족도' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--accent-mint), white)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    {stat.number}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '0.5rem'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock Interface */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.3)'
                  }} />
                ))}
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                padding: '2rem',
                minHeight: '300px',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {[
                  { label: '커뮤니케이션', value: 85 },
                  { label: '논리성', value: 78 },
                  { label: '전문성', value: 82 },
                  { label: '직무적합도', value: 88 }
                ].map((metric, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      width: '100px'
                    }}>
                      {metric.label}
                    </div>
                    <div style={{
                      flex: 1,
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${metric.value}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-mint), var(--accent-lime))',
                        borderRadius: '8px'
                      }} />
                    </div>
                    <div style={{
                      color: 'var(--accent-mint)',
                      fontWeight: '700',
                      fontSize: '1.1rem',
                      width: '40px'
                    }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '8rem 3rem', background: 'var(--bg-light)' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.2rem',
            background: 'rgba(44, 77, 247, 0.1)',
            color: 'var(--primary-bright)',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1.5rem'
          }}>
            AI + 멘토 하이브리드 코칭
          </div>
          <h2 style={{
            fontSize: '3.2rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            성장을 돕는 핵심 기능
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            객관적인 데이터 분석과 따뜻한 멘토링이 만나<br />
            당신의 면접 실력을 체계적으로 끌어올립니다
          </p>
        </div>

        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {[
            {
              icon: '📊',
              title: '실시간 AI 분석',
              description: '표정, 시선, 음성 템포, 답변 구조를 실시간으로 분석합니다. 객관적인 데이터로 강점과 약점을 정확히 파악하세요.'
            },
            {
              icon: '📈',
              title: '성장 중심 리포트',
              description: '단순한 점수가 아닌 성장 가이드. 시선 히트맵부터 답변 구조까지 상세한 인사이트를 제공합니다.'
            },
            {
              icon: '🤝',
              title: '멘토 피드백',
              description: 'AI 분석에 전문 멘토의 조언을 더했습니다. 기술과 사람의 장점을 결합한 하이브리드 피드백.'
            },
            {
              icon: '💼',
              title: '직무 맞춤 질문',
              description: 'IT, 마케팅, 경영 등 모든 직무에 최적화된 질문 뱅크로 실전처럼 연습하세요.'
            },
            {
              icon: '📉',
              title: '성장 추적',
              description: '매 면접마다 쌓이는 데이터로 성장을 시각화. 점점 나아지는 모습을 확인하세요.'
            },
            {
              icon: '🏢',
              title: '기관 솔루션',
              description: '대학, HR 담당자를 위한 통합 시스템. 지원자 비교부터 통계 분석까지 한 곳에서.'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '24px',
              padding: '3rem',
              boxShadow: '0 4px 20px rgba(31, 60, 136, 0.08)',
              border: '1px solid rgba(31, 60, 136, 0.05)',
              transition: 'all 0.4s'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                marginBottom: '2rem',
                boxShadow: '0 8px 24px rgba(44, 77, 247, 0.2)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.6rem',
                marginBottom: '1rem',
                color: 'var(--text-primary)',
                fontWeight: '700'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '1rem'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" style={{
        padding: '8rem 3rem',
        background: 'linear-gradient(135deg, var(--primary-blue), var(--primary-bright))',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{ textAlign: 'center', color: 'white', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.2rem', fontWeight: '800', marginBottom: '1.5rem' }}>
              3분 만에 받는 상세 분석
            </h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
              면접 후 AI가 당신의 강점을 발견하고 성장 포인트를 안내합니다
            </p>
          </div>

          {/* Report Showcase */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '4rem',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '3rem',
              paddingBottom: '2rem',
              borderBottom: '2px solid rgba(31, 60, 136, 0.1)'
            }}>
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  면접 성장 리포트
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  김민진 님의 마케팅 직무 면접 분석
                </p>
              </div>
              <div style={{
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, var(--accent-mint), var(--accent-lime))',
                color: 'var(--primary-blue)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '1.1rem'
              }}>
                종합 83점
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '2rem',
              marginBottom: '3rem'
            }}>
              {[
                { value: 85, name: '커뮤니케이션' },
                { value: 78, name: '논리성' },
                { value: 82, name: '전문성' },
                { value: 88, name: '직무적합도' }
              ].map((score, idx) => (
                <div key={idx} style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'linear-gradient(135deg, rgba(44, 77, 247, 0.05), rgba(72, 226, 179, 0.05))',
                  borderRadius: '20px',
                  border: '2px solid transparent',
                  transition: 'all 0.3s'
                }}>
                  <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem'
                  }}>
                    {score.value}
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: '600' }}>
                    {score.name}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
              {[
                { icon: '💪', title: '강점', desc: '시선 처리가 자연스럽고 표정이 밝아 긍정적인 인상을 줍니다.' },
                { icon: '🎯', title: '개선 포인트', desc: '답변 구조를 서론-본론-결론으로 명확히 구분하면 더 논리적입니다.' },
                { icon: '📌', title: '다음 단계', desc: 'STAR 기법을 활용한 경험 답변 연습을 추천드립니다.' }
              ].map((insight, idx) => (
                <div key={idx} style={{
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '16px',
                  borderLeft: '4px solid var(--accent-mint)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ color: 'var(--primary-blue)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                    {insight.icon} {insight.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {insight.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link to="/signup" style={{
                padding: '1rem 2.5rem',
                background: 'linear-gradient(135deg, var(--primary-bright), var(--primary-blue))',
                color: 'white',
                borderRadius: '12px',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)',
                display: 'inline-block'
              }}>
                전체 리포트 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" style={{ padding: '8rem 3rem', background: 'var(--bg-light)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.2rem',
              background: 'rgba(44, 77, 247, 0.1)',
              color: 'var(--primary-bright)',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              실제 사용자 후기
            </div>
            <h2 style={{ fontSize: '3.2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              함께 성장한 사람들
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              AI 코치와 함께 면접 실력을 키운 실제 사용자들의 진솔한 이야기
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              {
                text: '긴장하면 표정이 굳는 게 제일 고민이었어요. AI가 실시간으로 분석해주니 객관적으로 문제를 알 수 있었고, 3주 만에 커뮤니케이션 점수가 20점 올랐어요!',
                name: '김민진',
                role: '24세 · 취준생',
                avatar: '민'
              },
              {
                text: '기술은 자신 있는데 말로 설명하는 게 어려웠어요. 직무별 질문과 논리 구조 분석 덕분에 이직 면접에서 당당하게 설명할 수 있었습니다.',
                name: '성태환',
                role: '30세 · 개발자',
                avatar: '태'
              },
              {
                text: '300명 학생에게 개별 피드백을 제공하기 어려웠는데, AI가 1차 분석을 해주니 효율적이에요. 데이터 기반 상담으로 만족도도 크게 올랐습니다.',
                name: '김나연',
                role: '42세 · 취업지원센터',
                avatar: '나'
              }
            ].map((testimonial, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(31, 60, 136, 0.08)',
                border: '1px solid rgba(31, 60, 136, 0.05)',
                transition: 'all 0.3s',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '2rem',
                  left: '2rem',
                  fontSize: '5rem',
                  color: 'var(--accent-mint)',
                  opacity: 0.2,
                  fontFamily: 'Georgia, serif'
                }}>
                  "
                </div>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '1.05rem',
                  lineHeight: '1.8',
                  marginBottom: '2rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {testimonial.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-bright), var(--accent-mint))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(44, 77, 247, 0.2)'
                  }}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div style={{ color: 'var(--accent-orange)', marginTop: '1.5rem', fontSize: '1.2rem' }}>
                  ⭐⭐⭐⭐⭐
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '8rem 3rem',
        background: 'linear-gradient(135deg, #0F1828 0%, var(--primary-blue) 100%)',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'white', marginBottom: '1.5rem' }}>
            오늘부터 시작하는 면접 성장
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '3rem', lineHeight: '1.8' }}>
            5분이면 첫 모의면접을 완료하고 상세한 분석 리포트를 받을 수 있어요.<br />
            신용카드 등록 없이, 지금 바로 무료로 체험해보세요.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            <Link to="/signup" style={{
              padding: '1.2rem 2.5rem',
              background: 'var(--accent-mint)',
              color: 'var(--primary-blue)',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1.1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(72, 226, 179, 0.2)',
              display: 'inline-block'
            }}>
              지금 바로 시작하기 →
            </Link>
            <a href="#" style={{
              padding: '1.2rem 2.5rem',
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '12px',
              fontWeight: '700',
              fontSize: '1.1rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              영업팀 연결
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            {['✓ 카드 등록 불필요', '✓ 3회 무료 체험', '✓ 언제든 해지 가능'].map((badge, idx) => (
              <div key={idx} style={{ fontSize: '0.95rem' }}>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '4rem 3rem 2rem', background: 'var(--bg-dark)', color: 'white' }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>AI 면접 코치</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              데이터로 성장하는 면접 준비.<br />
              AI와 멘토가 함께하는 당신의 성장 파트너.
            </p>
          </div>

          {[
            { title: '서비스', links: ['AI 모의면접', '질문 뱅크', '멘토 매칭', '기업 솔루션'] },
            { title: '회사', links: ['회사 소개', 'AI 윤리', '채용', '블로그'] },
            { title: '지원', links: ['고객센터', 'FAQ', '이용약관', '개인정보처리'] }
          ].map((section, idx) => (
            <div key={idx}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{section.title}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>
                    <a href="#" style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      fontSize: '0.9rem'
                    }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '0.9rem'
        }}>
          © 2025 AI 면접 코치. All rights reserved.
        </div>
      </footer>
    </div>
  )
}