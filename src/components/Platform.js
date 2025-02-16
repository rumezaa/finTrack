import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const Platform = ({ setPlatformX, platformSpeed, squirrelSize }) => {
    const squirrelWidth = 150 * squirrelSize; // Adjust width based on squirrel size
    const [platformPosX, setPlatformPosX] = useState(window.innerWidth / 2 - squirrelWidth / 2); // Center squirrel on screen
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "ArrowLeft") {
                setPlatformPosX((prevPosX) => Math.max(prevPosX - platformSpeed, 0)); // Prevent going off-screen
            }
            else if (event.key === "ArrowRight") {
                setPlatformPosX((prevPosX) => Math.min(prevPosX + platformSpeed, window.innerWidth - squirrelWidth)); // Prevent going off-screen
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [platformSpeed, squirrelWidth]);
    useEffect(() => {
        setPlatformX(platformPosX);
    }, [platformPosX, setPlatformX]);
    return (_jsx("div", { className: "absolute bottom-0", style: {
            left: platformPosX,
        }, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 150 150", width: squirrelWidth, height: 150 * squirrelSize, children: _jsxs("g", { fill: "#8B4513", children: [_jsx("path", { d: "M90,70 C120,50 150,100 75,100 C60,115 45,85 60,75 C75,70 90,70 90,70", fill: "#A0522D" }), _jsx("circle", { cx: "75", cy: "80", r: "35", fill: "#8B4513" }), _jsx("circle", { cx: "60", cy: "65", r: "8", fill: "#8B4513" }), _jsx("circle", { cx: "90", cy: "65", r: "8", fill: "#8B4513" }), _jsx("circle", { cx: "70", cy: "75", r: "5", fill: "black" }), _jsx("circle", { cx: "85", cy: "75", r: "5", fill: "black" }), _jsx("circle", { cx: "75", cy: "85", r: "3", fill: "black" }), _jsx("circle", { cx: "60", cy: "100", r: "8", fill: "#8B4513" }), _jsx("circle", { cx: "90", cy: "100", r: "8", fill: "#8B4513" })] }) }) }));
};
export default Platform;
