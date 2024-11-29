import React from "react";
import { Chat } from "./types";
import "../../../../src/_metronic/assets/sass/components/ChatSystem.scss";
import { FaBell, FaEnvelope } from "react-icons/fa";

interface ChatListProps {
  chats: Chat[];
  handleChatClick: (chatId: number) => void;
  showChatArea: boolean;
  activeChatId: number | null;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  handleChatClick,
  showChatArea,
  activeChatId,
}) => {
  return (
    <div className="chat-area">
      <div className="chatlist">
        <div className="modal-dialog-scrollable">
          <div className="modal-content">
            <div className="chat-header">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="Open-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Open"
                    type="button"
                    role="tab"
                    aria-controls="Open"
                    aria-selected="true"
                  >
                    AGENTS
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="Closed-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Closed"
                    type="button"
                    role="tab"
                    aria-controls="Closed"
                    aria-selected="false"
                  >
                    CUSTOMERS
                  </button>
                </li>
              </ul>
            </div>

            <div className="modal-body mt-5">
              <div className="chat-list">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="Open"
                    role="tabpanel"
                    aria-labelledby="Open-tab"
                  >
                    {chats
                      .filter((chat) => chat.role === "front end developer")
                      .map((chat) => (
                        <div key={chat.id} className="chat-list">
                          <a
                            href="#"
                            className={
                              chat.id === activeChatId
                                ? "d-flex align-items-center justify-content-start active px-5"
                                : "d-flex align-items-center justify-content-start px-5"
                            }
                            onClick={() => handleChatClick(chat.id)}
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="img-fluid"
                                style={{ width: "50px", borderRadius: "50%" }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVHR62PqqslJrmbNHhwiH3Cmb99-h10mi6g&s"
                                alt="user img"
                              />
                              <span className="active"></span>
                            </div>
                            <div className="flex-grow-1 ms-3 mt-3">
                              <h3>{chat.name}</h3>
                              <p>{chat.role}</p>
                            </div>
                            <div className="d-flex align-items-center justify-content-start">
                              <span className="badge-message  ms-2 rounded-lg">
                                {chat.messages.length}
                              </span>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Closed"
                    role="tabpanel"
                    aria-labelledby="Closed-tab"
                  >
                    {chats
                      .filter((chat) => chat.role === "back end developer")
                      .map((chat) => (
                        <div key={chat.id} className="chat-list">
                          <a
                            href="#"
                            className={
                              chat.id === activeChatId
                                ? "d-flex align-items-center justify-content-start active px-5"
                                : "d-flex align-items-center justify-content-start px-5"
                            }
                            onClick={() => handleChatClick(chat.id)}
                          >
                            <div className="flex-shrink-0 ">
                              <img
                                className="img-fluid"
                                style={{ width: "50px", borderRadius: "50%" }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVHR62PqqslJrmbNHhwiH3Cmb99-h10mi6g&s"
                                alt="user img"
                              />
                              <span className="active"></span>
                            </div>
                            <div className="flex-grow-1 ms-3 mt-3">
                              <h3>{chat.name}</h3>
                              <p>{chat.role}</p>
                            </div>
                            <div className="d-flex align-items-center">
                              <span
                                className="badge-message  ms-2 rounded-lg"
                                style={{ background: "green", color: "white" }}
                              >
                                {chat.messages.length}
                              </span>
                            </div>
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
