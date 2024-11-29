import React from "react";
import { Col, Row } from "react-bootstrap";
import { Chat, Message } from "./types"; 
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import MessageInput from "./MessageInput";

interface ChatBoxProps {
  selectedChat: Chat;
  groupedMessages: Record<string, Message[]>;
  formatDateDivider: (date: string) => string;
  inputValue: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendMessage: () => void;
  handleBackClick: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  selectedChat,
  groupedMessages,
  formatDateDivider,
  inputValue,
  handleInputChange,
  handleSendMessage,
  handleBackClick,
}) => {
  return (
    <div className="chatbox">
      <div className="modal-dialog-scrollable">
        <div className="modal-content">
          <div className="msg-head">
            <Row>
              <Col md={8}>
                <div className="d-flex align-items-center">
                  <span className="chat-icon" onClick={handleBackClick}>
                    <img
                      className="img-fluid"
                      src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg"
                      alt="back"
                    />
                  </span>
                  <div className="flex-shrink-0">
                    <img
                      className="img-fluid"
                      style={{ width: "50px" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVHR62PqqslJrmbNHhwiH3Cmb99-h10mi6g&s"
                      alt="user img"
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h3>Admin</h3>
                    <p>E-mail / Phone Number</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <ul className="moreoption">
                  <li className="navbar nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="modal-body">
            <div className="msg-body">
              {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                  <div className="d-flex align-items-center justify-content-center  mt-3">
                    {formatDateDivider(date)}
                  </div>
                  <ul>
                    {messages.map((message) => (
                      <li
                        key={message.id}
                        className={
                          message.sender === "You" ? "sender" : "repaly"
                        }
                      >
                        <p>{message.text}</p>
                        <span className="time ">{message.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

  
          <MessageInput
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
