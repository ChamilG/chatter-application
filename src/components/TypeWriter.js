import React from 'react'
import Typewriter from "typewriter-effect";

export default function TypeWriter() {
  return  (
    <Typewriter
      options={{
        strings: [
          "Welcome To Chatter",
          "Now you can Chat with your friends",
          "Chat in the ChatRoom",
          "Have fun",
        ],
        autoStart: true,
        loop: true,
        delay:70,
        deleteSpeed: 50,
      }}
    />
  );
}
