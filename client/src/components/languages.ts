import type { Language } from "./Types";
import { FaJava } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiGo,
  SiJavascript,
  SiKotlin,
  SiPython,
  SiRuby,
  SiRust,
} from "react-icons/si";




export const language: Language[] = [];

const lang = [
  {
    label: "Java",
    icon: FaJava,
    color: "text-orange-600",
    boilerplate: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`,
  },
  {
    label: "C++",
    icon: SiCplusplus,
    color: "text-blue-400",
    boilerplate: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`,
  },
  {
    label: "C",
    icon: SiC,
    color: "text-cyan-400",
    boilerplate: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
  },
  {
    label: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400",
    boilerplate: `console.log("Hello, World!");`,
  },
  {
    label: "Ruby",
    icon: SiRuby,
    color: "text-red-400",
    boilerplate: `puts "Hello, World!"`,
  },
  {
    label: "Go",
    icon: SiGo,
    color: "text-blue-500",
    boilerplate: `package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}`,
  },
  {
    label: "Rust",
    icon: SiRust,
    color: "text-orange-500",
    boilerplate: `fn main() {\n    println!("Hello, World!");\n}`,
  },
  {
    label: "Python",
    icon: SiPython,
    color: "text-blue-300",
    boilerplate: `print("Hello, World!")`,
  },
  {
    label: "Kotlin",
    icon: SiKotlin,
    color: "text-purple-400",
    boilerplate: `fun main() {\n    println("Hello, World!")\n}`,
  },
];



async function getRuntimes() {
  const res = await fetch("https://emkc.org/api/v2/piston/runtimes");
  const data = await res.json();

  if (data) {
    const seen = new Set<string>(); // prevent duplicates by language name

    data.forEach((runtime: { language: string; version: string }) => {
      const langName = runtime.language.toLowerCase();
      const matchedLang = lang.find(l => l.label.toLowerCase() === langName);

      if (matchedLang && !seen.has(langName)) {
        seen.add(langName);

        language.push({
          label: matchedLang.label,
          version: runtime.version,
          icon: matchedLang.icon,
          color:matchedLang.color,
          boilerplate: matchedLang.boilerplate
        });
      }
    });

     // See the final filtered list
  }
}

getRuntimes();
