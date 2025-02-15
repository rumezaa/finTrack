"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
require("./App.css");
function App() {
    var _a = (0, react_1.useState)(0), count = _a[0], setCount = _a[1];
    return (<>
      <div className='bg-purple-300'>
        <div onClick={function () { return setCount(count + 1); }}>
          {count}
        </div>

      </div>
       
    </>);
}
exports.default = App;
