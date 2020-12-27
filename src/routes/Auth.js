import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState(); //기본값은 비어있다.
  const [password, setpassword] = useState(); //기본값은 비어있다.
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if ((name = "password")) {
      setpassword(value);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <>
        <form onSubmit={onSubmit}></form>
        <input
          name="email"
          type="text"
          placeholder="email"
          required
          value={email}
          onChaege={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChaege={onChange} ////const로 선언한 onChange event값을 부여한다.
        />
        <input type="submit" placeholder="Log in" />
      </>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;
