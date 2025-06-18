import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useTheme } from "../../Context/ThemeContext";
import "./GeminiChat.css";

// Initialize the Gemini API
const API_KEY = "AIzaSyAcJUUSCWGjLkiEMOl1gsGdQPyi4eWt5Wg";
const genAI = new GoogleGenerativeAI(API_KEY);

// Helper function to convert file to base64
const fileToGenerativePart = async (file) => {
  const buffer = await file.arrayBuffer();
  // Convert array buffer to base64
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = window.btoa(binary);

  return {
    inlineData: {
      data: base64,
      mimeType: file.type,
    },
  };
};

export default function GeminiChat() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Function to generate response from Gemini
  const generateResponse = async (prompt, image = null) => {
    try {
      setIsLoading(true);

      if (image) {
        // Use multimodal model for image + text
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const imagePart = await fileToGenerativePart(image);
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        return response.text();
      } else {
        // Text-only input
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      }
    } catch (error) {
      console.error("Error generating response:", error);
      return "Sorry, I encountered an error. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif")
    ) {
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;

    const messageText =
      inputValue.trim() || (selectedImage ? "Image uploaded" : "");

    // Add user message with image if present
    const userMessage = {
      text: messageText,
      sender: "user",
      image: imagePreview,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Generate AI response
    const response = await generateResponse(messageText, selectedImage);

    // Add AI message
    const aiMessage = { text: response, sender: "ai" };
    setMessages((prev) => [...prev, aiMessage]);

    // Clear image after sending
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const openFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const themeClass = theme === "dark" ? "dark-theme" : "";

  return (
    <div className={`gemini-chat-container ${themeClass}`}>
      {isOpen ? (
        <div className={`gemini-chat-window ${themeClass}`}>
          <div className="gemini-chat-header">
            <h3>Bright routes AI Chat</h3>
            <button onClick={toggleChat} className="close-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`gemini-chat-messages ${themeClass}`}
            ref={chatContainerRef}
          >
            {messages.length === 0 ? (
              <div className="welcome-message">
                <p>👋 Hello! I&apos;m Bright routes AI. How can I help you today?</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.sender === "user" ? "user-message" : "ai-message"
                  }`}
                >
                  {message.image && (
                    <div className="message-image">
                      <img src={message.image} alt="User uploaded content" />
                    </div>
                  )}
                  <p>{message.text}</p>
                </div>
              ))
            )}
            {isLoading && (
              <div className="ai-message loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {imagePreview && (
            <div className="image-preview-container">
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
                <button onClick={removeImage} className="remove-image-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width="16"
                    height="16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className={`gemini-chat-input ${themeClass}`}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className={themeClass}
            />

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/jpeg,image/png,image/gif"
              className="hidden-file-input"
            />

            <button
              type="button"
              onClick={openFileInput}
              className="image-upload-btn"
              disabled={isLoading}
              title="Upload image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M18.5 12h-1.58l-.66-1.33c-.6-1.2-1.79-1.95-3.17-1.95-1.37 0-2.57.75-3.17 1.95L9.26 12H7.68c-1.5 0-2.7 1.2-2.7 2.7v4.1c0 1.5 1.2 2.7 2.7 2.7h10.8c1.5 0 2.7-1.2 2.7-2.7v-4.1c.02-1.5-1.18-2.7-2.68-2.7zM13 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                <path d="M10.25 3.5h3.5c.14 0 .25-.11.25-.25V1.75c0-.14-.11-.25-.25-.25h-3.5c-.14 0-.25.11-.25.25v1.5c0 .14.11.25.25.25zm8.5 4h-1.79l-1.6-1.6c-.19-.19-.45-.29-.71-.29h-5.3c-.26 0-.52.1-.71.29L7.04 7.5H5.25c-.14 0-.25.11-.25.25v1.5c0 .14.11.25.25.25h13.5c.14 0 .25-.11.25-.25v-1.5c0-.14-.11-.25-.25-.25z" />
              </svg>
            </button>

            <button
              type="submit"
              disabled={isLoading || (!inputValue.trim() && !selectedImage)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="16"
                height="16"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className={`gemini-chat-button ${themeClass}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="20"
            height="20"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-7.152.52c-2.43 0-4.817-.178-7.152-.52-1.978-.292-3.348-2.024-3.348-3.97V6.74c0-1.946 1.37-3.678 3.348-3.97z"
              clipRule="evenodd"
            />
            <path d="M11.25 8.25v3.75m0-3.75h-1.5m1.5 0h1.5m-1.5 7.5c0 1.243-.867 2.25-2.25 2.25H9M12 17.25h1.5m-1.5 0h-1.5m1.5 0v-3.75m0 0v-1.5m0 1.5h1.5m-1.5 0h-1.5" />
          </svg>
          <span className="chat-button-text">Chat with AI</span>
        </button>
      )}
    </div>
  );
}
