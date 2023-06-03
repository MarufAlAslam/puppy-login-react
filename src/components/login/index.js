import React from "react";
import puppy from "../../images/puppy.png";
import leftHand from "../../images/left-1.png";
import rightHand from "../../images/right-1.png";

const Login = () => {
  const [eyePosition, setEyePosition] = React.useState(0);
  const [lastLength, setLastLength] = React.useState(0);

  const [show, setShow] = React.useState(false);
  // reset form on page load
  React.useEffect(() => {
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }, []);

  const handleEyeMoveOnEmailChange = (e) => {
    const pupils = document.querySelectorAll(".pupil");
    const fieldLength = e.target.value.length;

    const leftHand = document.querySelector(".left-hand");
    const rightHand = document.querySelector(".right-hand");

    leftHand.classList.remove("active");
    rightHand.classList.remove("active");
    rightHand.classList.remove("show-pass");

    setLastLength(fieldLength);

    pupils.forEach((pupil) => {
      pupil.style.left = `${eyePosition}px`;
    });

    if (fieldLength > lastLength) {
      setEyePosition(eyePosition + 0.25);
    } else {
      setEyePosition(eyePosition - 0.25);
    }

    if (eyePosition > 30) {
      setEyePosition(15);
    }
  };

  const passwordFieldActive = () => {
    const leftHand = document.querySelector(".left-hand");
    const rightHand = document.querySelector(".right-hand");

    setShow(true);

    leftHand.classList.add("active");
    rightHand.classList.add("active");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const leftHand = document.querySelector(".left-hand");
    const rightHand = document.querySelector(".right-hand");

    leftHand.classList.remove("active");
    rightHand.classList.remove("active");

    const password = document.getElementById("password").value;

    if(password.length < 1) {
      setShow(false);
    }
  }

  const showPass = () => {
    const rightHand = document.querySelector(".right-hand");
    rightHand.classList.toggle("active");
    rightHand.classList.toggle("show-pass");
    const password = document.getElementById("password");
    if(password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }
  return (
    <div className="bg-green-300 min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 shadow-lg rounded-lg min-w-[600px]">
        <div className="relative  mb-[25px]">
          <img src={puppy} alt="puppy" className="mx-auto w-1/3" />
          <div className="w-full h-[3px] bg-black mt-8"></div>
          <div className="eye eye-left bg-white w-[20px] h-[20px] rounded-full absolute left-[42.5%] top-[40%]">
            <div
              className={`pupil w-[10px] h-[10px] rounded-full bg-black absolute top-[50%]`}
            ></div>
          </div>
          <div className="eye eye-right bg-white w-[20px] h-[20px] rounded-full absolute right-[41.5%] top-[40%]">
            <div
              className={`pupil w-[10px] h-[10px] rounded-full bg-black absolute top-[50%]`}
            ></div>
          </div>
          <img
            src={leftHand}
            alt="left hand"
            className="absolute hand left-hand bottom-[-15px] left-[25%] w-[60px]"
          />
          <img
            src={rightHand}
            alt="left hand"
            className="absolute hand right-hand bottom-[-15px] right-[25%] w-[60px]"
          />
        </div>

        <form onSubmit={formSubmit} autoComplete="off" action="/">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-green-600 dark:text-gray-400"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              autoComplete="off"
              defaultValue={""}
              onChange={handleEyeMoveOnEmailChange}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm text-green-600 dark:text-gray-400"
              >
                Password
              </label>
              {show && <span onClick={showPass} className="text-sm text-green-600 cursor-pointer">Show Password</span>}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              onKeyDown={passwordFieldActive}
              defaultValue={""}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded-md outline-none focus:border-blue-500"
            />

            <input type="hidden" autoComplete="false" className="mt-2" />
          </div>

          {/* submit */}
          <div className="mb-4 mt-8">
            <button
              type="submit"
              className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
