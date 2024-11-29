import React, { useState, ChangeEvent } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import moment from "moment";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import { PageTitle } from "../../../_metronic/layout/core";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import { Chat, Message } from "./types";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      name: "Admin 1",
      role: "front end developer",
      messages: [
        {
          id: 1,
          text: "Hello from Admin 1!",
          sender: "Admin",
          time: "10:00 AM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "How Are You Admin 1!",
          sender: "Admin",
          time: "10:15 AM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 2,
      name: "Admin 2",
      role: "front end developer",
      messages: [
        {
          id: 1,
          text: "Hello from Admin 2!",
          sender: "Admin",
          time: "11:00 AM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "How Are You Admin 2!",
          sender: "Admin",
          time: "11:15 AM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 3,
      name: "Admin 3",
      role: "front end developer",
      messages: [
        {
          id: 1,
          text: "Hello from Admin 3!",
          sender: "Admin",
          time: "12:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "How Are You Admin 3!",
          sender: "Admin",
          time: "12:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 5,
      name: "Admin 4",
      role: "front end developer",
      messages: [
        {
          id: 1,
          text: "Hello from Admin 5!",
          sender: "Admin",
          time: "1:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "How Are You Admin 5!",
          sender: "Admin",
          time: "1:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 6,
      name: "Admin 5",
      role: "front end developer",
      messages: [
        {
          id: 1,
          text: "Hello from Admin 6!",
          sender: "Admin",
          time: "2:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "How Are You Admin 6!",
          sender: "Admin",
          time: "2:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 7,
      name: "Customer 1",
      role: "back end developer",
      messages: [
        {
          id: 1,
          text: "How Are You from Customer 7!",
          sender: "Customer",
          time: "3:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "What Are You Doing Customer 7?",
          sender: "Customer",
          time: "3:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 8,
      name: "Customer 2",
      role: "back end developer",
      messages: [
        {
          id: 1,
          text: "How Are You from Customer 8!",
          sender: "Customer",
          time: "4:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "What Are You Doing Customer 8?",
          sender: "Customer",
          time: "4:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 9,
      name: "Customer 3",
      role: "back end developer",
      messages: [
        {
          id: 1,
          text: "How Are You from Customer 9!",
          sender: "Customer",
          time: "5:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "What Are You Doing Customer 9?",
          sender: "Customer",
          time: "5:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 10,
      name: "Customer 4",
      role: "back end developer",
      messages: [
        {
          id: 1,
          text: "How Are You from Customer 10!",
          sender: "Customer",
          time: "6:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "What Are You Doing Customer 10?",
          sender: "Customer",
          time: "6:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
    {
      id: 11,
      name: "Customer 5",
      role: "back end developer",
      messages: [
        {
          id: 1,
          text: "How Are You from Customer 11!",
          sender: "Customer",
          time: "7:00 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
        {
          id: 2,
          text: "What Are You Doing Customer 11?",
          sender: "Customer",
          time: "7:15 PM",
          date: moment().subtract(1, "days").format("YYYY-MM-DD"),
        },
      ],
    },
 

    
    
  ]);

  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [showChatArea, setShowChatArea] = useState<boolean>(false);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && selectedChatId !== null) {
      const now = new Date();
      const formattedTime = moment(now).format("hh:mm A");
      const formattedDate = moment(now).format("YYYY-MM-DD");

      const newMessage: Message = {
        id: chats[selectedChatId - 1].messages.length + 1,
        text: inputValue,
        sender: "You",
        time: formattedTime,
        date: formattedDate,
      };

      const updatedChats = chats.map((chat) =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      );
      setChats(updatedChats);
      setInputValue("");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChatClick = (chatId: number) => {
    setSelectedChatId(chatId);
    setShowChatArea(true);
  };

  const handleBackClick = () => {
    setShowChatArea(false);
  };

  const formatDateDivider = (date: string) => {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    if (date === today) return "Today";
    if (date === yesterday) return "Yesterday";
    return moment(date).format("MMMM D, YYYY");
  };

  const selectedChat =
    chats.find((chat) => chat.id === selectedChatId) || chats[0];

  const groupedMessages = selectedChat.messages.reduce((acc, message) => {
    const date = message.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, Message[]>);

  return (
    <Container fluid>
      <div className="bg-none">
      <PageTitle>CHATS</PageTitle>
      </div>
      <Row>
        <Col
          md={4}
          className={`chatlist-col ${showChatArea ? "d-none d-md-block" : ""}`}
        >
          <ChatList
            chats={chats}
            handleChatClick={handleChatClick}
            showChatArea={showChatArea}
            activeChatId={selectedChatId ?? 0}
          />
        </Col>

        <Col
          md={8}
          className={`chatbox-col ${!showChatArea ? "d-none d-md-block" : ""}`}
        >
          <ChatBox
            selectedChat={selectedChat}
            groupedMessages={groupedMessages}
            formatDateDivider={formatDateDivider}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
            handleBackClick={handleBackClick}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
