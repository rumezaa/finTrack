type HelpMenuProps = {
  onStart: () => void;
  msg?: string | null
}

const HelpMenu = (props: HelpMenuProps) => {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded shadow-md text-center w-80">
        <h2 className="text-xl font-bold mb-4">How to Play</h2>
        <ul className="text-left text-sm text-gray-800 space-y-2">
          <li>Make better choices, man.</li>
          <li>You can't leave till you save 30 acorns.</li>
          <li>Use the left/right arrow keys to move the squirrel.</li>
          <li>Catch acorns to score points.</li>
          <li>Every 2 acorns caught, the squirrel shrinks.</li>
          <li>If you miss an acorn, you start again!</li>
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={props.onStart}
        >
          {props.msg || "Start"}
        </button>
      </div>
    </div>
  );
};

export default HelpMenu;
