import { useState, useRef, useEffect } from 'react'
import { chatbotApi } from '../lib/api'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là AI Assistant của Stackin. Tôi có thể giúp bạn tìm hiểu về các dịch vụ, hướng dẫn sử dụng, hoặc trả lời các câu hỏi về nền tảng. Bạn cần hỗ trợ gì?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    try {
      // Try to use real API first, fallback to local response
      let botResponse: string
      try {
        const response = await chatbotApi.sendMessage(inputText)
        botResponse = response.data.response || generateBotResponse(inputText)
      } catch (apiError) {
        // Fallback to local AI response if API is not available
        console.log('API not available, using local response')
        botResponse = generateBotResponse(inputText)
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, tôi gặp sự cố kỹ thuật. Vui lòng thử lại sau.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    // Greeting responses
    if (input.includes('xin chào') || input.includes('hello') || input.includes('hi')) {
      return 'Xin chào! Rất vui được gặp bạn. Tôi có thể giúp bạn tìm hiểu về Stackin và các dịch vụ của chúng tôi.'
    }
    
    // Service-related questions
    if (input.includes('dịch vụ') || input.includes('service')) {
      return 'Stackin cung cấp nhiều dịch vụ như: Lắp ráp đồ nội thất, Di chuyển đồ đạc, Lắp đặt đồ vật, Sửa chữa nhà cửa, Dọn dẹp nhà, Hỗ trợ IT. Bạn quan tâm đến dịch vụ nào?'
    }
    
    // Pricing questions
    if (input.includes('giá') || input.includes('price') || input.includes('chi phí')) {
      return 'Giá dịch vụ của chúng tôi rất cạnh tranh và minh bạch. Mỗi dịch vụ có mức giá khác nhau tùy theo độ phức tạp. Bạn có thể xem chi tiết giá trên trang Task hoặc liên hệ trực tiếp với Tasker.'
    }
    
    // How to use platform
    if (input.includes('cách sử dụng') || input.includes('hướng dẫn') || input.includes('how to')) {
      return 'Để sử dụng Stackin:\n1. Đăng ký tài khoản\n2. Đăng task cần làm\n3. Chọn Tasker phù hợp\n4. Thanh toán qua escrow\n5. Tasker hoàn thành công việc\n6. Xác nhận và đánh giá'
    }
    
    // Tasker registration
    if (input.includes('trở thành tasker') || input.includes('tasker')) {
      return 'Để trở thành Tasker:\n1. Đăng ký tài khoản\n2. Điền thông tin cá nhân\n3. Upload giấy tờ tùy thân\n4. Chọn kỹ năng và dịch vụ\n5. Chờ xét duyệt\n6. Bắt đầu nhận task!'
    }
    
    // Payment questions
    if (input.includes('thanh toán') || input.includes('payment') || input.includes('tiền')) {
      return 'Stackin sử dụng hệ thống escrow để đảm bảo an toàn thanh toán. Tiền sẽ được giữ trong ví escrow cho đến khi task hoàn thành và được xác nhận.'
    }
    
    // Support questions
    if (input.includes('hỗ trợ') || input.includes('support') || input.includes('giúp đỡ')) {
      return 'Tôi luôn sẵn sàng hỗ trợ bạn! Bạn có thể:\n- Đặt câu hỏi trực tiếp với tôi\n- Liên hệ qua email\n- Gọi hotline\n- Sử dụng chức năng báo cáo trên trang'
    }
    
    // Default response
    return 'Cảm ơn bạn đã hỏi! Tôi hiểu bạn đang quan tâm đến: "' + userInput + '". Để tôi có thể hỗ trợ tốt hơn, bạn có thể:\n- Hỏi cụ thể về dịch vụ\n- Tìm hiểu cách sử dụng\n- Hỏi về giá cả\n- Liên hệ hỗ trợ'
  }

  const quickActions = [
    { text: 'Dịch vụ của Stackin', icon: '🔧' },
    { text: 'Cách sử dụng', icon: '📖' },
    { text: 'Giá cả', icon: '💰' },
    { text: 'Trở thành Tasker', icon: '👷' },
  ]

  const handleQuickAction = (actionText: string) => {
    setInputText(actionText)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 50,
      width: 'fit-content'
    }}>
      {/* Chat Window - Only show when open */}
      {isOpen && (
        <div style={{
          marginBottom: '16px',
          animation: 'slideInFromBottom 0.3s ease-out'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb',
            width: '320px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            {/* Chat Header */}
            <div style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              padding: '12px',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#3b82f6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  AI
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', margin: 0 }}>AI Assistant</h3>
                  <p style={{ fontSize: '12px', color: '#bfdbfe', margin: 0 }}>Stackin Support</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  color: '#ffffff',
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8'
                  e.currentTarget.style.color = '#dbeafe'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = '#ffffff'
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px',
              maxHeight: '280px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    style={{
                      display: 'flex',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '85%',
                        padding: '8px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        backgroundColor: message.sender === 'user' ? '#2563eb' : '#f3f4f6',
                        color: message.sender === 'user' ? '#ffffff' : '#374151'
                      }}
                    >
                      <p style={{ 
                        whiteSpace: 'pre-wrap', 
                        margin: 0,
                        wordBreak: 'break-word'
                      }}>
                        {message.text}
                      </p>
                      <p style={{
                        fontSize: '10px',
                        marginTop: '4px',
                        margin: 0,
                        color: message.sender === 'user' ? '#bfdbfe' : '#6b7280'
                      }}>
                        {message.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick Actions - Show only when no messages or first message */}
              {messages.length <= 1 && (
                <div style={{ marginTop: '16px' }}>
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textAlign: 'center',
                    margin: '0 0 8px 0'
                  }}>
                    Hoặc chọn một chủ đề:
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '4px'
                  }}>
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action.text)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '8px',
                          fontSize: '12px',
                          backgroundColor: '#f9fafb',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb'
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>{action.icon}</span>
                        <span style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {action.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '8px' }}>
                  <div style={{
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    padding: '8px',
                    borderRadius: '8px'
                  }}>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1s infinite'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1s infinite 0.1s'
                      }}></div>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#9ca3af',
                        borderRadius: '50%',
                        animation: 'bounce 1s infinite 0.2s'
                      }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: '12px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    fontSize: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db'
                  }}
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  style={{
                    backgroundColor: inputText.trim() && !isTyping ? '#2563eb' : '#9ca3af',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: inputText.trim() && !isTyping ? 'pointer' : 'not-allowed',
                    fontSize: '12px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (inputText.trim() && !isTyping) {
                      e.currentTarget.style.backgroundColor = '#1d4ed8'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (inputText.trim() && !isTyping) {
                      e.currentTarget.style.backgroundColor = '#2563eb'
                    }
                  }}
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#2563eb',
          color: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#1d4ed8'
          e.currentTarget.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#2563eb'
          e.currentTarget.style.transform = 'scale(1)'
        }}
        title={isOpen ? "Đóng AI Assistant" : "Mở AI Assistant"}
      >
        💬
      </button>
    </div>
  )
}