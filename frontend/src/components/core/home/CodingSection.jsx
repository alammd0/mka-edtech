import { TypeAnimation } from "react-type-animation";

const codeString = `<!DOCTYPE html>
<html>
<head><title>Example</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
<a href="one/">One</a><a href="two/">Two</a>
<a href="three/">Three</a>
</nav>
</body>
</html>`;

const CodingSection = () => {
  // Count the number of lines
  const lineCount = codeString.split("\n").length;

  return (
    <div className="flex w-[50%] text-white rounded-md font-mono text-sm leading-relaxed p-4 shadow-md bg-color-code shadow-richblack-700">
      {/* Line Numbers */}
      <div className="text-right pr-4 select-none opacity-50">
        {Array.from({ length: lineCount }).map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <TypeAnimation
        sequence={[codeString, 3000, '']}
        wrapper="pre"
        cursor={true}
        repeat={Infinity}
        style={{
          whiteSpace: "pre-line",
          display: "block",
        }}
        omitDeletionAnimation={true}
      />
    </div>
  );
};

export default CodingSection;
