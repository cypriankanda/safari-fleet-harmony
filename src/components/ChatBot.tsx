
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, Minimize } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Example responses for the chatbot
const botResponses = {
  greetings: [
    "Hello! How can I help you with fleet management today?",
    "Hi there! I'm here to assist with your vehicle fleet needs.",
    "Welcome to the fleet assistant! How may I help you?"
  ],
  bookings: [
    "To manage bookings, navigate to the bookings tab where you can view, approve, or reject reservation requests.",
    "You can assign drivers to bookings by clicking the 'Review' button on pending bookings."
  ],
  vehicles: [
    "Vehicle management is available in the vehicles tab. You can update availability status or add new vehicles to your fleet.",
    "To mark a vehicle as unavailable, use the toggle button in the vehicles section."
  ],
  drivers: [
    "Driver management allows you to add new drivers, update their details, or change their availability status.",
    "You can view a driver's complete profile and trip history from the drivers tab."
  ],
  fallback: [
    "I'm not sure about that. Can you try rephrasing your question?",
    "I don't have information on that yet. Can I help with bookings, vehicles, or drivers instead?",
    "That's beyond my current knowledge. Would you like help with fleet management tasks?"
  ]
};

// Helper function to get a random response from an array
const getRandomResponse = (responses: string[]) => {
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

// Process user input to determine intent
const processUserInput = (input: string): string => {
  const lowercaseInput = input.toLowerCase();
  
  if (lowercaseInput.includes("hello") || 
      lowercaseInput.includes("hi") || 
      lowercaseInput.includes("hey") || 
      lowercaseInput.includes("greetings")) {
    return getRandomResponse(botResponses.greetings);
  } else if (lowercaseInput.includes("booking") || 
             lowercaseInput.includes("reservation") || 
             lowercaseInput.includes("book") ||
             lowercaseInput.includes("schedule")) {
    return getRandomResponse(botResponses.bookings);
  } else if (lowercaseInput.includes("vehicle") || 
             lowercaseInput.includes("car") || 
             lowercaseInput.includes("fleet")) {
    return getRandomResponse(botResponses.vehicles);
  } else if (lowercaseInput.includes("driver") || 
             lowercaseInput.includes("chauffeur") || 
             lowercaseInput.includes("staff")) {
    return getRandomResponse(botResponses.drivers);
  } else {
    return getRandomResponse(botResponses.fallback);
  }
};

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hi there! I'm your fleet assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage("");

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse: Message = {
        content: processUserInput(userMessage.content),
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    if (!isOpen) {
      setIsMinimized(false);
    }
    setIsOpen(!isOpen);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  // Format timestamp to readable format
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className={`fixed bottom-6 right-6 w-80 shadow-xl z-50 transition-all duration-300 ${
          isMinimized ? 'h-14' : 'h-96'
        }`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-blue-100">
                <Bot className="h-4 w-4 text-blue-600" />
              </Avatar>
              <CardTitle className="text-sm font-medium">Fleet Assistant</CardTitle>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full" 
                onClick={minimizeChat}
              >
                {isMinimized ? <MessageCircle className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 rounded-full" 
                onClick={toggleChat}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          {!isMinimized && (
            <>
              <CardContent className="p-3 overflow-y-auto h-64">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="p-3 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button 
                    size="icon" 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  );
};

export default ChatBot;
